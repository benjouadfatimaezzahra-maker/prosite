import type { Metadata } from "next";
import { templates } from "@/lib/templates";
import { TemplateGallery } from "@/components/template-gallery";

export const metadata: Metadata = {
  title: "Template Gallery",
  description:
    "Browse conversion-ready website templates for agencies, local businesses, and creative studios.",
};

export default function TemplatesPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16">
      <div className="space-y-4 text-center md:text-left">
        <h1 className="text-4xl font-semibold text-neutral-900">Template gallery</h1>
        <p className="text-base text-neutral-600">
          Browse production-ready Next.js templates and pick the one that fits your next launch. Every purchase triggers an
          automated export with your brand settings and a signed download link inside the dashboard.
        </p>
      </div>
      <TemplateGallery templates={templates} />
    </div>
  );
}
