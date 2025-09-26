import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Create account",
};

export default function RegisterPage() {
  return (
    <div className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center gap-8 px-6 py-16">
        <div className="space-y-3 text-center">
          <h1 className="text-3xl font-semibold text-neutral-900">Create your ProSite account</h1>
          <p className="text-sm text-neutral-600">
            Save your purchased templates, download files anytime, and access deployment guides.
          </p>
        </div>
        <RegisterForm />
        <p className="text-center text-sm text-neutral-600">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-medium text-neutral-900 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
