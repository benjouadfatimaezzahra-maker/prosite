"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/templates", label: "Templates" },
  { href: "/pricing", label: "Pricing" },
  { href: "/dashboard", label: "Dashboard" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          ProSite
        </Link>
        <nav className="hidden gap-6 text-sm font-medium text-neutral-600 md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-neutral-900 ${
                  isActive ? "text-neutral-900" : ""
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3 text-sm font-medium">
          <Link
            href="/auth/login"
            className="rounded-full border border-neutral-200 px-4 py-2 transition hover:border-neutral-300 hover:bg-neutral-50"
          >
            Log in
          </Link>
          <Link
            href="/auth/register"
            className="rounded-full bg-neutral-900 px-4 py-2 text-white shadow-md transition hover:bg-neutral-800"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
