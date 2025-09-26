import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
// import { getServerSession } from "next-auth";
import { getServerSession } from "next-auth/next";

import { templates } from "@/lib/templates";
import { authOptions } from "@/lib/auth";

const purchasedTemplateIds = ["dental-studio", "modern-consultancy"];

const purchaseMetadata: Record<
  (typeof purchasedTemplateIds)[number],
  {
    orderNumber: string;
    purchaseDate: string;
    licenseType: string;
    downloadUrl: string;
    licenseUrl: string;
  }
> = {
  "dental-studio": {
    orderNumber: "ORD-2048",
    purchaseDate: "March 4, 2024",
    licenseType: "Commercial License",
    downloadUrl: "#",
    licenseUrl: "#",
  },
  "modern-consultancy": {
    orderNumber: "ORD-1994",
    purchaseDate: "February 22, 2024",
    licenseType: "Agency License",
    downloadUrl: "#",
    licenseUrl: "#",
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

  const purchasedTemplates = templates.filter((template) =>
    purchasedTemplateIds.includes(template.id),
  );

  return (
    <div className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold text-neutral-900">Your templates</h1>
          <p className="text-sm text-neutral-600">
            This dashboard will unlock purchased templates after Stripe checkout. For now, explore the experience with sample data.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-neutral-900">Purchased templates</h2>
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">Sample data</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {purchasedTemplates.map((template) => (
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
                  <span className="text-sm font-medium text-neutral-500">${template.price}</span>
                </div>
                <p className="text-sm text-neutral-600">{template.description}</p>
                <dl className="grid gap-2 rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-600">
                  <div className="flex items-center justify-between">
                    <dt className="font-medium text-neutral-500">Order number</dt>
                    <dd className="font-semibold text-neutral-800">
                      {purchaseMetadata[template.id as keyof typeof purchaseMetadata]?.orderNumber ?? "—"}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="font-medium text-neutral-500">Purchase date</dt>
                    <dd>{purchaseMetadata[template.id as keyof typeof purchaseMetadata]?.purchaseDate ?? "—"}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="font-medium text-neutral-500">License</dt>
                    <dd>{purchaseMetadata[template.id as keyof typeof purchaseMetadata]?.licenseType ?? "—"}</dd>
                  </div>
                </dl>
                <div className="flex flex-wrap gap-3 text-sm font-medium">
                  <Link
                    href={purchaseMetadata[template.id as keyof typeof purchaseMetadata]?.downloadUrl ?? "#"}
                    className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-4 py-2 text-white transition hover:bg-neutral-800"
                  >
                    Download ZIP
                  </Link>
                  <Link
                    href={purchaseMetadata[template.id as keyof typeof purchaseMetadata]?.licenseUrl ?? "#"}
                    className="inline-flex items-center justify-center rounded-full border border-neutral-200 px-4 py-2 text-neutral-700 transition hover:border-neutral-300 hover:text-neutral-900"
                  >
                    View license &amp; receipt
                  </Link>
                  <span className="inline-flex items-center justify-center rounded-full border border-dashed border-neutral-300 px-4 py-2 text-neutral-400">
                    One-click deploy (soon)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-neutral-900">What happens after purchase?</h2>
          <ol className="mt-4 space-y-3 text-sm text-neutral-600">
            <li>
              1. Complete checkout via Stripe and receive an instant confirmation email with download links.
            </li>
            <li>2. Access your template ZIP anytime from this dashboard.</li>
            <li>3. Follow the launch checklist to customize copy, colors, and deploy to Vercel or Netlify.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
