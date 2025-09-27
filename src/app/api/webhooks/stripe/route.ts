import { NextResponse } from "next/server";
import Stripe from "stripe";

import { exportAndZipSite } from "@/lib/exportSite";
import { connectDB } from "@/lib/mongodb";
import { Purchase } from "@/models/purchase";
import { getTemplateById, getTemplateDefaultConfig } from "@/lib/templates";

function getRequiredEnv(name: "STRIPE_SECRET_KEY" | "STRIPE_WEBHOOK_SECRET"): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name} environment variable.`);
  }
  return value;
}

const stripeSecretKey = getRequiredEnv("STRIPE_SECRET_KEY");
const webhookSecret = getRequiredEnv("STRIPE_WEBHOOK_SECRET");

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-08-27.basil",
});

export const runtime = "nodejs";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return new NextResponse("Missing Stripe signature header.", { status: 400 });
  }

  const body = await request.arrayBuffer();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(Buffer.from(body), signature, webhookSecret);
  } catch (error) {
    console.error("Stripe webhook signature verification failed", error);
    return new NextResponse("Webhook signature verification failed.", { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const templateId = session.metadata?.templateId;
        const userId = session.metadata?.userId;

        if (!templateId || !userId) {
          break;
        }

        const resolvedTemplateId = templateId;
        const resolvedUserId = userId;

        await connectDB();
        const existingPurchase = await Purchase.findOne({ stripeSessionId: session.id }).exec();
        const template = getTemplateById(resolvedTemplateId);
        const userConfig =
          existingPurchase?.userConfig ?? getTemplateDefaultConfig(resolvedTemplateId);

        try {
          const exportResult = await exportAndZipSite(
            resolvedTemplateId,
            userConfig,
            resolvedUserId,
            existingPurchase?.downloadToken,
          );
          await Purchase.findOneAndUpdate(
            { stripeSessionId: session.id },
            {
              userId: resolvedUserId,
              templateId: resolvedTemplateId,
              status: "completed",
              purchaseDate: new Date(),
              stripeSessionId: session.id,
              stripePaymentIntentId:
                typeof session.payment_intent === "string"
                  ? session.payment_intent
                  : session.payment_intent?.id,
              exportPath: exportResult.exportPath,
              zipPath: exportResult.zipPath,
              downloadToken: exportResult.downloadToken,
              lastGeneratedAt: new Date(),
              templateName:
                template?.name ?? existingPurchase?.templateName ?? resolvedTemplateId,
              templatePrice: template?.price ?? existingPurchase?.templatePrice ?? 0,
              templatePreviewImage: template?.previewImage ?? existingPurchase?.templatePreviewImage,
              userConfig,
            },
            { upsert: true, new: true, setDefaultsOnInsert: true },
          ).exec();
        } catch (generationError) {
          await Purchase.findOneAndUpdate(
            { stripeSessionId: session.id },
            {
              userId: resolvedUserId,
              templateId: resolvedTemplateId,
              status: "failed",
              purchaseDate: new Date(),
              stripeSessionId: session.id,
              stripePaymentIntentId:
                typeof session.payment_intent === "string"
                  ? session.payment_intent
                  : session.payment_intent?.id,
            },
            { upsert: true, new: true, setDefaultsOnInsert: true },
          ).exec();
          throw generationError;
        }
        break;
      }
      case "checkout.session.async_payment_failed":
      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session;
        await connectDB();
        await Purchase.findOneAndUpdate(
          { stripeSessionId: session.id },
          {
            status: "failed",
            purchaseDate: new Date(),
            stripeSessionId: session.id,
            stripePaymentIntentId:
              typeof session.payment_intent === "string"
                ? session.payment_intent
                : session.payment_intent?.id,
          },
        ).exec();
        break;
      }
      default: {
        // Unsupported event type; acknowledge without action
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error handling Stripe webhook", error);
    return new NextResponse("Webhook handler failed.", { status: 500 });
  }
}
