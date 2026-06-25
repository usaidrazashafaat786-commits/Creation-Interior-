import React, { useState } from "react";
import { CartItem, Order } from "../types";
import { X, Trash2, ShoppingBag, ArrowRight, MessageSquare, Phone, MapPin, ClipboardCheck } from "lucide-react";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (prodId: string, change: number) => void;
  onRemoveItem: (prodId: string) => void;
  onPlaceOrder: (phone: string, address: string) => void;
  userEmail?: string;
}

export default function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onPlaceOrder,
  userEmail
}: CartSidebarProps) {
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [shippingError, setShippingError] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setShippingError(null);

    if (!phone.trim() || phone.length < 8) {
      setShippingError("Please enter a valid WhatsApp phone number contact.");
      return;
    }

    if (!address.trim() || address.length < 10) {
      setShippingError("Please enter a comprehensive delivery address.");
      return;
    }

    // Call checkout trigger
    onPlaceOrder(phone, address);
    
    // Clear inputs on success
    setPhone("");
    setAddress("");
  };

  return (
    <div id="cart_sidebar_overlay" className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-end z-50">
      
      {/* Sidebar background block */}
      <div className="w-full max-w-md bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-850 h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        
        {/* Header toolbar */}
        <div className="p-6 border-b border-zinc-150 dark:border-zinc-850 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-amber-500" />
            <h3 className="text-xl font-serif font-bold text-zinc-900 dark:text-zinc-50">
              Shopping Cart ({cartItems.length})
            </h3>
          </div>
          <button
            id="cart_sidebar_close"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Items Frame */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-zinc-50 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-100 dark:border-zinc-800">
                <ShoppingBag className="w-7 h-7 text-zinc-400" />
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                Your shopping cart is currently empty.
              </p>
              <button
                id="cart_start_shopping_btn"
                onClick={onClose}
                className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-2 hover:underline"
              >
                Browse Luxurious Sofas & Beds
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.product.id}
                id={`cart_item_${item.product.id}`}
                className="flex gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-900/80 transition shadow-sm"
              >
                {/* Product square thumbnail */}
                <div className="w-16 h-16 rounded-xl bg-zinc-200 dark:bg-zinc-800 overflow-hidden flex-shrink-0 border border-zinc-100 dark:border-zinc-800">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details layout */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-1">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-sans font-black mt-0.5">
                      ₹ {item.product.price.toLocaleString("en-IN")}
                    </p>
                  </div>

                  {/* Quantity manager buttons */}
                  <div className="flex items-center gap-1.5 mt-2.5">
                    <button
                      id={`cart_qty_dec_${item.product.id}`}
                      onClick={() => onUpdateQty(item.product.id, -1)}
                      className="w-7 h-7 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-black text-xs hover:bg-zinc-50 transition"
                      title="Decrease"
                    >
                      -
                    </button>
                    <span className="text-xs font-extrabold px-2 text-zinc-800 dark:text-zinc-200">
                      {item.quantity}
                    </span>
                    <button
                      id={`cart_qty_inc_${item.product.id}`}
                      onClick={() => onUpdateQty(item.product.id, 1)}
                      className="w-7 h-7 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-black text-xs hover:bg-zinc-50 transition"
                      title="Increase"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Trash trigger */}
                <div className="flex flex-col justify-between items-end">
                  <button
                    id={`cart_trash_${item.product.id}`}
                    onClick={() => onRemoveItem(item.product.id)}
                    className="p-1.5 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <p className="text-xs font-bold text-zinc-900 dark:text-zinc-200 font-sans">
                    ₹ {(item.product.price * item.quantity).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Calculations and Form Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-zinc-50 dark:bg-zinc-950/90 border-t border-zinc-150 dark:border-zinc-850 space-y-5">
            
            {/* Totals table */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                <span>Selected Items Subtotal</span>
                <span>₹ {subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                <span>Shipping & Delivery charge</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">FREE DELIVERY</span>
              </div>
              <div className="flex justify-between text-sm pt-2.5 border-t border-zinc-200 dark:border-zinc-800">
                <span className="font-bold text-zinc-800 dark:text-zinc-200">Final Aggregate Cost</span>
                <span className="text-lg font-black text-amber-600 dark:text-amber-400 font-sans">
                  ₹ {subtotal.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Address Form block */}
            <form onSubmit={handleCheckout} className="space-y-3.5 border-t border-zinc-200 dark:border-zinc-800 pt-4">
              <h4 className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                <ClipboardCheck className="w-3.5 h-3.5 text-amber-500" />
                Shipping & Customer Contacts
              </h4>

              {shippingError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 p-2.5 rounded-xl text-xs">
                  {shippingError}
                </div>
              )}

              <div className="relative">
                <Phone className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  placeholder="WhatsApp Mobile (e.g. +91 98765 43210)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                  required
                />
              </div>

              <div className="relative">
                <MapPin className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                <textarea
                  placeholder="Comprehensive Delivery Address (Avenue, Block, Apartment No, Landmark)"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={2}
                  className="w-full pl-9 pr-4 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-xs focus:ring-2 focus:ring-amber-500 outline-none resize-none"
                  required
                />
              </div>

              <button
                id="cart_whatsapp_checkout_btn"
                type="submit"
                className="w-full py-4.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl flex items-center justify-center gap-2.5 transition shadow-lg hover:shadow-xl mt-3 outline-none text-xs tracking-wider uppercase"
              >
                <MessageSquare className="w-5 h-5 fill-white text-emerald-600" />
                <span>Place Order on WhatsApp</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
