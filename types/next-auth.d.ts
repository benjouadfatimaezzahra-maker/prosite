import type { DefaultSession } from "next-auth";

type ExtendedSessionUser = (DefaultSession["user"] & { id?: string }) | null | undefined;

declare module "next-auth" {
  interface Session {
    user?: ExtendedSessionUser;
  }

  interface DefaultSession {
    user?: ExtendedSessionUser;
  }

  interface User {
    id: string;
  }
}

declare module "next-auth/core/types" {
  interface Session {
    user?: ExtendedSessionUser;
  }

  interface DefaultSession {
    user?: ExtendedSessionUser;
  }
}
