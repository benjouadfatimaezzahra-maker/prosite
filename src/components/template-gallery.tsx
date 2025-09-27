"use client";

import { useMemo } from "react";
import type { TemplateMetadata } from "@/lib/templates";
import { TemplateCard } from "./template-card";

export function TemplateGallery({ templates }: { templates: TemplateMetadata[] }) {
  const sortedTemplates = useMemo(
    () => [...templates].sort((a, b) => a.name.localeCompare(b.name)),
    [templates],
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {sortedTemplates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
}
