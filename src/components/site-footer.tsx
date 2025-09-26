import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} ProSite Builder. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/privacy" className="transition hover:text-neutral-800">
            Privacy
          </Link>
          <Link href="/terms" className="transition hover:text-neutral-800">
            Terms
          </Link>
          <Link href="/support" className="transition hover:text-neutral-800">
            Support
          </Link>
        </div>
      </div>
    </footer>
  );
}
