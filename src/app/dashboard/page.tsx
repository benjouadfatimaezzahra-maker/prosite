import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import type { Session } from "next-auth";

import { ReexportButton } from "@/components/reexport-button";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { getTemplateById } from "@/lib/templates";
import { Purchase } from "@/models/purchase";
import type { PurchaseStatus } from "@/models/purchase";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Access your purchased templates, download project files, and manage exports.",
};

type PurchaseCard = {
  id: string;
  name: string;
  description: string;
  price: number;
  previewImage?: string;
  status: PurchaseStatus;
  purchaseDate?: string;
  downloadUrl?: string;
  exportPath?: string;
  zipPath?: string;
  lastGeneratedAt?: Date | null;
  hostingStatus: "not-connected" | "live";
};

function buildStatusLabel(status: PurchaseStatus, zipPath?: string | null) {
  if (status === "completed" && zipPath) {
    return {
      label: "Ready for download",
      tone: "bg-emerald-100 text-emerald-700",
    };
  }

  if (status === "pending") {
    return {
      label: "Awaiting Stripe confirmation",
      tone: "bg-amber-100 text-amber-700",
    };
  }

  return {
    label: "Generation failed",
    tone: "bg-rose-100 text-rose-700",
  };
}

export default async function DashboardPage() {
  const session = (await getServerSession(authOptions)) as (Session & {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
    };
  }) | null;

  if (!session?.user?.id) {
    redirect(`/auth/login?callbackUrl=/dashboard`);
  }

  await connectDB();

  const documents = await Purchase.find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .lean();

  const purchases: PurchaseCard[] = documents.map((doc) => {
    const template = getTemplateById(doc.templateId);
    return {
      id: doc._id.toString(),
      name: doc.templateName ?? template?.name ?? doc.templateId,
      description: template?.description ?? "Download the generated Next.js project whenever you're ready.",
      price: doc.templatePrice ?? template?.price ?? 0,
      previewImage: doc.templatePreviewImage ?? template?.previewImage,
      status: doc.status,
      purchaseDate: doc.purchaseDate ? doc.purchaseDate.toISOString() : undefined,
      downloadUrl: doc.zipPath ? `/api/download/${doc._id.toString()}` : undefined,
      exportPath: doc.exportPath ?? undefined,
      zipPath: doc.zipPath ?? undefined,
      lastGeneratedAt: doc.lastGeneratedAt ?? null,
      hostingStatus: "not-connected",
    };
  });

  return (
    <div className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold text-neutral-900">Your templates</h1>
          <p className="text-sm text-neutral-600">
            Download production-ready Next.js bundles as soon as Stripe confirms payment. Re-export anytime to refresh brand
            settings or pull a clean archive.
          </p>
        </div>

        {purchases.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-neutral-300 bg-white p-16 text-center">
            <p className="text-lg font-semibold text-neutral-800">No purchases yet</p>
            <p className="max-w-md text-sm text-neutral-500">
              Browse the gallery, pick a template, and complete checkout to unlock an automated export with your brand settings.
            </p>
            <Link
              href="/templates"
              className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Explore templates
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {purchases.map((purchase) => {
              const statusMeta = buildStatusLabel(purchase.status, purchase.zipPath);

              return (
                <div
                  key={purchase.id}
                  className="flex flex-col gap-5 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <h2 className="text-xl font-semibold text-neutral-900">{purchase.name}</h2>
                      <p className="text-sm text-neutral-600">{purchase.description}</p>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                        <span>${purchase.price}</span>
                        <span className={`inline-flex items-center rounded-full px-3 py-1 ${statusMeta.tone}`}>
                          {statusMeta.label}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-neutral-600">
                          Hosting: {purchase.hostingStatus === "live" ? "Connected" : "Not connected"}
                        </span>
                      </div>
                    </div>
                    {purchase.previewImage ? (
                      <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-neutral-200">
                        <Image
                          src={purchase.previewImage}
                          alt={`${purchase.name} preview`}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>
                    ) : null}
                  </div>

                  <dl className="grid gap-2 rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-600">
                    <div className="flex items-center justify-between">
                      <dt className="font-medium text-neutral-500">Purchase date</dt>
                      <dd>{purchase.purchaseDate ? new Date(purchase.purchaseDate).toLocaleDateString() : "—"}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="font-medium text-neutral-500">Last export</dt>
                      <dd>
                        {purchase.lastGeneratedAt
                          ? new Date(purchase.lastGeneratedAt).toLocaleString()
                          : purchase.status === "completed"
                            ? "Export ready"
                            : "Pending"}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="font-medium text-neutral-500">Export path</dt>
                      <dd className="truncate text-right">{purchase.exportPath ?? "—"}</dd>
                    </div>
                  </dl>

                  <div className="flex flex-wrap gap-3 text-sm font-medium">
                    {purchase.downloadUrl && purchase.status === "completed" ? (
                      <a
                        href={purchase.downloadUrl}
                        className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-4 py-2 text-white transition hover:bg-neutral-800"
                      >
                        Download ZIP
                      </a>
                    ) : (
                      <span className="inline-flex items-center justify-center rounded-full border border-dashed border-neutral-300 px-4 py-2 text-neutral-400">
                        Download unavailable
                      </span>
                    )}
                    <ReexportButton purchaseId={purchase.id} templateName={purchase.name} />
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-full border border-neutral-200 px-4 py-2 text-neutral-700 transition hover:border-neutral-300 hover:text-neutral-900"
                      disabled
                    >
                      Connect domain
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
