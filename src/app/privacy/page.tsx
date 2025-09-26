import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
};

export default function PrivacyPage() {
  return (
    <div className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16">
        <h1 className="text-3xl font-semibold text-neutral-900">Privacy policy</h1>
        <p className="text-sm text-neutral-600">
          We respect your privacy and only collect the information needed to power your ProSite account. We never sell customer data and only use trusted processors like Stripe for payments.
        </p>
        <p className="text-sm text-neutral-600">
          For questions about data retention or to request deletion, email <a className="font-medium text-neutral-900" href="mailto:privacy@prosite.com">privacy@prosite.com</a>.
        </p>
      </div>
    </div>
  );
}
