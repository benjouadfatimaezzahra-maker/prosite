import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const SITE_NAME = "{{siteName}}";
const PRIMARY_COLOR = "{{primaryColor}}";
const TAGLINE = "{{tagline}}";
const LOGO_URL = "{{logoUrl}}";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: TAGLINE,
  openGraph: {
    title: SITE_NAME,
    description: TAGLINE,
    images: [LOGO_URL],
  },
  themeColor: PRIMARY_COLOR,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-neutral-950 text-neutral-100">
        <div className="fixed inset-x-0 top-0 z-[-1] h-[520px] bg-gradient-to-b from-[var(--brand-color)]/60 via-neutral-950 to-neutral-950" />
        <div className="relative min-h-screen">{children}</div>
      </body>
    </html>
  );
}
