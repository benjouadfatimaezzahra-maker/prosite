import { promises as fs } from "fs";
import path from "path";

export type SiteConfig = {
  siteName: string;
  primaryColor: string;
  tagline: string;
  logoUrl: string;
  [key: string]: string;
};

export type GenerateSiteOptions = {
  templateId: string;
  userConfig: SiteConfig;
  userId: string;
};

const TEMPLATE_ROOT = path.join(process.cwd(), "prosite-app", "templates");
const EXPORT_ROOT = path.join(process.cwd(), "exports");

export async function generateSite(
  templateId: string,
  userConfig: SiteConfig,
  userId: string
): Promise<string> {
  if (!templateId) {
    throw new Error("templateId is required");
  }

  if (!userId) {
    throw new Error("userId is required");
  }

  const templatePath = path.join(TEMPLATE_ROOT, templateId);
  const templateExists = await exists(templatePath);

  if (!templateExists) {
    throw new Error(`Template with id "${templateId}" was not found at ${templatePath}`);
  }

  await fs.mkdir(EXPORT_ROOT, { recursive: true });

  const exportFolderName = `${userId}-${templateId}`;
  const exportPath = path.join(EXPORT_ROOT, exportFolderName);

  await fs.rm(exportPath, { recursive: true, force: true });
  await fs.mkdir(exportPath, { recursive: true });

  await fs.cp(templatePath, exportPath, { recursive: true });

  await replacePlaceholders(exportPath, userConfig);

  return exportPath;
}

export default generateSite;

async function replacePlaceholders(directory: string, replacements: Record<string, string>) {
  const entries = await fs.readdir(directory, { withFileTypes: true });

  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        await replacePlaceholders(entryPath, replacements);
        return;
      }

      if (!entry.isFile()) {
        return;
      }

      const buffer = await fs.readFile(entryPath);
      const original = buffer.toString("utf8");

      let updated = original;
      for (const [key, value] of Object.entries(replacements)) {
        const token = `{{${key}}}`;
        updated = updated.split(token).join(value ?? "");
      }

      if (updated !== original) {
        await fs.writeFile(entryPath, updated, "utf8");
      }
    })
  );
}

async function exists(targetPath: string) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}
