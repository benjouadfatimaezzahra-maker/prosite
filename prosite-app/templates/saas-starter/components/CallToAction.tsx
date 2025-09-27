const SITE_NAME = "{{siteName}}";
const PRIMARY_COLOR = "{{primaryColor}}";

export function CallToAction() {
  return (
    <section className="rounded-3xl bg-white/10 p-10 text-center text-white shadow-lg">
      <h2 className="text-3xl font-semibold">Ready to grow {SITE_NAME}?</h2>
      <p className="mt-4 text-white/80">
        Keep your brand consistent with the {PRIMARY_COLOR} color system and launch a
        marketing site that matches your product experience.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        <a
          href="/signup"
          className="rounded-full bg-white px-6 py-3 text-base font-semibold"
          style={{ color: PRIMARY_COLOR }}
        >
          Start your trial
        </a>
        <a
          href="/contact"
          className="rounded-full border border-white/60 px-6 py-3 text-base font-semibold text-white"
        >
          Book a demo
        </a>
      </div>
    </section>
  );
}
