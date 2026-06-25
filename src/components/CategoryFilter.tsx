import React from "react";
import { Sofa, Bed, Utensils, Armchair, HelpCircle, FileCheck2, TableOfContents, LayoutGrid } from "lucide-react";

const iconMap: Record<string, any> = {
  "sofas": Sofa,
  "sofa": Sofa,
  "beds": Bed,
  "bed": Bed,
  "dining tables": Utensils,
  "dining table": Utensils,
  "dining": Utensils,
  "chairs": Armchair,
  "chair": Armchair,
  "wardrobes": TableOfContents,
  "wardrobe": TableOfContents,
  "foam products": FileCheck2,
  "foam": FileCheck2,
  "mattress": FileCheck2,
  "mattresses": FileCheck2
};

function getIconForCategory(catName: string) {
  const normalized = catName.toLowerCase().trim();
  if (iconMap[normalized]) return iconMap[normalized];
  for (const [key, value] of Object.entries(iconMap)) {
    if (normalized.includes(key)) return value;
  }
  return LayoutGrid; // Clean generic backup icon
}

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (cat: string | null) => void;
  categories: string[];
}

export default function CategoryFilter({ selectedCategory, onSelectCategory, categories }: CategoryFilterProps) {
  return (
    <div id="category_filter_ribbon" className="space-y-4">
      <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Filter by Furniture Type
        </h3>
        {selectedCategory && (
          <button
            id="clear_category_filter"
            onClick={() => onSelectCategory(null)}
            className="text-xs text-amber-600 dark:text-amber-400 font-bold hover:underline"
          >
            Clear Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5">
        
        {/* All trigger pill */}
        <button
          id="category_pill_all"
          onClick={() => onSelectCategory(null)}
          className={`flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl text-xs font-bold border transition ${
            selectedCategory === null
              ? "bg-amber-500 border-amber-500 text-zinc-950 shadow-md scale-[1.02]"
              : "bg-white dark:bg-zinc-900 border-zinc-150 dark:border-zinc-850 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 shadow-sm"
          }`}
        >
          <span>All Collections</span>
        </button>

        {/* Dynamic Category Pill Buttons */}
        {categories.map((catName) => {
          const IconComponent = getIconForCategory(catName);
          const isSelected = selectedCategory === catName;

          return (
            <button
              key={catName}
              id={`category_pill_${catName.replace(/\s+/g, "_")}`}
              onClick={() => onSelectCategory(catName)}
              className={`flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl text-xs font-bold border transition ${
                isSelected
                  ? "bg-amber-500 border-amber-500 text-zinc-950 shadow-md scale-[1.02]"
                  : "bg-white dark:bg-zinc-900 border-zinc-150 dark:border-zinc-850 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-350 shadow-sm"
              }`}
            >
              <IconComponent className={`w-4 h-4 ${isSelected ? "text-zinc-950" : "text-amber-500"}`} />
              <span>{catName}</span>
            </button>
          );
        })}

      </div>
    </div>
  );
}

