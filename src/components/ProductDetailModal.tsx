import React from "react";
import { Product } from "../types";
import { X, ShoppingCart, HelpCircle, Shield, Truck, PackageCheck } from "lucide-react";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (prod: Product) => void;
}

export default function ProductDetailModal({ product, onClose, onAddToCart }: ProductDetailModalProps) {
  if (!product) return null;

  return (
    <div id="detail_modal_overlay" className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        
        {/* Floating Close Button */}
        <button
          id="detail_close_btn"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/80 dark:bg-zinc-900/80 hover:bg-zinc-100 dark:hover:bg-zinc-805 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 transition z-10 backdrop-blur-sm shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 md:p-10 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-11">
            
            {/* Visual Frame left */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <div className="relative aspect-[4/3] md:aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-inner">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                <span className="absolute bottom-4 left-4 bg-amber-500 text-zinc-950 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                  {product.category}
                </span>
              </div>

              {/* Service badges */}
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-zinc-500 dark:text-zinc-400 mt-2">
                <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200/20">
                  <Shield className="w-4 h-4 mx-auto text-amber-500 mb-1" />
                  <strong>5-Year Warranty</strong>
                </div>
                <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200/20">
                  <Truck className="w-4 h-4 mx-auto text-amber-500 mb-1" />
                  <strong>Free Shipping</strong>
                </div>
                <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200/20">
                  <PackageCheck className="w-4 h-4 mx-auto text-amber-500 mb-1" />
                  <strong>Safe Transit</strong>
                </div>
              </div>
            </div>

            {/* Specification Content Right */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight">
                  {product.name}
                </h2>
                
                <p className="text-sm font-bold text-amber-600 dark:text-amber-400 tracking-wider mt-1">
                  Creation Interiors bespoke Design Series
                </p>

                <div className="mt-5 mb-6">
                  <span className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block mb-1">
                    Authentic Price Catalog
                  </span>
                  <span className="text-3xl font-serif font-black text-zinc-950 dark:text-zinc-100 font-sans">
                    ₹ {product.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs text-zinc-400 ml-2">
                    (Inclusive of all Taxes, Octroi & Installation Services)
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1.5">
                      Description & Materials
                    </h4>
                    <p className="text-zinc-640 dark:text-zinc-300 text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2 border-b border-zinc-100 dark:border-zinc-800 pb-1.5">
                      Granular Specifications
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2">
                      {Object.entries(product.specifications || {}).map(([key, val]) => (
                        <div key={key} className="flex justify-between items-center text-xs py-1 border-b border-zinc-100/50 dark:border-zinc-800/50">
                          <span className="text-zinc-400 dark:text-zinc-500 text-[11px]">{key}:</span>
                          <span className="font-semibold text-zinc-800 dark:text-zinc-200">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row gap-3">
                <button
                  id="detail_add_to_cart_btn"
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  disabled={!product.isAvailable}
                  className={`flex-1 py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-2 transition ${
                    product.isAvailable
                      ? "bg-zinc-900 border border-zinc-900 text-white dark:bg-amber-500 dark:border-amber-500 dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-amber-600 shadow-md hover:shadow-xl"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>{product.isAvailable ? "Add to Shopping Cart" : "Currently Out of Stock"}</span>
                </button>
                <button
                  id="detail_explore_specs_btn"
                  onClick={onClose}
                  className="py-4 px-6 rounded-2xl font-bold border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition text-sm"
                >
                  Browse Other Models
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
