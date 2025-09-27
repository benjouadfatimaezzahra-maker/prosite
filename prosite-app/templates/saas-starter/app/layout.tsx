import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "{{siteName}}",
  description: "{{tagline}}",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[{{primaryColor}}] text-white">
        {children}
      </body>
    </html>
  );
}
