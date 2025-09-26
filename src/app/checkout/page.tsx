import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Checkout",
};

export default function CheckoutPage() {
  return (
    <div className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16">
        <h1 className="text-3xl font-semibold text-neutral-900">Stripe checkout coming soon</h1>
        <p className="text-sm text-neutral-600">
          We’re integrating Stripe for secure payments. In the live product you’ll choose a template, complete checkout, and our
          webhook will copy the ZIP bundle into S3 and unlock the download inside your dashboard.
        </p>
        <Link
          href="/templates"
          className="inline-flex w-fit items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          Continue browsing templates
        </Link>
      </div>
    </div>
  );
}
