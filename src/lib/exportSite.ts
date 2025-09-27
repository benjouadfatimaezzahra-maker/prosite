import crypto from "crypto";
import path from "path";

import archiver from "archiver";
import fs from "fs-extra";

import generateSite from "@/lib/generateSite";
import type { SiteConfig } from "@/types/site-config";

const EXPORT_ROOT = path.join(process.cwd(), "exports");
const ZIP_ROOT = path.join(EXPORT_ROOT, "zips");

export type ExportResult = {
  exportPath: string;
  zipPath: string;
  downloadToken: string;
};

export async function exportAndZipSite(
  templateId: string,
  userConfig: SiteConfig,
  userId: string,
  existingToken?: string,
): Promise<ExportResult> {
  const exportPath = await generateSite(templateId, userConfig, userId);
  await fs.ensureDir(ZIP_ROOT);

  const zipFileName = `${userId}-${templateId}.zip`;
  const zipPath = path.join(ZIP_ROOT, zipFileName);

  await fs.remove(zipPath);
  await zipDirectory(exportPath, zipPath);

  const downloadToken = existingToken ?? crypto.randomBytes(32).toString("hex");

  return {
    exportPath: path.relative(process.cwd(), exportPath),
    zipPath: path.relative(process.cwd(), zipPath),
    downloadToken,
  };
}

async function zipDirectory(sourceDir: string, targetZipPath: string) {
  await fs.ensureDir(path.dirname(targetZipPath));

  await new Promise<void>((resolve, reject) => {
    const output = fs.createWriteStream(targetZipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", resolve);
    output.on("error", reject);
    archive.on("error", reject);

    archive.pipe(output);
    archive.directory(sourceDir, false);
    archive.finalize().catch(reject);
  });
}
