"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const links = [
  { href: "/", label: "Home" },
  { href: "/templates", label: "Templates" },
  { href: "/pricing", label: "Pricing" },
  { href: "/dashboard", label: "Dashboard" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  async function handleSignOut() {
    await signOut({ callbackUrl: "/" });
    router.refresh();
  }

  const isAuthenticated = status === "authenticated" && session?.user;

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
                className={`transition-colors hover:text-neutral-900 ${isActive ? "text-neutral-900" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3 text-sm font-medium">
          {status === "loading" ? (
            <span className="text-neutral-500">Loading...</span>
          ) : isAuthenticated ? (
            <>
              <span className="hidden text-neutral-600 md:inline">
                {session.user?.name ?? session.user?.email}
              </span>
              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-full border border-neutral-200 px-4 py-2 transition hover:border-neutral-300 hover:bg-neutral-50"
              >
                Log out
              </button>
              <Link
                href="/dashboard"
                className="rounded-full bg-neutral-900 px-4 py-2 text-white shadow-md transition hover:bg-neutral-800"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </header>
  );
}
