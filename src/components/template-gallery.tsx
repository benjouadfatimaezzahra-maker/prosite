"use client";

import { useMemo, useState } from "react";
import { categories, type Template } from "@/lib/templates";
import { TemplateCard } from "./template-card";

export function TemplateGallery({ templates }: { templates: Template[] }) {
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>("All");

  const filteredTemplates = useMemo(() => {
    if (selectedCategory === "All") return templates;
    return templates.filter((template) => template.category === selectedCategory);
  }, [selectedCategory, templates]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-900"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {filteredTemplates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
}
