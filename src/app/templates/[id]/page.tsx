import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CheckoutButton } from "@/components/checkout-button";
import { getTemplateById, getTemplateDefaultConfig, templates } from "@/lib/templates";

// ✅ Generate all possible template IDs for static rendering
export function generateStaticParams() {
  return templates.map((template) => ({ id: template.id }));
}

// ✅ Fix: Await params before using
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const template = getTemplateById(id);
  if (!template) {
    return { title: "Template not found" };
  }

  return {
    title: template.name,
    description: template.description,
    openGraph: {
      title: template.name,
      description: template.description,
      images: [template.previewImage],
    },
  };
}

type TemplateDetailPageProps = {
  params: Promise<{ id: string }>;
};

// ✅ Fix: Await params in component
export default async function TemplateDetailPage({ params }: TemplateDetailPageProps) {
  const { id } = await params;
  const template = getTemplateById(id);

  if (!template) {
    notFound();
  }

  const defaultConfig = getTemplateDefaultConfig(template.id);

  return (
    <div className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start">
          <div className="flex-1 space-y-6">
            <Link
              href="/templates"
              className="text-sm font-medium text-neutral-500 hover:text-neutral-900"
            >
              ← Back to gallery
            </Link>
            <h1 className="text-4xl font-semibold text-neutral-900">{template.name}</h1>
            <p className="max-w-2xl text-base text-neutral-600">
              {template.description}
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <div>
                <p className="text-neutral-500">Price</p>
                <p className="text-2xl font-semibold text-neutral-900">
                  ${template.price}
                </p>
              </div>
              <div>
                <p className="text-neutral-500">Export</p>
                <p className="font-medium text-neutral-800">
                  Next.js 14 project with brand placeholders
                </p>
              </div>
              <div>
                <p className="text-neutral-500">Delivery</p>
                <p className="font-medium text-neutral-800">
                  Automated ZIP after Stripe checkout
                </p>
              </div>
            </div>
            <p className="text-sm text-neutral-500">
              We generate a tailored project using your brand settings, zip it,
              and drop the download link inside your dashboard seconds after
              checkout.
            </p>
            <CheckoutButton
              templateId={template.id}
              templateName={template.name}
              defaultConfig={defaultConfig}
            />
          </div>
          <div className="flex-1 space-y-4">
            <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
              <Image
                src={template.previewImage}
                alt={`${template.name} preview`}
                width={1200}
                height={800}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-neutral-900">
                Default brand settings
              </h2>
              <dl className="mt-4 grid gap-3 text-sm text-neutral-600">
                <div className="flex items-center justify-between">
                  <dt className="font-medium text-neutral-500">Site name</dt>
                  <dd className="font-semibold text-neutral-900">
                    {defaultConfig.siteName}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="font-medium text-neutral-500">Primary color</dt>
                  <dd className="font-semibold text-neutral-900">
                    {defaultConfig.primaryColor}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="font-medium text-neutral-500">Tagline</dt>
                  <dd className="text-right text-neutral-700">
                    {defaultConfig.tagline}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="font-medium text-neutral-500">Logo URL</dt>
                  <dd className="text-right text-neutral-700">
                    {defaultConfig.logoUrl}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-neutral-900">
              How delivery works
            </h2>
            <ol className="mt-4 space-y-3 text-sm text-neutral-600">
              <li>1. Complete the Stripe checkout flow.</li>
              <li>
                2. Our generator copies the template, injects your branding, and
                creates a ZIP.
              </li>
              <li>
                3. Access the download link from the dashboard anytime.
              </li>
            </ol>
          </div>
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-neutral-900">
              Need custom settings?
            </h2>
            <p className="mt-3 text-sm text-neutral-600">
              Update the brand settings during checkout or re-export the project
              from your dashboard with fresh details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
