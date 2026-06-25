import React from "react";
import { Product } from "../types";
import { X, Heart, ShoppingCart, Trash2, LayoutGrid } from "lucide-react";

interface WishlistSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: Product[];
  onToggleWishlist: (prod: Product, e?: any) => void;
  onAddToCart: (prod: Product, e?: any) => void;
}

export default function WishlistSidebar({
  isOpen,
  onClose,
  wishlistItems,
  onToggleWishlist,
  onAddToCart
}: WishlistSidebarProps) {
  if (!isOpen) return null;

  return (
    <div 
      id="wishlist_sidebar_overlay" 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-end z-50 transition-opacity animate-fadeIn"
      onClick={onClose}
    >
      {/* Sidebar Container */}
      <div 
        className="w-full max-w-md bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-850 h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-slideInRight"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Toolbar */}
        <div className="p-6 border-b border-zinc-150 dark:border-zinc-850 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/20">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
              <Heart className="w-5 h-5 fill-red-500 stroke-red-500" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-zinc-900 dark:text-zinc-50">
                Your Wishlist
              </h3>
              <p className="text-[10px] text-zinc-400">
                Saved furniture & custom layouts ({wishlistItems.length})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition outline-none"
            title="Close Wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Wishlist Items Frame */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <div className="w-16 h-16 bg-zinc-50 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto border border-zinc-100 dark:border-zinc-800 shadow-sm">
                <Heart className="w-7 h-7 text-zinc-300" />
              </div>
              <div className="space-y-1">
                <p className="text-zinc-800 dark:text-zinc-200 text-sm font-bold">
                  Your wishlist is empty
                </p>
                <p className="text-zinc-400 text-xs max-w-[250px] mx-auto leading-relaxed">
                  Tap the heart icons on our luxury furniture cards to curate your dream setup!
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-xs font-bold text-[#96bd2d] hover:underline bg-[#96bd2d]/5 border border-[#96bd2d]/10 px-4 py-2 rounded-xl transition"
              >
                Start Browsing
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {wishlistItems.map((prod) => (
                <div
                  key={prod.id}
                  className="group/item flex gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-150 dark:border-zinc-900 transition hover:shadow-md"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-xl bg-zinc-200 dark:bg-zinc-800 overflow-hidden flex-shrink-0 border border-zinc-100 dark:border-zinc-800 relative">
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Details Layout */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-serif font-bold text-zinc-900 dark:text-zinc-100 truncate">
                          {prod.name}
                        </h4>
                        <button
                          onClick={() => onToggleWishlist(prod)}
                          className="p-1 text-red-500 hover:text-zinc-400 dark:hover:text-zinc-300 transition duration-150 flex-shrink-0"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5 stroke-[1.5]" />
                        </button>
                      </div>
                      <p className="text-[10px] text-zinc-400 mt-0.5 uppercase tracking-wider font-bold">
                        {prod.category}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-1.5 mt-2.5 pt-2 border-t border-zinc-100 dark:border-zinc-900/50">
                      <span className="text-xs font-black text-amber-600 dark:text-amber-400">
                        Rs. {prod.price.toLocaleString("en-IN")}
                      </span>

                      <button
                        onClick={(e) => {
                          onAddToCart(prod, e);
                          // Provide slight interactive behavior by closing or leaving open
                        }}
                        disabled={!prod.isAvailable}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                          prod.isAvailable
                            ? "bg-zinc-900 hover:bg-zinc-800 dark:bg-[#96bd2d] dark:hover:bg-[#85ab25] text-white dark:text-zinc-950"
                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
                        }`}
                      >
                        <ShoppingCart className="w-3 h-3" />
                        <span>Add to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer info box */}
        <div className="p-6 border-t border-zinc-150 dark:border-zinc-850 bg-zinc-50/50 dark:bg-zinc-900/10">
          <div className="flex items-center gap-2 text-[10px] text-zinc-400 leading-relaxed justify-center text-center">
            <span>✨ Save as many items as you like to construct a customizable quote later.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
