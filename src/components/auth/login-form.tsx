"use client";

import { useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const registered = searchParams.get("registered");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(
    registered ? "Account created successfully. You can log in now." : null,
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
      setError("Please provide both an email and password");
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (!result) {
        setError("Unexpected response from the server");
        return;
      }

      if (result.error) {
        setError("Invalid email or password. Please try again.");
        return;
      }

      setSuccess("Logged in successfully. Redirecting...");
      router.push(result.url ?? callbackUrl);
      router.refresh();
    } catch (err) {
      console.error("Error signing in", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm"
    >
      <label className="text-sm font-medium text-neutral-700" htmlFor="email">
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="you@studio.com"
        className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm shadow-sm focus:border-neutral-900 focus:outline-none"
        required
        autoComplete="email"
      />
      <label className="text-sm font-medium text-neutral-700" htmlFor="password">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="••••••••"
        className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm shadow-sm focus:border-neutral-900 focus:outline-none"
        required
        autoComplete="current-password"
      />
      {error && <p className="text-sm font-medium text-red-600">{error}</p>}
      {success && <p className="text-sm font-medium text-emerald-600">{success}</p>}
      <button
        type="submit"
        className="mt-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
}
