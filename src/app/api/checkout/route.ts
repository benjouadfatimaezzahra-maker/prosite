import crypto from "crypto";

import { NextResponse } from "next/server";
import type { Session } from "next-auth";
// import { getServerSession } from "next-auth";
import { getServerSession } from "next-auth/next";

import Stripe from "stripe";

import { authOptions } from "@/lib/auth";
import { getTemplateById, getTemplateDefaultConfig } from "@/lib/templates";
import { connectDB } from "@/lib/mongodb";
import { Purchase } from "@/models/purchase";
import type { SiteConfig } from "@/types/site-config";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable.");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-08-27.basil",
});

type AuthenticatedSession = Session & {
  user: {
    id: string;
    email: string;
    name?: string | null;
  };
};

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = (await getServerSession(authOptions)) as AuthenticatedSession | null;

  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json({ error: "You must be signed in to checkout." }, { status: 401 });
  }

  const { user } = session;

  const envAppUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.NEXTAUTH_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);
  const appUrl = envAppUrl ?? request.headers.get("origin");

  if (!appUrl) {
    return NextResponse.json(
      { error: "Unable to determine application URL for checkout." },
      { status: 500 },
    );
  }

  const body = (await request.json().catch(() => null)) as {
    templateId?: string;
    userConfig?: Partial<SiteConfig>;
  } | null;

  if (!body?.templateId) {
    return NextResponse.json({ error: "Template ID is required." }, { status: 400 });
  }

  const template = getTemplateById(body.templateId);

  if (!template) {
    return NextResponse.json({ error: "Template not found." }, { status: 404 });
  }

  const defaultConfig = getTemplateDefaultConfig(template.id);
  const sanitizedUserConfig = Object.fromEntries(
    Object.entries(body.userConfig ?? {}).map(([key, value]) => [key, typeof value === "string" ? value : ""]),
  ) as Record<string, string>;

  const mergedConfig: SiteConfig = {
    ...defaultConfig,
    ...sanitizedUserConfig,
  };

  await connectDB();

  const existingPurchase = await Purchase.findOne({
    userId: user.id,
    templateId: template.id,
    status: "completed",
  }).exec();

  if (existingPurchase) {
    return NextResponse.json(
      { error: "You already own this template." },
      { status: 409 },
    );
  }

  try {
    const configId = crypto.randomUUID();

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: user.email,
      metadata: {
        userId: user.id,
        templateId: template.id,
        configId,
      },
      success_url: `${appUrl}/dashboard?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/templates/${template.id}?checkout=cancelled`,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: template.price * 100,
            product_data: {
              name: template.name,
              description: template.description,
            },
          },
        },
      ],
    });

    await Purchase.findOneAndUpdate(
      { stripeSessionId: checkoutSession.id },
      {
        userId: user.id,
        templateId: template.id,
        configId,
        status: "pending",
        purchaseDate: new Date(),
        stripeSessionId: checkoutSession.id,
        stripePaymentIntentId:
          typeof checkoutSession.payment_intent === "string"
            ? checkoutSession.payment_intent
            : checkoutSession.payment_intent?.id,
        templateName: template.name,
        templatePrice: template.price,
        templatePreviewImage: template.previewImage,
        userConfig: mergedConfig,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Failed to create Stripe checkout session", error);
    return NextResponse.json(
      { error: "Unable to create checkout session." },
      { status: 500 },
    );
  }
}
