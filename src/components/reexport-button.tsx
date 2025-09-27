"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function ReexportButton({
  purchaseId,
  templateName,
  className,
}: {
  purchaseId: string;
  templateName: string;
  className?: string;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();

  const isLoading = isSubmitting || isPending;

  const handleReexport = async () => {
    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/purchases/${purchaseId}/reexport`, {
        method: "POST",
      });

      if (!response.ok) {
        const error = await response.json().catch(() => null);
        const message = (error as { error?: string } | null)?.error ?? "Failed to regenerate site.";
        throw new Error(message);
      }

      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      console.error(`Failed to re-export ${templateName}`, error);
      window.alert("We couldn't regenerate the project. Please try again in a few seconds.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleReexport}
      disabled={isLoading}
      className={`inline-flex items-center justify-center rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-neutral-300 hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-60 ${className ?? ""}`}
    >
      {isLoading ? "Regenerating…" : "Re-export"}
    </button>
  );
}
