import React, { useState } from "react";
import { Product, BannerSlide } from "../types";
import { 
  X, Plus, Edit, Trash2, Landmark, Check, 
  HelpCircle, Settings, Image, FolderKanban, 
  Lock, KeyRound, Upload, PlusCircle, LogOut, 
  Eye, RefreshCw, Layers, Code
} from "lucide-react";
import KotlinExplorer from "./KotlinExplorer";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: (prod: Product) => void;
  onUpdateProduct: (prod: Product) => void;
  onDeleteProduct: (prodId: string) => void;

  categories: string[];
  onAddCategory: (cat: string) => void;
  onDeleteCategory: (cat: string) => void;

  slides: BannerSlide[];
  onAddSlide: (slide: BannerSlide) => void;
  onDeleteSlide: (index: number) => void;

  logoUrl: string;
  onUpdateLogo: (logo: string) => void;

  adminCreds: { email: string; pass: string };
  onUpdateAdminCreds: (email: string, pass: string) => void;
}

export default function AdminPanel({
  isOpen,
  onClose,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  categories,
  onAddCategory,
  onDeleteCategory,
  slides,
  onAddSlide,
  onDeleteSlide,
  logoUrl,
  onUpdateLogo,
  adminCreds,
  onUpdateAdminCreds
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<"products" | "categories" | "banners" | "codebase" | "settings">("products");
  
  // Admin authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("admin_session_active") === "true";
  });
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Product Fields state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(categories[0] || "Sofas");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [specKey, setSpecKey] = useState("");
  const [specValue, setSpecValue] = useState("");
  const [specs, setSpecs] = useState<Record<string, string>>({});

  // Category State
  const [newCategory, setNewCategory] = useState("");

  // Banner Slide State
  const [slideImage, setSlideImage] = useState("");
  const [slideTitle, setSlideTitle] = useState("");
  const [slideSubtitle, setSlideSubtitle] = useState("");
  const [slideTagline, setSlideTagline] = useState("");

  // Settings Credentials State
  const [settingsEmail, setSettingsEmail] = useState(adminCreds.email);
  const [settingsPassword, setSettingsPassword] = useState(adminCreds.pass);
  const [credsSuccessMsg, setCredsSuccessMsg] = useState("");

  // Setup / Reset mode states to prevent user lockout
  const [isSetupMode, setIsSetupMode] = useState<boolean>(false);
  const [setupEmail, setSetupEmail] = useState("");
  const [setupPassword, setSetupPassword] = useState("");
  const [setupSuccessMsg, setSetupSuccessMsg] = useState("");

  if (!isOpen) return null;

  // Handle Admin Verification login
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredEmail = loginEmail.trim().toLowerCase();
    const configuredEmail = adminCreds.email.toLowerCase();

    // Support seamless auto-claiming of first admin if using default placeholder credentials
    const isUnconfiguredDefault = configuredEmail === "admin@creationinteriors.com" && adminCreds.pass === "admin";

    if (
      (isUnconfiguredDefault && loginPassword === "admin") ||
      (enteredEmail === configuredEmail && loginPassword === adminCreds.pass)
    ) {
      if (isUnconfiguredDefault && enteredEmail !== "admin@creationinteriors.com") {
        // Automatically claim with their actual email!
        onUpdateAdminCreds(enteredEmail, "admin");
        setSettingsEmail(enteredEmail);
      }
      setIsAuthenticated(true);
      localStorage.setItem("admin_session_active", "true");
      setLoginError("");
      setLoginPassword("");
    } else {
      setLoginError("Invalid Admin Email or Secure Password! Use configured keys or click \"First-time Setup / Reset\" below to define yours.");
    }
  };

  // Handle custom setup configuration
  const handleAdminSetupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!setupEmail.trim() || !setupPassword.trim()) {
      setLoginError("Both email and password are required for configuration.");
      return;
    }
    
    // Write new credentials immediately to memory and local storage
    onUpdateAdminCreds(setupEmail.trim(), setupPassword.trim());
    setSettingsEmail(setupEmail.trim());
    setSettingsPassword(setupPassword.trim());
    
    // Automatically log them in as authenticated
    setIsAuthenticated(true);
    localStorage.setItem("admin_session_active", "true");
    
    // Reset inputs & close setup tab
    setSetupEmail("");
    setSetupPassword("");
    setIsSetupMode(false);
    setLoginError("");
  };

  const handleAdminLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_session_active");
  };

  // Product spec helper
  const handleAddSpec = () => {
    if (specKey.trim() && specValue.trim()) {
      setSpecs((prev) => ({ ...prev, [specKey.trim()]: specValue.trim() }));
      setSpecKey("");
      setSpecValue("");
    }
  };

  const handleRemoveSpec = (key: string) => {
    const updated = { ...specs };
    delete updated[key];
    setSpecs(updated);
  };

  const handleEditClick = (prod: Product) => {
    setEditingId(prod.id);
    setName(prod.name);
    setPrice(prod.price.toString());
    setCategory(prod.category);
    setDescription(prod.description);
    setImageUrl(prod.imageUrl);
    setIsAvailable(prod.isAvailable);
    setSpecs(prod.specifications || {});
  };

  const handleCancelProductEdit = () => {
    setEditingId(null);
    setName("");
    setPrice("");
    setCategory(categories[0] || "Sofas");
    setDescription("");
    setImageUrl("");
    setIsAvailable(true);
    setSpecs({});
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price.trim() || !imageUrl.trim() || !description.trim()) return;

    const parsedPrice = parseFloat(price) || 0;

    const finalProduct: Product = {
      id: editingId || `prod-${Math.floor(Math.random() * 100000)}`,
      name,
      price: parsedPrice,
      category,
      description,
      imageUrl,
      specifications: specs,
      isAvailable
    };

    if (editingId) {
      onUpdateProduct(finalProduct);
    } else {
      onAddProduct(finalProduct);
    }

    handleCancelProductEdit();
  };

  // Category addition
  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    if (categories.some(c => c.toLowerCase() === newCategory.trim().toLowerCase())) {
      alert("Category already exists!");
      return;
    }
    onAddCategory(newCategory.trim());
    setNewCategory("");
  };

  // Banner Slide Submit helper
  const handleAddSlideSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slideImage.trim() || !slideTitle.trim()) {
      alert("Please provide at least a banner image URL and primary title.");
      return;
    }
    onAddSlide({
      image: slideImage.trim(),
      title: slideTitle.trim(),
      subtitle: slideSubtitle.trim() || "Premium Collection",
      tagline: slideTagline.trim() || "Creation Interiors Custom"
    });
    // Reset states
    setSlideImage("");
    setSlideTitle("");
    setSlideSubtitle("");
    setSlideTagline("");
  };

  // Helper file uploader for brand logo (Base64 encoding)
  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onUpdateLogo(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper file uploader for product / slide URL (converts to base64 for ease of local testing)
  const handlePhotoUploadHelper = (type: "product" | "slide", e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (type === "product") {
          setImageUrl(base64String);
        } else {
          setSlideImage(base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Save Credentials Changes
  const handleUpdateCredsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!settingsEmail.trim() || !settingsPassword.trim()) return;
    onUpdateAdminCreds(settingsEmail.trim(), settingsPassword.trim());
    setCredsSuccessMsg("Admin login credentials updated successfully!");
    setTimeout(() => setCredsSuccessMsg(""), 4000);
  };

  return (
    <div id="admin_panel_overlay" className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-brand-purple border border-[#D4AF37]/20 rounded-3xl w-full max-w-5xl h-[90vh] overflow-hidden shadow-2xl relative flex flex-col">
        
        {/* Guarded Admin Login Screen */}
        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col justify-center items-center p-8 bg-gradient-to-b from-[#1A0F1A] to-[#0d070d] text-white overflow-y-auto">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition"
              id="admin_login_close"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-3xl shadow-xl backdrop-blur-md space-y-6 my-4">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 bg-gradient-to-tr from-[#D4AF37] to-[#e5c358] rounded-2xl flex items-center justify-center text-[#1A0F1A] font-bold text-2xl mx-auto shadow-lg shadow-[#D4AF37]/15">
                  {isSetupMode ? <Settings className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
                </div>
                <h2 className="text-2xl font-serif font-black tracking-tight text-white">
                  {isSetupMode ? "Setup Admin Account" : "Admin Security Vault"}
                </h2>
                <p className="text-xs text-zinc-400">
                  {isSetupMode 
                    ? "Initialize or reset the unique Gmail & passcode to authorize yourself as store admin." 
                    : "Enter authorized credentials to configure brand storefront settings."}
                </p>
              </div>

              {loginError && (
                <div className="p-3 bg-red-950/50 border border-red-500/30 text-red-400 rounded-xl text-center text-[11px] font-bold">
                  ⚠️ {loginError}
                </div>
              )}

              {/* TABS SELECTOR ON LOGIN PAGE */}
              <div className="flex border-b border-white/10 text-xs">
                <button
                  type="button"
                  onClick={() => { setIsSetupMode(false); setLoginError(""); }}
                  className={`flex-1 pb-3 text-center font-bold tracking-wider uppercase border-b-2 ${!isSetupMode ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-transparent text-zinc-400 hover:text-zinc-200'}`}
                >
                  Unlock Login
                </button>
                <button
                  type="button"
                  onClick={() => { setIsSetupMode(true); setLoginError(""); }}
                  className={`flex-1 pb-3 text-center font-bold tracking-wider uppercase border-b-2 ${isSetupMode ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-transparent text-zinc-400 hover:text-zinc-200'}`}
                >
                  First-time Setup / Reset
                </button>
              </div>

              {!isSetupMode ? (
                /* LOGIN FORM */
                <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-zinc-300 uppercase tracking-wider">
                      Admin Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. admin@creationinteriors.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-[#130b13] border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-[#D4AF37] text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-zinc-300 uppercase tracking-wider">
                      Secure Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-[#130b13] border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-[#D4AF37] text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#e5c358] hover:from-[#e5c358] hover:to-[#D4AF37] text-zinc-950 font-black rounded-xl transition shadow-lg shadow-[#D4AF37]/20 text-xs tracking-wider uppercase mt-2 cursor-pointer"
                  >
                    Unlock Admin Console
                  </button>
                </form>
              ) : (
                /* FIRST TIME SETUP / RESET FORM */
                <form onSubmit={handleAdminSetupSubmit} className="space-y-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-zinc-300 uppercase tracking-wider">
                      Configure Admin Email Address (e.g. your own Gmail)
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. usaidrazashafaat786@gmail.com"
                      value={setupEmail}
                      onChange={(e) => setSetupEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-[#130b13] border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-[#D4AF37] text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-zinc-300 uppercase tracking-wider">
                      Configure Secure Password
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Set your password"
                      value={setupPassword}
                      onChange={(e) => setSetupPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-[#130b13] border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-[#D4AF37] text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-teal-500 hover:to-emerald-500 text-zinc-950 font-black rounded-xl transition shadow-lg shadow-emerald-500/20 text-xs tracking-wider uppercase mt-2 cursor-pointer"
                  >
                    Save & Lock Admin Account
                  </button>
                </form>
              )}

              <div className="text-center pt-2">
                <span className="text-[10px] text-zinc-500 block">
                  Current configured admin: <code className="text-amber-400/80">{adminCreds.email}</code>
                </span>
                <span className="text-[10px] text-zinc-500 block mt-1">
                  Default fallback: <code className="text-amber-400/80">admin@creationinteriors.com</code> / <code className="text-amber-400/80">admin</code>
                </span>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Header Toolbar */}
            <div className="p-6 md:px-9 border-b border-zinc-150 dark:border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-50 dark:bg-brand-purple">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                  <Landmark className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-black text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                    Creation Interiors Manager Panel
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Storefront Catalog, Categories, Banner Slides, and Brand Identity config
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleAdminLogout}
                  className="px-3.5 py-2 rounded-xl bg-red-600/10 hover:bg-red-600 text-red-600 hover:text-white border border-red-600/20 text-xs font-black flex items-center gap-1.5 transition-all"
                  title="Log out from manager session"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Lock Session
                </button>
                <button
                  id="admin_close_btn"
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* TAB SELECTOR BAR */}
            <div className="px-6 md:px-9 border-b border-zinc-150 dark:border-zinc-800 bg-zinc-50 dark:bg-[#130b13] flex gap-1 overflow-x-auto">
              <button
                onClick={() => setActiveTab("products")}
                className={`py-3.5 px-4 font-bold text-xs tracking-wide flex items-center gap-2 border-b-2 transition-all ${
                  activeTab === "products"
                    ? "border-[#D4AF37] text-zinc-900 dark:text-zinc-50 font-black"
                    : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
                }`}
              >
                <FolderKanban className="w-4 h-4 text-[#D4AF37]" />
                Manage Furniture ({products.length})
              </button>
              <button
                onClick={() => setActiveTab("categories")}
                className={`py-3.5 px-4 font-bold text-xs tracking-wide flex items-center gap-2 border-b-2 transition-all ${
                  activeTab === "categories"
                    ? "border-[#D4AF37] text-zinc-900 dark:text-zinc-50 font-black"
                    : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
                }`}
              >
                <Layers className="w-4 h-4 text-[#D4AF37]" />
                Store Categories ({categories.length})
              </button>
              <button
                onClick={() => setActiveTab("banners")}
                className={`py-3.5 px-4 font-bold text-xs tracking-wide flex items-center gap-2 border-b-2 transition-all ${
                  activeTab === "banners"
                    ? "border-[#D4AF37] text-zinc-900 dark:text-zinc-50 font-black"
                    : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
                }`}
              >
                <Image className="w-4 h-4 text-[#D4AF37]" />
                Banners & Slides ({slides.length})
              </button>
              <button
                onClick={() => setActiveTab("codebase")}
                className={`py-3.5 px-4 font-bold text-xs tracking-wide flex items-center gap-2 border-b-2 transition-all ${
                  activeTab === "codebase"
                    ? "border-[#D4AF37] text-zinc-900 dark:text-zinc-50 font-black"
                    : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
                }`}
              >
                <Code className="w-4 h-4 text-[#D4AF37]" />
                Android Code Explorer 🛠️
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`py-3.5 px-4 font-bold text-xs tracking-wide flex items-center gap-2 border-b-2 transition-all ${
                  activeTab === "settings"
                    ? "border-[#D4AF37] text-zinc-900 dark:text-zinc-50 font-black"
                    : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
                }`}
              >
                <Settings className="w-4 h-4 text-[#D4AF37]" />
                Identity & Access settings
              </button>
            </div>

            {/* TAB CONTENTS CONTAINER */}
            <div className="flex-1 overflow-y-auto">
              
              {/* TAB 1: PRODUCTS CONFIGURATOR */}
              {activeTab === "products" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 h-full overflow-hidden">
                  
                  {/* Left panel: form */}
                  <div className="lg:col-span-5 p-6 md:p-8 border-r border-zinc-150 dark:border-zinc-800 overflow-y-auto bg-zinc-50/50 dark:bg-zinc-900/10">
                    <h4 className="text-sm font-bold tracking-tight text-zinc-800 dark:text-zinc-200 mb-5 font-serif border-b border-zinc-150 dark:border-zinc-800 pb-2 flex items-center gap-2">
                      <Plus className="w-4 h-4 text-amber-500" />
                      {editingId ? "Modify Furniture Model" : "Introduce New Furniture"}
                    </h4>

                    <form onSubmit={handleProductSubmit} className="space-y-4 text-xs">
                      <div>
                        <label className="block font-bold text-zinc-500 dark:text-zinc-400 mb-1 uppercase tracking-widest text-[9px]">Furniture Name/Title</label>
                        <input
                          type="text"
                          placeholder="e.g., Chesterfield Velvet Loveseat"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#130b13] text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-zinc-500 dark:text-zinc-400 mb-1 uppercase tracking-widest text-[9px]">Price (₹ Rupees)</label>
                          <input
                            type="number"
                            placeholder="e.g., 34500"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full px-4 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#130b13] text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                            required
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-zinc-500 dark:text-zinc-400 mb-1 uppercase tracking-widest text-[9px]">Classification Category</label>
                          <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-3 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#130b13] text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-amber-500 text-xs cursor-pointer"
                          >
                            {categories.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block font-bold text-zinc-500 dark:text-zinc-400 mb-1 uppercase tracking-widest text-[9px]">Cover Photo URL / File Upload</label>
                        <div className="flex gap-2">
                          <input
                            type="url"
                            placeholder="https://images.unsplash.com/..."
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="flex-1 px-4 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#130b13] text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                            required
                          />
                          <label className="px-3 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-xl flex items-center justify-center cursor-pointer transition text-xs font-bold gap-1">
                            <Upload className="w-3.5 h-3.5" />
                            Upload
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handlePhotoUploadHelper("product", e)}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>

                      {imageUrl && (
                        <div className="w-full h-24 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 relative bg-zinc-100 dark:bg-[#130b13]">
                          <img src={imageUrl} alt="Upload preview" className="w-full h-full object-cover" />
                        </div>
                      )}

                      <div>
                        <label className="block font-bold text-zinc-500 dark:text-zinc-400 mb-1 uppercase tracking-widest text-[9px]">Specifications/Materials Description</label>
                        <textarea
                          placeholder="Detailed layout, construction timber, foam parameters..."
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          rows={3}
                          className="w-full px-4 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#130b13] text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-amber-500 text-xs resize-none"
                          required
                        />
                      </div>

                      {/* Dynamic specs builder */}
                      <div className="bg-zinc-100 dark:bg-[#130b13]/50 p-4 rounded-2xl border border-zinc-200/20">
                        <label className="block font-bold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-widest text-[9px]">
                          Build Spec Sheets (Key-value maps)
                        </label>
                        <div className="flex gap-2 mb-2">
                          <input
                            type="text"
                            placeholder="Spec (e.g. Wood)"
                            value={specKey}
                            onChange={(e) => setSpecKey(e.target.value)}
                            className="flex-1 px-3 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-[#130b13] text-xs text-zinc-900 dark:text-zinc-100 outline-none focus:ring-1 focus:ring-amber-500"
                          />
                          <input
                            type="text"
                            placeholder="Val (e.g. Teakwood)"
                            value={specValue}
                            onChange={(e) => setSpecValue(e.target.value)}
                            className="flex-1 px-3 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-[#130b13] text-xs text-zinc-900 dark:text-zinc-100 outline-none focus:ring-1 focus:ring-amber-500"
                          />
                          <button
                            type="button"
                            onClick={handleAddSpec}
                            className="px-3 bg-amber-500 text-zinc-950 font-bold rounded-lg hover:bg-amber-600 outline-none text-xs"
                          >
                            Set
                          </button>
                        </div>

                        {/* Display added specs list */}
                        {Object.keys(specs).length > 0 && (
                          <div className="space-y-1 mt-3 pt-2.5 border-t border-zinc-250 dark:border-zinc-800 max-h-24 overflow-y-auto">
                            {Object.entries(specs).map(([k, v]) => (
                              <div key={k} className="flex justify-between items-center bg-white dark:bg-brand-purple border border-zinc-100/50 dark:border-zinc-800/40 px-2.5 py-1 rounded-lg text-[11px]">
                                <span className="text-zinc-400 font-medium">{k}:</span>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-semibold text-zinc-850 dark:text-zinc-200">{v}</span>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveSpec(k)}
                                    className="text-red-500 font-bold hover:underline"
                                    title="Delete spec"
                                  >
                                    ×
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="isAvailable_box"
                          checked={isAvailable}
                          onChange={(e) => setIsAvailable(e.target.checked)}
                          className="w-4 h-4 rounded text-amber-500 border-zinc-350 dark:border-zinc-800 focus:ring-amber-500 cursor-pointer"
                        />
                        <label htmlFor="isAvailable_box" className="text-xs text-zinc-800 dark:text-zinc-300 font-bold cursor-pointer">
                          Mark as Available (In-Stock Status)
                        </label>
                      </div>

                      <div className="flex gap-2 pt-2.5 border-t border-zinc-150 dark:border-zinc-800">
                        <button
                          type="submit"
                          className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-black rounded-xl transition text-xs uppercase tracking-wider"
                        >
                          {editingId ? "Commit Changes" : "Create Product"}
                        </button>
                        {editingId && (
                          <button
                            type="button"
                            onClick={handleCancelProductEdit}
                            className="px-4 py-3 bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold rounded-xl hover:bg-zinc-300 dark:hover:bg-zinc-700 transition text-xs"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>
                  </div>

                  {/* Right panel: listings */}
                  <div className="lg:col-span-7 p-6 md:p-8 overflow-y-auto flex flex-col justify-between h-[52vh] lg:h-auto">
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 font-serif border-b border-zinc-150 dark:border-zinc-800 pb-2">
                        Currently Deployed Models ({products.length})
                      </h4>

                      <div className="space-y-2 max-h-[42vh] overflow-y-auto pr-2">
                        {products.map((prod) => (
                          <div
                            key={prod.id}
                            className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-[#130b13] border border-zinc-150 dark:border-zinc-800/60 rounded-2xl text-xs shadow-sm hover:shadow-md transition"
                          >
                            <div className="flex items-center gap-3 max-w-[70%]">
                              <div className="w-10 h-10 rounded-lg bg-zinc-200 dark:bg-zinc-800 overflow-hidden flex-shrink-0 border border-zinc-200/50">
                                <img src={prod.imageUrl} alt={prod.name} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <h5 className="font-bold text-zinc-800 dark:text-zinc-100 line-clamp-1">{prod.name}</h5>
                                <p className="text-[10px] text-zinc-400 mt-0.5">
                                  Category: <b className="text-amber-500">{prod.category}</b> | Specs: <b>{Object.keys(prod.specifications || {}).length}</b>
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2.5">
                              <span className="font-black text-amber-600 dark:text-amber-400 text-xs">
                                ₹ {prod.price.toLocaleString("en-IN")}
                              </span>

                              <div className="flex gap-1">
                                <button
                                  onClick={() => handleEditClick(prod)}
                                  className="p-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-650 dark:text-zinc-300 transition"
                                  title="Edit product"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => onDeleteProduct(prod.id)}
                                  className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 transition"
                                  title="Delete product"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/25 text-zinc-800 dark:text-zinc-200 p-4 rounded-2xl text-[11px] mt-4 flex gap-3 items-center">
                      <div className="w-7 h-7 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-amber-600 font-bold flex-shrink-0 text-xs">
                        i
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-900 dark:text-[#D4AF37]">Dynamic Catalog Refresher</p>
                        <p className="text-zinc-500 dark:text-zinc-400 mt-0.5">
                          Adding, updating, or deleting items instantly updates client filters, search indices, and order carts.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* TAB 2: STORE CATEGORIES MANAGEMENT */}
              {activeTab === "categories" && (
                <div className="p-6 md:p-9 space-y-6 max-w-3xl mx-auto">
                  <div className="space-y-1">
                    <h3 className="text-lg font-serif font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                      <Layers className="w-5 h-5 text-[#D4AF37]" />
                      Custom Category Configuration
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Create custom categories (e.g. "Royal Sofas", "Teak Furniture") to dynamically customize the navigation filter pills.
                    </p>
                  </div>

                  {/* Add category form */}
                  <form onSubmit={handleAddCategorySubmit} className="flex gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Enter new category name (e.g., Office Chairs)"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="flex-1 px-4 py-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#130b13] text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-black rounded-xl transition text-xs uppercase tracking-wider flex items-center gap-1.5"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Add Category
                    </button>
                  </form>

                  {/* Category grid listings */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                      Active Storefront Categories ({categories.length})
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {categories.map((cat) => (
                        <div
                          key={cat}
                          className="flex items-center justify-between p-3.5 bg-zinc-50 dark:bg-[#130b13] border border-zinc-150 dark:border-zinc-800 rounded-xl text-xs"
                        >
                          <span className="font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
                            {cat}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete the category "${cat}"? This won't delete the products, but they will belong to a category that isn't filtered.`)) {
                                onDeleteCategory(cat);
                              }
                            }}
                            className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition"
                            title="Delete Category"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: BANNERS & SLIDES (NAIDAR) */}
              {activeTab === "banners" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 h-full overflow-hidden">
                  
                  {/* Left: add banner slide */}
                  <div className="lg:col-span-5 p-6 md:p-8 border-r border-zinc-150 dark:border-zinc-800 overflow-y-auto bg-zinc-50/50 dark:bg-zinc-900/10 text-xs space-y-4">
                    <h4 className="text-sm font-bold tracking-tight text-zinc-800 dark:text-zinc-200 font-serif border-b border-zinc-150 dark:border-zinc-800 pb-2 flex items-center gap-2">
                      <PlusCircle className="w-4 h-4 text-amber-500" />
                      Add Banner Slider (Naidar)
                    </h4>

                    <form onSubmit={handleAddSlideSubmit} className="space-y-4">
                      <div>
                        <label className="block font-bold text-zinc-500 dark:text-zinc-400 mb-1 uppercase tracking-widest text-[9px]">Banner Heading Title</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sculpting Luxury Interiors"
                          value={slideTitle}
                          onChange={(e) => setSlideTitle(e.target.value)}
                          className="w-full px-4 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#130b13] text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-zinc-500 dark:text-zinc-400 mb-1 uppercase tracking-widest text-[9px]">Subtitle Line</label>
                          <input
                            type="text"
                            placeholder="e.g. Artisanal Woodwork & Silk"
                            value={slideSubtitle}
                            onChange={(e) => setSlideSubtitle(e.target.value)}
                            className="w-full px-4 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#130b13] text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-zinc-500 dark:text-zinc-400 mb-1 uppercase tracking-widest text-[9px]">Tagline Badge Text</label>
                          <input
                            type="text"
                            placeholder="e.g. Seasonal New Collection"
                            value={slideTagline}
                            onChange={(e) => setSlideTagline(e.target.value)}
                            className="w-full px-4 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#130b13] text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block font-bold text-zinc-500 dark:text-zinc-400 mb-1 uppercase tracking-widest text-[9px]">Banner Image URL / Local Upload</label>
                        <div className="flex gap-2">
                          <input
                            type="url"
                            placeholder="https://images.unsplash.com/..."
                            value={slideImage}
                            onChange={(e) => setSlideImage(e.target.value)}
                            className="flex-1 px-4 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#130b13] text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                          />
                          <label className="px-3 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-xl flex items-center justify-center cursor-pointer transition text-xs font-bold gap-1">
                            <Upload className="w-3.5 h-3.5" />
                            Upload
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handlePhotoUploadHelper("slide", e)}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>

                      {slideImage && (
                        <div className="w-full h-28 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-[#130b13] relative">
                          <img src={slideImage} alt="Slide preview" className="w-full h-full object-cover" />
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-black rounded-xl transition text-xs uppercase tracking-wider"
                      >
                        Insert New Banner
                      </button>
                    </form>
                  </div>

                  {/* Right: view sliders list */}
                  <div className="lg:col-span-7 p-6 md:p-8 overflow-y-auto space-y-4 h-[52vh] lg:h-auto">
                    <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 font-serif border-b border-zinc-150 dark:border-zinc-800 pb-2">
                      Active Home Banner Slides ({slides.length})
                    </h4>

                    {slides.length === 0 ? (
                      <div className="text-center py-10 text-zinc-400">No slides configured. Default fallbacks will be displayed.</div>
                    ) : (
                      <div className="space-y-3">
                        {slides.map((s, index) => (
                          <div
                            key={index}
                            className="p-3 bg-zinc-50 dark:bg-[#130b13] border border-zinc-150 dark:border-zinc-800/60 rounded-2xl flex gap-3.5 text-xs shadow-sm"
                          >
                            <div className="w-24 h-16 rounded-lg bg-zinc-100 dark:bg-zinc-800 overflow-hidden flex-shrink-0 border border-zinc-200/50">
                              <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                              <div>
                                <h5 className="font-bold text-zinc-800 dark:text-zinc-100 line-clamp-1">{s.title}</h5>
                                <p className="text-[10px] text-zinc-400 mt-0.5 line-clamp-1">
                                  Tag: <b className="text-[#D4AF37]">{s.tagline}</b> | Sub: <i>{s.subtitle}</i>
                                </p>
                              </div>
                              <div className="text-right">
                                <button
                                  type="button"
                                  onClick={() => onDeleteSlide(index)}
                                  className="text-[10px] font-bold text-red-500 hover:underline flex items-center gap-1 ml-auto"
                                >
                                  <Trash2 className="w-3 h-3" />
                                  Remove Banner
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3.5: ANDROID BLUEPRINT CODEBASE EXPLORER */}
              {activeTab === "codebase" && (
                <div className="p-6 md:p-8 space-y-4 max-w-6xl mx-auto">
                  <div className="bg-[#D4AF37]/5 p-4 rounded-2xl border border-[#D4AF37]/20 text-xs text-zinc-400 leading-relaxed flex items-center gap-3.5 mb-2">
                    <span className="text-xl">📱</span>
                    <div>
                      <h4 className="font-bold text-zinc-900 dark:text-[#D4AF37]">Android Companion Application Codebase</h4>
                      <p>Below you can browse, study, copy, and export Jetpack Compose implementation files directly to build your native mobile experience.</p>
                    </div>
                  </div>
                  <KotlinExplorer />
                </div>
              )}

              {/* TAB 4: IDENTITY & ACCESS SETTINGS (LOGO & PASSWORD) */}
              {activeTab === "settings" && (
                <div className="p-6 md:p-9 space-y-9 max-w-2xl mx-auto">
                  
                  {/* Logo Config Card */}
                  <div className="space-y-4 bg-zinc-550/10 dark:bg-[#130b13]/40 p-6 rounded-3xl border border-zinc-150 dark:border-zinc-800/60 shadow-sm">
                    <div className="space-y-1">
                      <h3 className="text-base font-serif font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                        <Image className="w-4 h-4 text-[#D4AF37]" />
                        Storefront Brand Logo Configuration
                      </h3>
                      <p className="text-[11px] text-zinc-400">
                        Upload your custom PNG logo or specify a high-res image link to instantly skin the main navigation bar.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                      <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-[#0d070d] border border-zinc-200 dark:border-zinc-800 rounded-2xl h-32">
                        <span className="text-[9px] font-bold text-zinc-400 uppercase mb-2 tracking-widest">Active Logo</span>
                        <div className="w-16 h-16 rounded-xl bg-brand-purple flex items-center justify-center border border-[#D4AF37]/30 shadow-md overflow-hidden">
                          <img src={logoUrl} alt="Storefront Logo" className="w-full h-full object-cover" />
                        </div>
                      </div>

                      <div className="md:col-span-2 space-y-3.5 text-xs">
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Logo PNG File Upload</label>
                          <label className="w-full px-4 py-3 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] rounded-xl flex items-center justify-center cursor-pointer transition text-xs font-black gap-2 text-center">
                            <Upload className="w-4 h-4" />
                            Select brand PNG/JPEG Logo
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleLogoFileChange}
                              className="hidden"
                            />
                          </label>
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Or direct web URL</label>
                          <input
                            type="url"
                            placeholder="https://..."
                            value={logoUrl.startsWith("data:") ? "" : logoUrl}
                            onChange={(e) => e.target.value.trim() && onUpdateLogo(e.target.value.trim())}
                            className="w-full px-4 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#130b13] text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Credentials/Access Password Config Card */}
                  <div className="space-y-4 bg-zinc-550/10 dark:bg-[#130b13]/40 p-6 rounded-3xl border border-zinc-150 dark:border-zinc-800/60 shadow-sm">
                    <div className="space-y-1">
                      <h3 className="text-base font-serif font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                        <KeyRound className="w-4 h-4 text-[#D4AF37]" />
                        Secure Administrator Credentials (Single User Access)
                      </h3>
                      <p className="text-[11px] text-zinc-400">
                        Set the single Gmail and secure passcode that will unlock this controller. Keeps unauthorized visitors locked out.
                      </p>
                    </div>

                    {credsSuccessMsg && (
                      <div className="p-3 bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 rounded-xl text-[11px] font-bold text-center">
                        ✔ {credsSuccessMsg}
                      </div>
                    )}

                    <form onSubmit={handleUpdateCredsSubmit} className="space-y-4 text-xs">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                            Manager Gmail Address
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="admin@creationinteriors.com"
                            value={settingsEmail}
                            onChange={(e) => setSettingsEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#130b13] text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                            Secure Passcode
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Enter secure passcode"
                            value={settingsPassword}
                            onChange={(e) => setSettingsPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#130b13] text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="px-6 py-3 bg-[#D4AF37] hover:bg-amber-600 text-zinc-950 font-black rounded-xl transition text-xs uppercase tracking-wider flex items-center gap-1.5 ml-auto"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        Update Manager Access Keys
                      </button>
                    </form>
                  </div>

                </div>
              )}

            </div>
          </>
        )}

      </div>
    </div>
  );
}
