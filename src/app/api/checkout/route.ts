import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
import { getServerSession } from "next-auth/next";

import Stripe from "stripe";

import { authOptions } from "@/lib/auth";
import { getTemplateById } from "@/lib/templates";
import { connectDB } from "@/lib/mongodb";
import { Purchase } from "@/models/purchase";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;

if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable.");
}

if (!appUrl) {
  throw new Error("Missing NEXT_PUBLIC_APP_URL environment variable.");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2024-11-20",
});

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json({ error: "You must be signed in to checkout." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { templateId?: string } | null;

  if (!body?.templateId) {
    return NextResponse.json({ error: "Template ID is required." }, { status: 400 });
  }

  const template = getTemplateById(body.templateId);

  if (!template) {
    return NextResponse.json({ error: "Template not found." }, { status: 404 });
  }

  await connectDB();

  const existingPurchase = await Purchase.findOne({
    userId: session.user.id,
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
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: session.user.email ?? undefined,
      metadata: {
        userId: session.user.id,
        templateId: template.id,
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
        userId: session.user.id,
        templateId: template.id,
        status: "pending",
        purchaseDate: new Date(),
        stripePaymentIntentId:
          typeof checkoutSession.payment_intent === "string"
            ? checkoutSession.payment_intent
            : checkoutSession.payment_intent?.id,
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
