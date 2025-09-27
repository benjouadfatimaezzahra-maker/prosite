import type { SiteConfig } from "@/types/site-config";

export type TemplateMetadata = {
  id: string;
  name: string;
  description: string;
  previewImage: string;
  price: number;
};

export const templates: TemplateMetadata[] = [
  {
    id: "saas-starter",
    name: "SaaS Starter",
    description: "Launch a polished SaaS marketing site with opinionated sections and ready-to-swap copy.",
    previewImage: "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80",
    price: 129,
  },
  {
    id: "portfolio-site",
    name: "Portfolio Spotlight",
    description: "Showcase your best work with a cinematic portfolio layout and curated project grid.",
    previewImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1600&q=80",
    price: 149,
  },
];

export const templateConfigDefaults: Record<string, SiteConfig> = {
  "saas-starter": {
    siteName: "Launchly",
    primaryColor: "#6366F1",
    tagline: "A conversion-ready SaaS marketing site with modern storytelling and fast iteration.",
    logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=256&q=80",
  },
  "portfolio-site": {
    siteName: "Studio North",
    primaryColor: "#F97316",
    tagline: "Elevated visuals and editorial storytelling for agencies crafting unforgettable brands.",
    logoUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=256&q=80",
  },
};

export function getTemplateById(id: string) {
  return templates.find((template) => template.id === id);
}

export function getTemplateDefaultConfig(templateId: string): SiteConfig {
  return templateConfigDefaults[templateId] ?? {
    siteName: "Your Brand",
    primaryColor: "#0F172A",
    tagline: "A custom Next.js site generated just for you.",
    logoUrl: "https://dummyimage.com/128x128/0f172a/ffffff&text=Logo",
  };
}
