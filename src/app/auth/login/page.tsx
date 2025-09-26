import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

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
        <LoginForm />
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
