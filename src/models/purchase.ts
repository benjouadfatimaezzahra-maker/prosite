import { Schema, model, models, type Document, type Model } from "mongoose";

import type { SiteConfig } from "@/types/site-config";

export type PurchaseStatus = "pending" | "completed" | "failed";

export interface IPurchase extends Document {
  userId: string;
  templateId: string;
  purchaseDate: Date;
  status: PurchaseStatus;
  stripeSessionId: string;
  stripePaymentIntentId?: string;
  exportPath?: string;
  zipPath?: string;
  downloadToken?: string;
  templateName: string;
  templatePrice: number;
  templatePreviewImage?: string;
  userConfig: SiteConfig;
  lastGeneratedAt?: Date;
}

const PurchaseSchema = new Schema<IPurchase, Model<IPurchase>>(
  {
    userId: { type: String, required: true, index: true },
    templateId: { type: String, required: true, index: true },
    purchaseDate: { type: Date, default: () => new Date(), required: true },
    status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
    stripeSessionId: { type: String, required: true, unique: true },
    stripePaymentIntentId: { type: String },
    exportPath: { type: String },
    zipPath: { type: String },
    downloadToken: { type: String, index: true },
    templateName: { type: String, required: true },
    templatePrice: { type: Number, required: true },
    templatePreviewImage: { type: String },
    userConfig: { type: Schema.Types.Mixed, default: {} },
    lastGeneratedAt: { type: Date },
  },
  {
    timestamps: true,
  },
);

PurchaseSchema.index({ userId: 1, templateId: 1 }, { unique: false });

export const Purchase = (models.Purchase as Model<IPurchase>) || model<IPurchase>("Purchase", PurchaseSchema);
