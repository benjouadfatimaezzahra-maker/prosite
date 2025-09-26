export type Template = {
  id: string;
  name: string;
  slug: string;
  category: "Business" | "Portfolio" | "Restaurant" | "E-commerce" | "Wellness";
  price: number;
  description: string;
  features: string[];
  techStack: string[];
  thumbnail: string;
  previewImages: string[];
  demoUrl?: string;
  deliverables: string[];
  requiresPayment: boolean;
  delivery: {
    format: "zip";
    storedAt: "local-folder" | "s3-bucket";
    downloadPath: string;
    fileSize: string;
    contents: string[];
    notes?: string;
  };
};

export const templates: Template[] = [
  {
    id: "dental-studio",
    name: "Dental Studio",
    slug: "dental-studio",
    category: "Wellness",
    price: 129,
    description:
      "A polished, conversion-focused site for dental clinics with lead capture and treatment highlights.",
    features: [
      "Hero section with appointment CTA",
      "Service highlights and treatment grid",
      "Patient testimonials and FAQ",
      "Contact form and Google Maps embed",
    ],
    techStack: ["Next.js", "Tailwind CSS", "TypeScript"],
    thumbnail:
      "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=600&q=80",
    previewImages: [
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267d6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=1200&q=80",
    ],
    demoUrl: "https://example.com/templates/dental-studio",
    deliverables: [
      "Ready-to-deploy Next.js project",
      "Optimized images and icons",
      "Configured appointment form",
      "SEO metadata templates",
    ],
    requiresPayment: true,
    delivery: {
      format: "zip",
      storedAt: "local-folder",
      downloadPath: "/downloads/dental-studio.zip",
      fileSize: "24.8 MB",
      contents: [
        "next-app/ – production-ready Next.js project",
        "public/ – optimized hero and treatment imagery",
        "docs/launch-checklist.md",
      ],
      notes: "Sample assets are bundled locally for the demo. Live checkouts upload to S3 for durability.",
    },
  },
  {
    id: "artisan-roastery",
    name: "Artisan Roastery",
    slug: "artisan-roastery",
    category: "Restaurant",
    price: 99,
    description:
      "A warm, editorial-style layout for cafés and roasteries with menu highlights and event promos.",
    features: [
      "Story-driven hero with ambient photography",
      "Seasonal menu showcase",
      "Subscription form integration",
      "Event calendar and gallery",
    ],
    techStack: ["Next.js", "Tailwind CSS"],
    thumbnail:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80",
    previewImages: [
      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=80",
    ],
    demoUrl: "https://example.com/templates/artisan-roastery",
    deliverables: [
      "Responsive marketing site",
      "Menu CMS integration guide",
      "Newsletter form wiring",
      "Brand color presets",
    ],
    requiresPayment: true,
    delivery: {
      format: "zip",
      storedAt: "local-folder",
      downloadPath: "/downloads/artisan-roastery.zip",
      fileSize: "18.6 MB",
      contents: [
        "next-app/ – statically generated coffee shop site",
        "content/ – seasonal menu JSON",
        "docs/email-campaigns.md",
      ],
      notes: "Synced to S3 nightly once Stripe purchase completes.",
    },
  },
  {
    id: "luminous-portfolio",
    name: "Luminous Portfolio",
    slug: "luminous-portfolio",
    category: "Portfolio",
    price: 149,
    description:
      "A bold, cinematic portfolio built for photographers and creative studios with immersive galleries.",
    features: [
      "Fullscreen hero slideshow",
      "Case study layout with narrative sections",
      "Client logo strip",
      "Contact and booking form",
    ],
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    thumbnail:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80",
    previewImages: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    ],
    demoUrl: "https://example.com/templates/luminous-portfolio",
    deliverables: [
      "Photography-forward landing page",
      "Gallery lightbox experience",
      "Blog listing and detail pages",
      "Inquiry automation checklist",
    ],
    requiresPayment: true,
    delivery: {
      format: "zip",
      storedAt: "local-folder",
      downloadPath: "/downloads/luminous-portfolio.zip",
      fileSize: "31.2 MB",
      contents: [
        "next-app/ – portfolio shell with CMS hooks",
        "public/ – curated photography set",
        "docs/post-processing-guide.md",
      ],
      notes: "Local folder mirrors the production bucket during development.",
    },
  },
  {
    id: "modern-consultancy",
    name: "Modern Consultancy",
    slug: "modern-consultancy",
    category: "Business",
    price: 119,
    description:
      "A crisp, authority-building site for agencies and consultants with service breakdowns and proof points.",
    features: [
      "Hero with social proof bar",
      "Services grid and industry verticals",
      "Resources and lead magnet section",
      "CMS-ready blog hub",
    ],
    techStack: ["Next.js", "Tailwind CSS", "Contentlayer"],
    thumbnail:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80",
    previewImages: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    ],
    demoUrl: "https://example.com/templates/modern-consultancy",
    deliverables: [
      "Authority-focused landing page",
      "Blog and case study templates",
      "Automations integration guide",
      "Analytics dashboard starter",
    ],
    requiresPayment: true,
    delivery: {
      format: "zip",
      storedAt: "local-folder",
      downloadPath: "/downloads/modern-consultancy.zip",
      fileSize: "22.4 MB",
      contents: [
        "next-app/ – agency marketing funnel",
        "integrations/ – Zapier + HubSpot recipes",
        "docs/brand-positioning.md",
      ],
      notes: "Pending purchases remain locked until Stripe marks the payment as successful.",
    },
  },
  {
    id: "boutique-botanics",
    name: "Boutique Botanics",
    slug: "boutique-botanics",
    category: "E-commerce",
    price: 139,
    description:
      "A refined storefront for boutique retailers with curated product grids and storytelling sections.",
    features: [
      "Editorial hero with product spotlight",
      "Product grid and featured collection",
      "Customer reviews and UGC section",
      "Checkout integration guide",
    ],
    techStack: ["Next.js", "Tailwind CSS", "Shopify Hydrogen"],
    thumbnail:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80",
    previewImages: [
      "https://images.unsplash.com/photo-1438557068880-c5f474830377?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
    ],
    demoUrl: "https://example.com/templates/boutique-botanics",
    deliverables: [
      "Shop-ready product pages",
      "Cart and checkout wiring",
      "Email automation starter kit",
      "Brand photography moodboard",
    ],
    requiresPayment: true,
    delivery: {
      format: "zip",
      storedAt: "s3-bucket",
      downloadPath: "https://cdn.prosite.dev/templates/boutique-botanics.zip",
      fileSize: "45.8 MB",
      contents: [
        "next-app/ – Hydrogen-powered storefront",
        "scripts/ – deployment helpers",
        "docs/fulfillment-guide.md",
      ],
      notes: "Uploaded directly to the `prosite-templates` S3 bucket after purchase webhook succeeds.",
    },
  },
];

export const categories = [
  "All",
  ...Array.from(new Set(templates.map((template) => template.category))),
] as const;

export type CategoryFilter = (typeof categories)[number];

export function getTemplateById(id: string) {
  return templates.find((template) => template.id === id);
}
