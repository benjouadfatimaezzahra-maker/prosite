import type { Metadata } from "next";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "$0",
    cadence: "forever",
    description: "Preview any template and test the customization checklist.",
    features: [
      "Live preview for every template",
      "Brand color suggestions",
      "Launch checklist",
    ],
    cta: { label: "Preview templates", href: "/templates" },
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$129",
    cadence: "per template",
    description: "Download the code, deploy anywhere, and access lifetime updates.",
    features: [
      "Complete Next.js project",
      "Stripe-ready checkout wiring",
      "Lifetime template updates",
      "Email support within 24 hours",
    ],
    cta: { label: "Buy a template", href: "/templates" },
    highlighted: true,
  },
  {
    name: "Agency",
    price: "$399",
    cadence: "per quarter",
    description: "Bundle credits for agencies and studios shipping multiple client sites.",
    features: [
      "4 template downloads",
      "Client handoff documentation",
      "White-label onboarding deck",
      "Priority Slack support",
    ],
    cta: { label: "Talk to sales", href: "/contact" },
    highlighted: false,
  },
];

export const metadata: Metadata = {
  title: "Pricing",
  description: "Flexible plans for founders and agencies building with ProSite templates.",
};

export default function PricingPage() {
  return (
    <div className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-semibold text-neutral-900">Choose a plan built for speed</h1>
          <p className="mx-auto max-w-2xl text-base text-neutral-600">
            Whether you’re shipping a single landing page or running an agency, ProSite gives you polished sites with minimal customization required.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col gap-6 rounded-3xl border bg-white p-8 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
                plan.highlighted ? "border-neutral-900" : "border-neutral-200"
              }`}
            >
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">{plan.name}</span>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-semibold text-neutral-900">{plan.price}</p>
                  <span className="text-sm text-neutral-500">{plan.cadence}</span>
                </div>
                <p className="text-sm text-neutral-600">{plan.description}</p>
              </div>
              <ul className="space-y-3 text-sm text-neutral-600">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-neutral-900" aria-hidden />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={plan.cta.href}
                className={`mt-auto inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                  plan.highlighted
                    ? "bg-neutral-900 text-white hover:bg-neutral-800"
                    : "border border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:text-neutral-900"
                }`}
              >
                {plan.cta.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
