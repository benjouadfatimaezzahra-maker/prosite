"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const formEl = event.currentTarget; // ✅ capture before await

  setError(null);
  setSuccess(null);
  setIsSubmitting(true);

  const formData = new FormData(formEl);
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = (await response.json()) as { message?: string };

    if (!response.ok) {
      setError(data.message ?? "Unable to create your account");
      return;
    }

    setSuccess(data.message ?? "Account created successfully");

    formEl.reset(); // ✅ use captured reference, not event.currentTarget

    setTimeout(() => {
      router.push("/auth/login?registered=1");
    }, 1200);
  } catch (err) {
    console.error("Error creating account", err);
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
      <label className="text-sm font-medium text-neutral-700" htmlFor="name">
        Full name
      </label>
      <input
        id="name"
        name="name"
        type="text"
        placeholder="Jordan Smith"
        className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm shadow-sm focus:border-neutral-900 focus:outline-none"
        required
        autoComplete="name"
      />
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
        placeholder="Create a secure password"
        className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm shadow-sm focus:border-neutral-900 focus:outline-none"
        required
        autoComplete="new-password"
        minLength={8}
      />
      <p className="text-xs text-neutral-500">
        Passwords must be at least 8 characters and include at least one letter and one number.
      </p>
      {error && <p className="text-sm font-medium text-red-600">{error}</p>}
      {success && <p className="text-sm font-medium text-emerald-600">{success}</p>}
      <button
        type="submit"
        className="mt-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}
