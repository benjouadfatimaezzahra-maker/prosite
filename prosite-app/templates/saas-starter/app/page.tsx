import Image from "next/image";

const SITE_NAME = "{{siteName}}";
const TAGLINE = "{{tagline}}";
const LOGO_URL = "{{logoUrl}}";

export default function Page() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-16 px-6 py-24">
      <header className="flex flex-col items-center gap-6 text-center">
        <Image
          src={LOGO_URL}
          alt={`${SITE_NAME} logo`}
          width={96}
          height={96}
          className="h-24 w-24 rounded-full bg-white/10 object-contain"
        />
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          {SITE_NAME}
        </h1>
        <p className="max-w-2xl text-lg text-white/80">{TAGLINE}</p>
      </header>

      <section className="grid gap-10 rounded-3xl bg-white/5 p-10 text-left text-white shadow-xl backdrop-blur">
        <div>
          <h2 className="text-2xl font-semibold">Launch faster with opinionated defaults</h2>
          <p className="mt-4 text-white/80">
            {SITE_NAME} comes ready to ship with a polished SaaS marketing site. Swap
            the placeholder copy, plug in your product screenshots, and ship in a
            weekend.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Why founders love {SITE_NAME}</h3>
          <ul className="mt-4 space-y-3 text-white/80">
            <li>✅ Conversion-first hero section</li>
            <li>✅ Pricing table with highlight cards</li>
            <li>✅ Blog-ready content structure</li>
            <li>✅ Reusable call-to-action components</li>
          </ul>
        </div>
      </section>

      <footer className="flex flex-col items-center justify-between gap-4 rounded-3xl bg-white/5 p-6 text-sm text-white/70 sm:flex-row">
        <span>Built for modern SaaS teams.</span>
        <span>© {new Date().getFullYear()} {SITE_NAME}.</span>
      </footer>
    </main>
  );
}
