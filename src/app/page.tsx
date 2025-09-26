import Image from "next/image";
import Link from "next/link";
import { templates } from "@/lib/templates";
import { TemplateGallery } from "@/components/template-gallery";

export default function Home() {
  const heroTemplates = templates.slice(0, 3);

  return (
    <div className="bg-white">
      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-24 pt-16 md:flex-row md:items-center">
        <div className="flex-1 space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-100 px-4 py-1 text-xs font-medium uppercase tracking-[0.3em] text-neutral-500">
            Ready-made websites
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
            Launch a professional site in minutes, not months.
          </h1>
          <p className="max-w-xl text-lg text-neutral-600">
            Pick from conversion-optimized, industry-specific templates. Preview the full experience, pay once, download the code, and own the build forever.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/templates"
              className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-neutral-800"
            >
              Explore templates
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-full border border-neutral-200 px-6 py-3 text-sm font-semibold text-neutral-700 transition hover:border-neutral-300 hover:text-neutral-900"
            >
              View pricing
            </Link>
          </div>
          <div className="flex items-center gap-6 pt-6">
            <div>
              <p className="text-3xl font-semibold text-neutral-900">+250</p>
              <p className="text-sm text-neutral-500">agencies use ProSite templates</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-neutral-900">98%</p>
              <p className="text-sm text-neutral-500">report launching faster</p>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="grid gap-4 rounded-3xl border border-neutral-200 bg-neutral-50 p-6 shadow-inner">
            <p className="text-sm font-medium text-neutral-500">Featured templates</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {heroTemplates.map((template) => (
                <div key={template.id} className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                  <Image
                    src={template.thumbnail}
                    alt={template.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="text-xs text-neutral-500">
              Built with modern stacks and audited for performance, accessibility, and SEO best practices.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-16 text-center">
          <h2 className="text-2xl font-semibold text-neutral-900">Why founders choose ProSite</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Launch instantly",
                description: "Skip the drag-and-drop chaos. Each template ships with thoughtful copy blocks and conversion flows.",
              },
              {
                title: "Own your code",
                description: "Download a clean Next.js project ready to deploy anywhere — Vercel, Netlify, or your own infra.",
              },
              {
                title: "Simple customization",
                description: "Swap logos, colors, and key sections via a guided checklist. No bloated site builder required.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-neutral-200 bg-white p-8 text-left shadow-sm">
                <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
                <p className="pt-3 text-sm text-neutral-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-20">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-neutral-900">Explore our library</h2>
          <Link href="/templates" className="text-sm font-medium text-neutral-600 hover:text-neutral-900">
            View all
          </Link>
        </div>
        <TemplateGallery templates={templates} />
      </section>

      <section className="border-t border-neutral-200 bg-neutral-900">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-16 text-white md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold">Ready to sell sites like a pro?</h2>
            <p className="max-w-xl pt-3 text-sm text-neutral-200">
              Set up your ProSite account, connect Stripe once, and deliver premium sites without the hours of design and QA.
            </p>
          </div>
          <Link
            href="/auth/register"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 shadow-lg transition hover:bg-neutral-100"
          >
            Start building today
          </Link>
        </div>
      </section>
    </div>
  );
}
