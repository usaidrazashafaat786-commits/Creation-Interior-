import React from "react";
import { Product } from "../types";
import { ShoppingCart, Eye } from "lucide-react";

interface ProductCardProps {
  key?: React.Key;
  product: Product;
  onShowDetails: (prod: Product) => void;
  onAddToCart: (prod: Product, e?: React.MouseEvent) => void;
}

export default function ProductCard({ product, onShowDetails, onAddToCart }: ProductCardProps) {
  return (
    <div
      id={`product_card_${product.id}`}
      onClick={() => onShowDetails(product)}
      className="group flex flex-col h-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
    >
      {/* Product Image Frame */}
      <div className="relative w-full aspect-[4/3] bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 scale-100 group-hover:scale-105"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        {/* Floating Category tag */}
        <span className="absolute top-4 left-4 bg-white/95 dark:bg-zinc-900/95 border border-zinc-200/50 dark:border-zinc-800 px-3 py-1 rounded-full text-[10px] font-bold text-zinc-640 dark:text-zinc-300 tracking-wider uppercase backdrop-blur-sm shadow-sm">
          {product.category}
        </span>

        {/* Availability Marker */}
        {!product.isAvailable && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-4 backdrop-blur-[1px]">
            <span className="bg-red-600 text-white px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-[10px] shadow-md">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Info elements */}
      <div className="flex flex-col flex-1 p-5 md:p-6 justify-between">
        <div>
          <h3 className="line-clamp-1 font-serif text-base font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {product.name}
          </h3>
          <p className="line-clamp-2 text-xs text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2 mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <div>
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
              Luxury Craft
            </span>
            <span className="text-lg font-black text-amber-600 dark:text-amber-400 font-sans">
              ₹ {product.price.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex gap-1.5">
            <button
              id={`quick_view_btn_${product.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onShowDetails(product);
              }}
              className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
              title="View Furniture Specifications"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              id={`quick_add_btn_${product.id}`}
              onClick={(e) => onAddToCart(product, e)}
              disabled={!product.isAvailable}
              className={`p-2.5 rounded-xl flex items-center justify-center transition-colors ${
                product.isAvailable
                  ? "bg-zinc-900 dark:bg-amber-500 text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-amber-600"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
              }`}
              title="Add to Shopping Cart"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
