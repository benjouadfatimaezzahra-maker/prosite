import { connectDB } from "@/lib/mongodb";
import { verifyPassword } from "@/lib/auth-utils";
import { User } from "@/models/user";
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type Callbacks = NonNullable<AuthOptions["callbacks"]>;
type JwtCallback = Callbacks["jwt"];
type SessionCallback = Callbacks["session"];

type ExtractAuthOptions<T> = T extends {
  (options: infer O): any;
  (req: any, res: any, options: infer O2): any;
  (req: any, res: any, options: infer O3): any;
}
  ? O & O2 & O3
  : never;

type AuthOptions = ExtractAuthOptions<typeof NextAuth>;

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<{
        id: string;
        email: string;
        name?: string | null;
      } | null> {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) {
          return null;
        }

        await connectDB();
        const user = await User.findOne({ email: parsed.data.email }).exec();
        if (!user) {
          return null;
        }

        const isValidPassword = verifyPassword(parsed.data.password, user.password);
        if (!isValidPassword) {
          return null;
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt(...args: Parameters<NonNullable<JwtCallback>>) {
      const [{ token, user }] = args;

      if (user?.id) {
        token.sub = user.id;
      }
      if (typeof user?.name === "string") {
        token.name = user.name;
      }
      if (typeof user?.email === "string") {
        token.email = user.email;
      }
      return token;
    },
    async session(...args: Parameters<NonNullable<SessionCallback>>) {
      const [{ session, token }] = args;

      if (session.user) {
        session.user.id = (token.sub as string) ?? "";
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
