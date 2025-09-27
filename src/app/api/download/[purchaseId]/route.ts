import path from "path";
import { Readable } from "stream";

import fs from "fs-extra";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import type { Session } from "next-auth";
import { isValidObjectId } from "mongoose";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Purchase } from "@/models/purchase";

export const runtime = "nodejs";

type AuthenticatedSession = Session & {
  user: {
    id: string;
    email?: string | null;
    name?: string | null;
  };
};

export async function GET(
  request: Request,
  { params }: { params: { purchaseId: string } },
) {
  const session = (await getServerSession(authOptions)) as AuthenticatedSession | null;

  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!isValidObjectId(params.purchaseId)) {
    return new NextResponse("Invalid purchase id", { status: 400 });
  }

  await connectDB();

  const purchase = await Purchase.findById(params.purchaseId).exec();

  if (!purchase || purchase.userId !== session.user.id || purchase.status !== "completed") {
    return new NextResponse("Purchase not found", { status: 404 });
  }

  if (!purchase.zipPath) {
    return new NextResponse("File not ready", { status: 404 });
  }

  const absoluteZipPath = path.isAbsolute(purchase.zipPath)
    ? purchase.zipPath
    : path.join(process.cwd(), purchase.zipPath);

  const exists = await fs.pathExists(absoluteZipPath);
  if (!exists) {
    return new NextResponse("File missing", { status: 404 });
  }

  const stream = fs.createReadStream(absoluteZipPath);
  const webStream = Readable.toWeb(stream) as ReadableStream;
  const filename = `${purchase.templateId}.zip`;

  return new NextResponse(webStream, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
