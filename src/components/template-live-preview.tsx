"use client";

import Link from "next/link";
import { useState } from "react";

export function TemplateLivePreview({
  url,
  name,
  defaultOpen = false,
}: {
  url: string;
  name: string;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="space-y-4 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          {isOpen ? "Hide live preview" : "Open live preview"}
        </button>
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full border border-neutral-200 px-5 py-2 text-sm font-semibold text-neutral-700 transition hover:border-neutral-300 hover:text-neutral-900"
        >
          Open in new tab
        </Link>
      </div>
      {isOpen && (
        <div
          className="overflow-hidden rounded-2xl border border-neutral-200"
          style={{ aspectRatio: "16 / 10" }}
        >
          <iframe
            src={url}
            title={`${name} live preview`}
            className="h-full w-full"
            loading="lazy"
            allow="clipboard-write; fullscreen"
          />
        </div>
      )}
    </div>
  );
}
