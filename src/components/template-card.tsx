import Image from "next/image";
import Link from "next/link";
import type { Template } from "@/lib/templates";

export function TemplateCard({ template }: { template: Template }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
        <Image
          src={template.thumbnail}
          alt={`${template.name} template preview`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
          <span>{template.category}</span>
          <span>${template.price}</span>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-neutral-900">{template.name}</h3>
          <p className="text-sm text-neutral-600">
            {template.description}
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between pt-4 text-sm font-medium">
          <Link href={`/templates/${template.id}`} className="text-neutral-900 transition hover:text-neutral-600">
            View details
          </Link>
          <Link
            href={`/templates/${template.id}?preview=true`}
            className="rounded-full bg-neutral-900 px-4 py-2 text-white transition hover:bg-neutral-800"
          >
            Preview
          </Link>
        </div>
      </div>
    </div>
  );
}
