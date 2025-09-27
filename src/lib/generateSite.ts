import path from "path";
import type { Dirent } from "fs";
import fs from "fs-extra";

import type { SiteConfig } from "@/types/site-config";

const TEMPLATE_ROOT = path.join(process.cwd(), "templates");
const EXPORT_ROOT = path.join(process.cwd(), "exports");

const TEXT_FILE_EXTENSIONS = new Set([
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".json",
  ".md",
  ".mdx",
  ".txt",
  ".css",
  ".scss",
  ".sass",
  ".html",
  ".mjs",
  ".cjs",
  ".yml",
  ".yaml",
  ".svg",
]);

function normalizeConfig(config: SiteConfig): SiteConfig {
  const normalized: SiteConfig = { ...config };
  for (const key of ["siteName", "primaryColor", "tagline", "logoUrl"]) {
    if (typeof normalized[key] !== "string") {
      normalized[key] = "";
    }
  }
  return normalized;
}

function shouldProcessFile(fileName: string) {
  const extension = path.extname(fileName).toLowerCase();
  if (!extension) {
    return true;
  }
  return TEXT_FILE_EXTENSIONS.has(extension);
}

export async function generateSite(
  templateId: string,
  userConfig: SiteConfig,
  userId: string,
): Promise<string> {
  if (!templateId) {
    throw new Error("templateId is required");
  }

  if (!userId) {
    throw new Error("userId is required");
  }

  const templatePath = path.join(TEMPLATE_ROOT, templateId);
  const templateExists = await fs.pathExists(templatePath);

  if (!templateExists) {
    throw new Error(`Template with id "${templateId}" was not found at ${templatePath}`);
  }

  await fs.ensureDir(EXPORT_ROOT);

  const exportFolderName = `${userId}-${templateId}`;
  const exportPath = path.join(EXPORT_ROOT, exportFolderName);

  await fs.remove(exportPath);
  await fs.copy(templatePath, exportPath, { overwrite: true });

  await replacePlaceholders(exportPath, normalizeConfig(userConfig));

  return exportPath;
}

export default generateSite;

async function replacePlaceholders(directory: string, replacements: Record<string, string>) {
  const entries = await fs.readdir(directory, { withFileTypes: true });

  await Promise.all(
    entries.map(async (entry: Dirent) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        await replacePlaceholders(entryPath, replacements);
        return;
      }

      if (!entry.isFile()) {
        return;
      }

      if (!shouldProcessFile(entry.name)) {
        return;
      }

      const original = await fs.readFile(entryPath, "utf8");
      let updated = original;
      for (const [key, value] of Object.entries(replacements)) {
        const token = `{{${key}}}`;
        updated = updated.split(token).join(value ?? "");
      }

      if (updated !== original) {
        await fs.writeFile(entryPath, updated, "utf8");
      }
    }),
  );
}
