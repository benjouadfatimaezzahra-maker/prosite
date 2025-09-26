import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support",
};

const faqs = [
  {
    question: "How do I receive template updates?",
    answer:
      "Whenever we ship improvements, you’ll get an email with a changelog and refreshed download link. Updates are included in your original purchase.",
  },
  {
    question: "Can I use templates for client work?",
    answer:
      "Yes — purchase once per end client and you can fully white-label the template, including replacing branding assets.",
  },
  {
    question: "Do you offer customizations?",
    answer:
      "Our team offers limited implementation sprints. Email hello@prosite.com with your scope for a tailored quote.",
  },
];

export default function SupportPage() {
  return (
    <div className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16">
        <h1 className="text-3xl font-semibold text-neutral-900">Support center</h1>
        <p className="text-sm text-neutral-600">
          Browse quick answers to common questions or send us a note at <a className="font-medium text-neutral-900" href="mailto:hello@prosite.com">hello@prosite.com</a>.
        </p>
        <div className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-neutral-900">{faq.question}</h2>
              <p className="pt-2 text-sm text-neutral-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
