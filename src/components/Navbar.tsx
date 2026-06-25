import React, { useState } from "react";
import { ShoppingBag, Search, LogIn, User, ShieldCheck, Menu, X, Heart } from "lucide-react";
import { UserProfile } from "../types";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  user: UserProfile | null;
  onOpenAuth: () => void;
  onOpenCart: () => void;
  cartCount: number;
  onOpenWishlist: () => void;
  wishlistCount: number;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenAdmin: () => void;
  onOpenCategoryMenu: () => void;
  activeView: "shop" | "codebase";
  setActiveView: (view: "shop" | "codebase") => void;
  logoUrl?: string;
}

export default function Navbar({
  user,
  onOpenAuth,
  onOpenCart,
  cartCount,
  onOpenWishlist,
  wishlistCount,
  searchQuery,
  setSearchQuery,
  darkMode,
  setDarkMode,
  onOpenAdmin,
  onOpenCategoryMenu,
  activeView,
  setActiveView,
  logoUrl
}: NavbarProps) {
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <div id="navigation_group" className="sticky top-0 z-40 w-full">
      {/* Competitor-style Lime/Olive Announcement Bar */}
      <div className="w-full bg-[#96bd2d] text-white text-[11px] font-bold tracking-wide py-2 text-center shadow-sm select-none">
        Delivery to your doorstep across Pakistan! 🇵🇰
      </div>

      {/* Main Navbar Frame */}
      <nav id="app_navbar" className="bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900 transition-colors py-3 shadow-sm">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            
            {/* Left Hand: Hamburger Menu Toggle Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenCategoryMenu}
                className="p-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition outline-none"
                title="Open Furniture Categories Menu"
              >
                <Menu className="w-6 h-6 stroke-[1.5]" />
              </button>
              
              {/* Secret Admin indicators for high-end store owner utility */}
              {user && user.isAdmin && (
                <button
                  onClick={onOpenAdmin}
                  className="hidden md:flex items-center gap-1 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 rounded-full"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Admin
                </button>
              )}
            </div>

            {/* Center: Beautiful Serif Logo Typography mirroring "The Roshaan's" */}
            <div 
              className="flex flex-col items-center justify-center cursor-pointer select-none text-center"
              onClick={() => {
                setSearchQuery("");
                setActiveView("shop");
              }}
            >
              <div className="flex items-center gap-1 bg-[#96bd2d]/10 px-2 py-0.5 rounded-md mb-0.5 border border-[#96bd2d]/25">
                <span className="text-[9px] font-black tracking-widest text-[#96bd2d] uppercase">CREATION</span>
              </div>
              <h1 className="text-xl md:text-2xl font-serif font-black tracking-tight text-zinc-900 dark:text-zinc-50 leading-none">
                Interiors
              </h1>
              <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block mt-1">
                Modern Living
              </span>
            </div>

            {/* Right Hand: Interactive Utility Buttons (Search, User Login, Bag) */}
            <div className="flex items-center gap-1.5 md:gap-3">
              
              {/* Elegant Inline Search Toggle */}
              <div className="relative flex items-center">
                {showSearchInput && (
                  <input
                    type="text"
                    placeholder="Search furniture..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-36 md:w-48 pl-3 pr-8 py-1.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-xs outline-none transition-all mr-2"
                  />
                )}
                <button
                  onClick={() => setShowSearchInput(!showSearchInput)}
                  className="p-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition outline-none"
                  title="Search Storefront"
                >
                  {showSearchInput ? <X className="w-5 h-5 stroke-[1.5]" /> : <Search className="w-5 h-5 stroke-[1.5]" />}
                </button>
              </div>

              {/* Theme Toggle */}
              <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

              {/* Account Profile / Login Button */}
              <button
                onClick={onOpenAuth}
                className="p-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition outline-none relative"
                title="Customer Account Space"
              >
                <User className="w-5 h-5 stroke-[1.5]" />
                {user && (
                  <span className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-zinc-950" />
                )}
              </button>

              {/* Wishlist Button with Indicator */}
              <button
                onClick={onOpenWishlist}
                className="p-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition outline-none relative"
                title="Your Wishlist"
              >
                <Heart className={`w-5 h-5 stroke-[1.5] ${wishlistCount > 0 ? "fill-red-500 text-red-500 stroke-red-500" : ""}`} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white font-extrabold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-sm">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Bag Button with Indicator */}
              <button
                onClick={onOpenCart}
                className="p-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition outline-none relative"
                title="Your Cart Bag"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#96bd2d] text-white font-extrabold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>

            </div>

          </div>
        </div>
      </nav>
    </div>
  );
}
