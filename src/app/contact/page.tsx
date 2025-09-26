import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16">
        <h1 className="text-3xl font-semibold text-neutral-900">Talk to our team</h1>
        <p className="text-sm text-neutral-600">
          Need a custom template bundle or have questions about enterprise licensing? Email us at <a className="font-medium text-neutral-900" href="mailto:hello@prosite.com">hello@prosite.com</a> and we’ll respond within one business day.
        </p>
      </div>
    </div>
  );
}
