import React from "react";
import { ShoppingBag, Search, LogIn, User, Smartphone, Code, ShieldCheck, Tag } from "lucide-react";
import { UserProfile } from "../types";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  user: UserProfile | null;
  onOpenAuth: () => void;
  onOpenCart: () => void;
  cartCount: number;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenAdmin: () => void;
  activeView: "shop" | "codebase";
  setActiveView: (view: "shop" | "codebase") => void;
}

export default function Navbar({
  user,
  onOpenAuth,
  onOpenCart,
  cartCount,
  searchQuery,
  setSearchQuery,
  darkMode,
  setDarkMode,
  onOpenAdmin,
  activeView,
  setActiveView
}: NavbarProps) {
  return (
    <nav id="app_navbar" className="sticky top-0 bg-white/95 dark:bg-zinc-950/95 border-b border-zinc-150 dark:border-zinc-850 z-40 transition-colors backdrop-blur-[8px]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo Brand Frame */}
          <div className="flex items-center gap-2 cursor-pointer flex-shrink-0" onClick={() => setActiveView("shop")}>
            <div className="w-10 h-10 bg-gradient-to-tr from-amber-600 to-amber-400 rounded-xl flex items-center justify-center text-zinc-950 font-serif font-black text-xl shadow-md border border-amber-500/20">
              C
            </div>
            <div>
              <h1 className="text-lg font-serif font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-none">
                Creation Interiors
              </h1>
              <span className="text-[9.5px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest block mt-0.5">
                Premium Fine furniture
              </span>
            </div>
          </div>

          {/* Quick links to toggle Storefront vs Android Code Explorer */}
          <div className="hidden md:flex gap-1 bg-zinc-100 dark:bg-zinc-900/50 p-1 rounded-xl border border-zinc-200/50 dark:border-zinc-800">
            <button
              onClick={() => setActiveView("shop")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeView === "shop"
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              Interactive Storefront
            </button>
            <button
              onClick={() => setActiveView("codebase")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeView === "codebase"
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
              }`}
            >
              <Code className="w-3.5 h-3.5 animate-pulse" />
              Jetpack Compose Code Explorer
            </button>
          </div>

          {/* Center search input */}
          {activeView === "shop" && (
            <div className="relative max-w-sm w-full hidden sm:block">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search luxurious sofas, beds, wardrobes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-2xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-xs focus:ring-2 focus:ring-amber-500 outline-none transition-colors"
              />
            </div>
          )}

          {/* Custom functional toggles & Auth status */}
          <div className="flex items-center gap-2">
            
            {/* Admin trigger */}
            {user && user.isAdmin && activeView === "shop" && (
              <button
                id="navbar_admin_portal_btn"
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 py-2.5 px-4 rounded-xl bg-amber-500/10 border border-amber-500/30 font-bold text-xs text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition duration-150"
              >
                <ShieldCheck className="w-4 h-4" />
                <span className="hidden lg:inline">Admin Board</span>
              </button>
            )}

            {/* Shopping Cart button */}
            {activeView === "shop" && (
              <button
                id="navbar_cart_btn"
                onClick={onOpenCart}
                className="relative p-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition shadow-sm outline-none"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-zinc-950 font-bold text-[10px] w-5 h-5 rounded-full border-2 border-white dark:border-zinc-950 flex items-center justify-center shadow-md">
                    {cartCount}
                  </span>
                )}
              </button>
            )}

            {/* Light / Dark Mode Toggle */}
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

            {/* Login control */}
            <button
              id="navbar_login_btn"
              onClick={onOpenAuth}
              className={`flex items-center gap-1.5 py-2.5 px-4 rounded-xl font-bold text-xs shadow-sm transition outline-none ${
                user 
                  ? "bg-zinc-900 dark:bg-zinc-800/80 hover:bg-zinc-850 text-white border border-zinc-900 dark:border-zinc-800" 
                  : "bg-amber-500 hover:bg-amber-600 text-zinc-950 font-extrabold"
              }`}
            >
              {user ? (
                <>
                  <User className="w-4 h-4" />
                  <span className="max-w-[70px] truncate hidden sm:inline">{user.email.split("@")[0]}</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Interactive Sign In</span>
                </>
              )}
            </button>

          </div>

        </div>
      </div>

      {/* Sub menu toolbar for mobile */}
      <div className="flex md:hidden border-t border-zinc-150 dark:border-zinc-85 gap-1 bg-zinc-50 dark:bg-zinc-900/40 p-2 justify-center">
        <button
          onClick={() => setActiveView("shop")}
          className={`px-4 py-2 rounded-lg text-xs font-black transition flex items-center gap-1.5 ${
            activeView === "shop"
              ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm border border-zinc-200 dark:border-zinc-700"
              : "text-zinc-510 hover:text-zinc-800"
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          Storefront
        </button>
        <button
          onClick={() => setActiveView("codebase")}
          className={`px-4 py-2 rounded-lg text-xs font-black transition flex items-center gap-1.5 ${
            activeView === "codebase"
              ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm border border-zinc-200 dark:border-zinc-700"
              : "text-zinc-510 hover:text-zinc-800"
          }`}
        >
          <Code className="w-3.5 h-3.5" />
          Code Explorer
        </button>
      </div>
    </nav>
  );
}
