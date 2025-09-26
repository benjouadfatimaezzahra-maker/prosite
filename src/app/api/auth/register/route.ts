import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/user";
import { hashPassword } from "@/lib/auth-utils";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Please provide a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, "Password must contain at least one letter and one number"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      const errorMessage = parsed.error.issues[0]?.message ?? "Invalid request";
      return NextResponse.json({ message: errorMessage }, { status: 400 });
    }

    await connectDB();

    const existingUser = await User.findOne({ email: parsed.data.email }).exec();
    if (existingUser) {
      return NextResponse.json(
        { message: "An account with that email already exists" },
        { status: 409 },
      );
    }

    const hashedPassword = hashPassword(parsed.data.password);
    await User.create({
      name: parsed.data.name,
      email: parsed.data.email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "Account created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error creating user", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
