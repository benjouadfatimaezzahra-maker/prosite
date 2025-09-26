import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Log in",
};

export default function LoginPage() {
  return (
    <div className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center gap-8 px-6 py-16">
        <div className="space-y-3 text-center">
          <h1 className="text-3xl font-semibold text-neutral-900">Welcome back</h1>
          <p className="text-sm text-neutral-600">
            Log in to access your purchased templates and download history.
          </p>
        </div>
        <form className="flex flex-col gap-4 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
          <label className="text-sm font-medium text-neutral-700" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@studio.com"
            className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm shadow-sm focus:border-neutral-900 focus:outline-none"
          />
          <label className="text-sm font-medium text-neutral-700" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm shadow-sm focus:border-neutral-900 focus:outline-none"
          />
          <button
            type="submit"
            className="mt-4 rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Log in
          </button>
        </form>
        <p className="text-center text-sm text-neutral-600">
          Need an account?{" "}
          <Link href="/auth/register" className="font-medium text-neutral-900 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
