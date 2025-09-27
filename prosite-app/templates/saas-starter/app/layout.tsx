import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

const SITE_NAME = "{{siteName}}";
const TAGLINE = "{{tagline}}";
const PRIMARY_COLOR = "{{primaryColor}}";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: TAGLINE,

};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="min-h-screen text-white"
        style={{ backgroundColor: PRIMARY_COLOR }}
      >

        {children}
      </body>
    </html>
  );
}
