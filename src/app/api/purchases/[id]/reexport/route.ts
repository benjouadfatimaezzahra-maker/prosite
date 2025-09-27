import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { isValidObjectId } from "mongoose";

import { exportAndZipSite } from "@/lib/exportSite";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { getTemplateDefaultConfig } from "@/lib/templates";
import { Purchase } from "@/models/purchase";

export const runtime = "nodejs";

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isValidObjectId(params.id)) {
    return NextResponse.json({ error: "Invalid purchase id" }, { status: 400 });
  }

  await connectDB();
  const purchase = await Purchase.findById(params.id).exec();

  if (!purchase || purchase.userId !== session.user.id) {
    return NextResponse.json({ error: "Purchase not found" }, { status: 404 });
  }

  const userConfig = purchase.userConfig ?? getTemplateDefaultConfig(purchase.templateId);

  try {
    const exportResult = await exportAndZipSite(
      purchase.templateId,
      userConfig,
      purchase.userId,
      purchase.downloadToken,
    );

    purchase.exportPath = exportResult.exportPath;
    purchase.zipPath = exportResult.zipPath;
    purchase.downloadToken = exportResult.downloadToken;
    purchase.lastGeneratedAt = new Date();
    purchase.status = "completed";
    await purchase.save();

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Failed to re-export template", error);
    return NextResponse.json({ error: "Failed to regenerate site" }, { status: 500 });
  }
}
