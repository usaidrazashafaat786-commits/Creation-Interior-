import React from "react";
import { X, Sofa, Bed, Utensils, Armchair, HelpCircle, FileCheck2, TableOfContents, LayoutGrid, ChevronRight, Settings, PhoneCall } from "lucide-react";

interface CategorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (cat: string | null) => void;
  onOpenAdmin: () => void;
}

const iconMap: Record<string, any> = {
  "bedroom furniture": Bed,
  "bedroom": Bed,
  "dining furniture": Utensils,
  "dining table": Utensils,
  "dining": Utensils,
  "sofas": Sofa,
  "sofa": Sofa,
  "sofa set": Sofa,
  "chairs": Armchair,
  "chair": Armchair,
  "wardrobes": TableOfContents,
  "wardrobe": TableOfContents,
  "foam products": FileCheck2,
  "foam": FileCheck2,
  "mattress": FileCheck2
};

function getCategoryIcon(catName: string) {
  const normalized = catName.toLowerCase().trim();
  if (iconMap[normalized]) return iconMap[normalized];
  for (const [key, value] of Object.entries(iconMap)) {
    if (normalized.includes(key)) return value;
  }
  return LayoutGrid;
}

export default function CategorySidebar({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  onSelectCategory,
  onOpenAdmin
}: CategorySidebarProps) {
  if (!isOpen) return null;

  return (
    <div 
      id="category_sidebar_overlay" 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-start z-50 transition-opacity animate-fadeIn"
      onClick={onClose}
    >
      {/* Sidebar background block - Slides from LEFT */}
      <div 
        className="w-full max-w-sm bg-white dark:bg-zinc-950 border-r border-zinc-100 dark:border-zinc-900 h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-slideInLeft"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header toolbar */}
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/20">
          <div className="flex flex-col">
            <span className="text-[10px] font-black tracking-widest text-[#96bd2d] uppercase">CREATION INTERIORS</span>
            <h3 className="text-xl font-serif font-black text-zinc-900 dark:text-zinc-50 mt-0.5">
              Browse Categories
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition outline-none"
            title="Close Menu"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Categories content frame */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Main Option: All Collections */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">
              Showroom Catalog
            </h4>
            <button
              onClick={() => {
                onSelectCategory(null);
                onClose();
              }}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-left transition duration-150 ${
                selectedCategory === null
                  ? "bg-[#96bd2d]/10 border-[#96bd2d]/30 text-[#96bd2d] font-bold"
                  : "bg-zinc-50/50 dark:bg-zinc-900/40 border-zinc-100 dark:border-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${selectedCategory === null ? "bg-[#96bd2d]/15 text-[#96bd2d]" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"}`}>
                  <LayoutGrid className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-xs font-bold">All Furniture Collections</p>
                  <p className="text-[10px] text-zinc-400 mt-0.5">Browse all luxury models & vanity setups</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </button>
          </div>

          {/* Dynamic Categories List */}
          <div className="space-y-2.5">
            <h4 className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">
              Premium Collections
            </h4>
            
            <div className="space-y-2">
              {categories.map((catName) => {
                const IconComp = getCategoryIcon(catName);
                const isSelected = selectedCategory === catName;

                return (
                  <button
                    key={catName}
                    onClick={() => {
                      onSelectCategory(catName);
                      onClose();
                    }}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-left transition duration-150 ${
                      isSelected
                        ? "bg-[#96bd2d]/10 border-[#96bd2d]/30 text-[#96bd2d] font-bold"
                        : "bg-zinc-50/50 dark:bg-zinc-900/40 border-zinc-100 dark:border-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl ${isSelected ? "bg-[#96bd2d]/15 text-[#96bd2d]" : "bg-zinc-100 dark:bg-zinc-800 text-[#96bd2d]"}`}>
                        <IconComp className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold">{catName}</p>
                        <p className="text-[10px] text-zinc-400 mt-0.5">View handpicked {catName.toLowerCase()}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Hot-links */}
          <div className="p-4 bg-[#96bd2d]/5 rounded-2xl border border-[#96bd2d]/10 space-y-3">
            <h5 className="text-[10px] font-bold text-zinc-700 dark:text-zinc-300 tracking-wider uppercase">
              Showroom Support
            </h5>
            <div className="text-[11px] text-zinc-500 leading-relaxed space-y-2">
              <p>📍 Seasoned solid teakwood core construction with complimentary on-site assembly across Pakistan.</p>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#96bd2d]">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Active WhatsApp Support lines</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer controls inside sidebar */}
        <div className="p-6 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/10 space-y-3">
          <button
            onClick={() => {
              onClose();
              onOpenAdmin();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-bold text-zinc-700 dark:text-zinc-300 transition duration-150"
          >
            <Settings className="w-4 h-4" />
            <span>Open Customizer Admin Board</span>
          </button>
          <p className="text-[9px] text-zinc-400 text-center">
            For senior showroom managers & design customization logs
          </p>
        </div>

      </div>
    </div>
  );
}
