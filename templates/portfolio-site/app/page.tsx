import Image from "next/image";

const SITE_NAME = "{{siteName}}";
const PRIMARY_COLOR = "{{primaryColor}}";
const TAGLINE = "{{tagline}}";
const LOGO_URL = "{{logoUrl}}";

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1510574445805-7320ebc61e08?auto=format&fit=crop&w=1200&q=80",
];

export default function Page() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-16 px-6 py-24">
      <header className="flex flex-col gap-6 text-center sm:text-left">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
          <Image
            src={LOGO_URL}
            alt={`${SITE_NAME} logo`}
            width={80}
            height={80}
            className="h-20 w-20 rounded-full border border-white/20 object-cover shadow-2xl"
          />
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Portfolio</p>
            <h1 className="text-4xl font-semibold sm:text-5xl">{SITE_NAME}</h1>
            <p className="max-w-xl text-sm text-white/70">{TAGLINE}</p>
          </div>
        </div>
      </header>

      <section className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur">
        <h2 className="text-2xl font-semibold text-white">Spotlight projects</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {GALLERY_IMAGES.map((image) => (
            <figure
              key={image}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40"
            >
              <Image
                src={image}
                alt="Featured project"
                width={600}
                height={600}
                className="h-40 w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </figure>
          ))}
        </div>
      </section>

      <section className="grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur">
        <h2 className="text-2xl font-semibold text-white">Services</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            "Brand storytelling",
            "Visual identity",
            "Product photography",
          ].map((service) => (
            <div key={service} className="space-y-3 rounded-2xl border border-white/10 bg-black/40 p-6">
              <span
                className="inline-flex h-12 w-12 items-center justify-center rounded-full text-lg font-semibold text-white"
                style={{ backgroundColor: PRIMARY_COLOR }}
              >
                {service.charAt(0)}
              </span>
              <h3 className="text-lg font-semibold text-white">{service}</h3>
              <p className="text-sm text-white/70">
                Craft tailored deliverables for {SITE_NAME} clients with a consistent brand voice across each engagement.
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-white/10 bg-black/40 p-6 text-xs text-white/60 sm:flex-row">
        <span>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</span>
        <span>Crafted with intention. Connect for collaborations.</span>
      </footer>
    </main>
  );
}
