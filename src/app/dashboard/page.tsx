import type { Metadata } from "next";
import Link from "next/link";
import { templates } from "@/lib/templates";

const purchasedTemplateIds = ["dental-studio", "modern-consultancy"];

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Access your purchased templates, download project files, and grab deployment resources.",
};

export default function DashboardPage() {
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

        <div className="grid gap-6 md:grid-cols-2">
          {purchasedTemplates.map((template) => (
            <div key={template.id} className="flex flex-col gap-4 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                    {template.category}
                  </p>
                  <h2 className="text-xl font-semibold text-neutral-900">{template.name}</h2>
                </div>
                <span className="text-sm font-medium text-neutral-500">${template.price}</span>
              </div>
              <p className="text-sm text-neutral-600">{template.description}</p>
              <div className="flex flex-wrap gap-3 text-sm font-medium">
                <Link
                  href="#"
                  className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-4 py-2 text-white transition hover:bg-neutral-800"
                >
                  Download ZIP
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-200 px-4 py-2 text-neutral-700 transition hover:border-neutral-300 hover:text-neutral-900"
                >
                  Deployment guide
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center justify-center rounded-full border border-dashed border-neutral-300 px-4 py-2 text-neutral-500 transition hover:border-neutral-400 hover:text-neutral-700"
                >
                  Customize branding
                </Link>
              </div>
            </div>
          ))}
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
