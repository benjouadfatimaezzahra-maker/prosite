import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
// import { getServerSession } from "next-auth";
import { getServerSession } from "next-auth/next";

import { templates } from "@/lib/templates";
import { authOptions } from "@/lib/auth";

type SamplePurchaseStatus = "completed" | "pending";

type SamplePurchase = {
  orderNumber: string;
  purchaseDate: string;
  licenseType: string;
  status: SamplePurchaseStatus;
  downloadUrl?: string;
  licenseUrl: string;
  fulfillmentNotes: string;
};

const purchases: Record<string, SamplePurchase> = {
  "dental-studio": {
    orderNumber: "ORD-2048",
    purchaseDate: "March 4, 2024",
    licenseType: "Commercial License",
    status: "completed",
    downloadUrl: "/downloads/dental-studio.zip",
    licenseUrl: "#",
    fulfillmentNotes: "Unlocked automatically after Stripe marked the payment as successful.",
  },
  "modern-consultancy": {
    orderNumber: "ORD-1994",
    purchaseDate: "February 22, 2024",
    licenseType: "Agency License",
    status: "pending",
    licenseUrl: "#",
    fulfillmentNotes:
      "Awaiting payment confirmation. The download link will appear the moment Stripe sends the success webhook.",
  },
};

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Access your purchased templates, download project files, and grab deployment resources.",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/auth/login?callbackUrl=/dashboard`);
  }

  const purchasedTemplates = templates.filter((template) => Boolean(purchases[template.id]));

  return (
    <div className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold text-neutral-900">Your templates</h1>
          <p className="text-sm text-neutral-600">
            This dashboard unlocks the ZIP bundle for each template the moment Stripe confirms payment. For now, explore the
            experience with sample data that mirrors the production flow.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-neutral-900">Purchased templates</h2>
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">Sample data</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {purchasedTemplates.map((template) => {
              const purchase = purchases[template.id];
              const isUnlocked = purchase?.status === "completed";

              return (
                <div
                  key={template.id}
                  className="flex flex-col gap-4 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                        {template.category}
                      </p>
                      <h3 className="text-xl font-semibold text-neutral-900">{template.name}</h3>
                    </div>
                    <div className="flex flex-col items-end gap-2 text-right">
                      <span className="text-sm font-medium text-neutral-500">${template.price}</span>
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
                          isUnlocked
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {isUnlocked ? "Payment complete" : "Payment pending"}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600">{template.description}</p>
                  <dl className="grid gap-2 rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-600">
                    <div className="flex items-center justify-between">
                      <dt className="font-medium text-neutral-500">Order number</dt>
                      <dd className="font-semibold text-neutral-800">{purchase?.orderNumber ?? "—"}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="font-medium text-neutral-500">Purchase date</dt>
                      <dd>{purchase?.purchaseDate ?? "—"}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="font-medium text-neutral-500">License</dt>
                      <dd>{purchase?.licenseType ?? "—"}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="font-medium text-neutral-500">Stored at</dt>
                      <dd>
                        {template.delivery.storedAt === "local-folder"
                          ? "Local delivery folder"
                          : "S3 template bucket"}
                      </dd>
                    </div>
                  </dl>
                  <div className="flex flex-wrap gap-3 text-sm font-medium">
                    {isUnlocked ? (
                      <a
                        href={purchase?.downloadUrl ?? template.delivery.downloadPath}
                        className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-4 py-2 text-white transition hover:bg-neutral-800"
                        download
                      >
                        Download ZIP ({template.delivery.fileSize})
                      </a>
                    ) : (
                      <span className="inline-flex items-center justify-center rounded-full border border-dashed border-neutral-300 px-4 py-2 text-neutral-400">
                        Awaiting payment confirmation
                      </span>
                    )}
                    <Link
                      href={purchase?.licenseUrl ?? "#"}
                      className="inline-flex items-center justify-center rounded-full border border-neutral-200 px-4 py-2 text-neutral-700 transition hover:border-neutral-300 hover:text-neutral-900"
                    >
                      View license &amp; receipt
                    </Link>
                    <span className="inline-flex items-center justify-center rounded-full border border-dashed border-neutral-300 px-4 py-2 text-neutral-400">
                      One-click deploy (soon)
                    </span>
                  </div>
                  <p className="text-sm text-neutral-500">{purchase?.fulfillmentNotes}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-neutral-900">What happens after purchase?</h2>
          <ol className="mt-4 space-y-3 text-sm text-neutral-600">
            <li>
              1. Complete checkout via Stripe and receive an instant confirmation email with your paid invoice.
            </li>
            <li>2. Our webhook stores the ZIP in S3 and unlocks the signed download link shown above.</li>
            <li>3. Access your template bundle anytime from this dashboard along with future updates.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
