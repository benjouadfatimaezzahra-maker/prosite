import { NextResponse } from "next/server";
import Stripe from "stripe";

import { connectDB } from "@/lib/mongodb";
import { Purchase } from "@/models/purchase";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable.");
}

if (!webhookSecret) {
  throw new Error("Missing STRIPE_WEBHOOK_SECRET environment variable.");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2024-11-20",
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

        await connectDB();

        await Purchase.findOneAndUpdate(
          { stripeSessionId: session.id },
          {
            userId,
            templateId,
            status: "completed",
            purchaseDate: new Date(),
            stripePaymentIntentId:
              typeof session.payment_intent === "string"
                ? session.payment_intent
                : session.payment_intent?.id,
          },
          { upsert: true, new: true, setDefaultsOnInsert: true },
        );
        break;
      }
      case "checkout.session.async_payment_failed":
      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session;
        await connectDB();
        await Purchase.findOneAndUpdate(
          { stripeSessionId: session.id },
          { status: "failed", purchaseDate: new Date() },
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
