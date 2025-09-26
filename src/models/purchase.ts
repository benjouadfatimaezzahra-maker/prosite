import { Schema, model, models, type Document, type Model } from "mongoose";

export type PurchaseStatus = "pending" | "completed" | "failed";

export interface IPurchase extends Document {
  userId: string;
  templateId: string;
  purchaseDate: Date;
  status: PurchaseStatus;
  stripeSessionId: string;
  stripePaymentIntentId?: string;
}

const PurchaseSchema = new Schema<IPurchase, Model<IPurchase>>(
  {
    userId: { type: String, required: true, index: true },
    templateId: { type: String, required: true, index: true },
    purchaseDate: { type: Date, default: () => new Date(), required: true },
    status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
    stripeSessionId: { type: String, required: true, unique: true },
    stripePaymentIntentId: { type: String },
  },
  {
    timestamps: true,
  },
);

PurchaseSchema.index({ userId: 1, templateId: 1 }, { unique: false });

export const Purchase = (models.Purchase as Model<IPurchase>) || model<IPurchase>("Purchase", PurchaseSchema);
