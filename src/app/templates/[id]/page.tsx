import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTemplateById, templates } from "@/lib/templates";
import { TemplateLivePreview } from "@/components/template-live-preview";
import { CheckoutButton } from "@/components/checkout-button";

export function generateStaticParams() {
  return templates.map((template) => ({ id: template.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
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
      images: template.previewImages,
    },
  };
}

type TemplateDetailPageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ preview?: string }>;
};

export default async function TemplateDetailPage({ params, searchParams }: TemplateDetailPageProps) {
  const { id } = await params;
  const { preview } = (await searchParams) ?? {};
  const template = getTemplateById(id);

  if (!template) {
    notFound();
  }

  const shouldShowPreview = preview === "true";

  return (
    <div className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-start">
          <div className="flex-1 space-y-6">
            <Link href="/templates" className="text-sm font-medium text-neutral-500 hover:text-neutral-900">
              ← Back to gallery
            </Link>
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
              {template.category}
            </span>
            <h1 className="text-4xl font-semibold text-neutral-900">{template.name}</h1>
            <p className="max-w-2xl text-base text-neutral-600">{template.description}</p>
            <div className="flex flex-wrap gap-6">
              <div>
                <p className="text-sm text-neutral-500">Price</p>
                <p className="text-2xl font-semibold text-neutral-900">${template.price}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Tech stack</p>
                <p className="text-sm font-medium text-neutral-800">{template.techStack.join(", ")}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <CheckoutButton templateId={template.id} templateName={template.name} />
              {template.demoUrl && (
                <Link
                  href={template.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-200 px-6 py-3 text-sm font-semibold text-neutral-700 transition hover:border-neutral-300 hover:text-neutral-900"
                >
                  Live preview
                </Link>
              )}
            </div>
          </div>
          <div className="flex-1 space-y-4">
            {template.previewImages.map((image, index) => (
              <div key={image} className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
                <Image
                  src={image}
                  alt={`${template.name} preview ${index + 1}`}
                  width={1200}
                  height={800}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {template.demoUrl && (
          <TemplateLivePreview
            url={template.demoUrl}
            name={template.name}
            defaultOpen={shouldShowPreview}
          />
        )}

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-neutral-900">What’s included</h2>
            <ul className="mt-4 space-y-3 text-sm text-neutral-600">
              {template.deliverables.map((deliverable) => (
                <li key={deliverable} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-neutral-900" aria-hidden />
                  <span>{deliverable}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-neutral-900">Key features</h2>
            <ul className="mt-4 space-y-3 text-sm text-neutral-600">
              {template.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-neutral-900" aria-hidden />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
