import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
};

export default function TermsPage() {
  return (
    <div className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16">
        <h1 className="text-3xl font-semibold text-neutral-900">Terms of service</h1>
        <p className="text-sm text-neutral-600">
          By purchasing a ProSite template you receive a perpetual license to use the asset for one project. Redistribution or resale of the template files without permission is prohibited.
        </p>
        <p className="text-sm text-neutral-600">
          These terms are updated periodically. Continued use of ProSite products constitutes acceptance of the latest version.
        </p>
      </div>
    </div>
  );
}
