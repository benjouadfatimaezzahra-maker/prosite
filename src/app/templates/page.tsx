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
          Filter by category to find a site that fits your next launch. Every purchase unlocks a signed download link to a
          production-ready Next.js project bundled as a ZIP and stored in our delivery folder or S3 bucket.
        </p>
      </div>
      <TemplateGallery templates={templates} />
    </div>
  );
}
