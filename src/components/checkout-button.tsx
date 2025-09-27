"use client";

import { useState } from "react";

import type { SiteConfig } from "@/types/site-config";

type CheckoutButtonProps = {
  templateId: string;
  templateName: string;
  className?: string;
  defaultConfig?: SiteConfig;
};

export function CheckoutButton({ templateId, templateName, className, defaultConfig }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ templateId, userConfig: defaultConfig }),
      });

      if (response.status === 401) {
        window.location.href = "/auth/login";
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const message = (errorData as { error?: string }).error ?? "Unable to start checkout. Please try again.";
        throw new Error(message);
      }

      const data = (await response.json()) as { url?: string };
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Checkout session missing redirect URL.");
      }
    } catch (error) {
      console.error(`Failed to start checkout for ${templateName}:`, error);
      window.alert("We couldn't start the checkout. Please try again in a moment.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCheckout}
      disabled={isLoading}
      className={`inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-70 ${className ?? ""}`}
    >
      {isLoading ? "Redirecting…" : "Buy now"}
    </button>
  );
}
