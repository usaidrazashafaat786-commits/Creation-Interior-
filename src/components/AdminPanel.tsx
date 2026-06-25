import React, { useState } from "react";
import { Product } from "../types";
import { X, Plus, Edit, Trash2, Landmark, Check, HelpCircle, Briefcase, FileJson } from "lucide-react";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: (prod: Product) => void;
  onUpdateProduct: (prod: Product) => void;
  onDeleteProduct: (prodId: string) => void;
}

export default function AdminPanel({
  isOpen,
  onClose,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct
}: AdminPanelProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Fields state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Sofas");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [specKey, setSpecKey] = useState("");
  const [specValue, setSpecValue] = useState("");
  const [specs, setSpecs] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const categories = ["Sofas", "Beds", "Dining Tables", "Chairs", "Wardrobes", "Foam Products"];

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

  const handleCancel = () => {
    setEditingId(null);
    setName("");
    setPrice("");
    setCategory("Sofas");
    setDescription("");
    setImageUrl("");
    setIsAvailable(true);
    setSpecs({});
  };

  const handleSubmit = (e: React.FormEvent) => {
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

    handleCancel();
  };

  return (
    <div id="admin_panel_overlay" className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-805 rounded-3xl w-full max-w-5xl h-[85vh] overflow-hidden shadow-2xl relative flex flex-col">
        
        {/* Header Toolbar */}
        <div className="p-6 md:px-9 border-b border-zinc-150 dark:border-zinc-850 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                Manager Control Board
              </h3>
              <p className="text-xs text-zinc-400">Creation Interiors Product Configurator & Inventory CRUD manager</p>
            </div>
          </div>
          <button
            id="admin_close_btn"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Form: Add/Edit products */}
          <div className="lg:col-span-5 p-6 md:p-8 border-r border-zinc-150 dark:border-zinc-850 overflow-y-auto bg-zinc-50/50 dark:bg-zinc-900/30">
            <h4 className="text-sm font-bold tracking-tight text-zinc-800 dark:text-zinc-204 mb-5 font-serif border-b border-zinc-100 dark:border-zinc-800 pb-2 flex items-center gap-2">
              <Plus className="w-4 h-4 text-amber-500" />
              {editingId ? "Modify Furniture Model" : "Introduce New Furniture"}
            </h4>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-zinc-500 mb-1 uppercase tracking-widest text-[9px]">Furniture Name/Title</label>
                <input
                  type="text"
                  placeholder="e.g., Chesterfield Velvet Loveseat"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-zinc-500 mb-1 uppercase tracking-widest text-[9px]">Price (₹ Rupees)</label>
                  <input
                    type="number"
                    placeholder="e.g., 34500"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-500 mb-1 uppercase tracking-widest text-[9px]">Classification Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-zinc-500 mb-1 uppercase tracking-widest text-[9px]">High-Res Cover Photo Link</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-4 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-500 mb-1 uppercase tracking-widest text-[9px]">Specifications/Materials Description</label>
                <textarea
                  placeholder="Detailed layout, construction timber, foam parameters..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-amber-500 text-xs resize-none"
                  required
                />
              </div>

              {/* Dynamic specs builder */}
              <div className="bg-zinc-100 dark:bg-zinc-800/40 p-4 rounded-2xl border border-zinc-200/20">
                <label className="block font-bold text-zinc-500 mb-1.5 uppercase tracking-widest text-[9px]">
                  Build Spec Sheets (Key-value maps)
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Spec (e.g. Wood)"
                    value={specKey}
                    onChange={(e) => setSpecKey(e.target.value)}
                    className="flex-1 px-3 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Val (e.g. Teakwood)"
                    value={specValue}
                    onChange={(e) => setSpecValue(e.target.value)}
                    className="flex-1 px-3 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddSpec}
                    className="px-3 bg-amber-500 text-zinc-950 font-bold rounded-lg hover:bg-amber-600 outline-none"
                  >
                    Set
                  </button>
                </div>

                {/* Display added specs list */}
                {Object.keys(specs).length > 0 && (
                  <div className="space-y-1 mt-3 pt-2.5 border-t border-zinc-250 dark:border-zinc-700/60 max-h-24 overflow-y-auto">
                    {Object.entries(specs).map(([k, v]) => (
                      <div key={k} className="flex justify-between items-center bg-white dark:bg-zinc-900 border border-zinc-100/50 dark:border-zinc-800 px-2.5 py-1 rounded-lg text-[11px]">
                        <span className="text-zinc-400 font-medium">{k}:</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-zinc-800 dark:text-zinc-200">{v}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSpec(k)}
                            className="text-red-500 font-bold hover:underline"
                            title="Delete"
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
                  className="w-4 h-4 rounded text-amber-500 border-zinc-300 focus:ring-amber-500"
                />
                <label htmlFor="isAvailable_box" className="text-xs text-zinc-800 dark:text-zinc-300 font-bold">
                  Mark as Available (In-Stock Status)
                </label>
              </div>

              <div className="flex gap-2 pt-2.5 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold rounded-xl transition text-xs"
                >
                  {editingId ? "Commit Changes" : "Create Product"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-3 bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold rounded-xl hover:bg-zinc-300 dark:hover:bg-zinc-700 transition text-xs"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right Panel: Scrollable products lists */}
          <div className="lg:col-span-7 p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-5 font-serif border-b border-zinc-100 dark:border-zinc-800 pb-2">
                Currently Deployed Collections ({products.length})
              </h4>

              <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-2">
                {products.map((prod) => (
                  <div
                    key={prod.id}
                    className="flex items-center justify-between p-3.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl text-xs shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-3.5 max-w-[70%]">
                      <div className="w-11 h-11 rounded-lg bg-zinc-100 dark:bg-zinc-800 overflow-hidden flex-shrink-0 border border-zinc-200/50">
                        <img src={prod.imageUrl} alt={prod.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h5 className="font-bold text-zinc-800 dark:text-zinc-100 line-clamp-1">{prod.name}</h5>
                        <p className="text-[10px] text-zinc-400 mt-0.5">
                          Category: <b>{prod.category}</b> | Size specs: <b>{Object.keys(prod.specifications || {}).length}</b>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-black text-amber-600 dark:text-amber-400 text-xs">
                        ₹ {prod.price.toLocaleString("en-IN")}
                      </span>

                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEditClick(prod)}
                          className="p-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-650 dark:text-zinc-300 transition"
                          title="Edit product info"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteProduct(prod.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition"
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

            <div className="bg-amber-500/10 border border-amber-500/20 text-zinc-800 dark:text-zinc-200 p-4 rounded-2xl text-[11px] mt-6 flex gap-3.5 items-center">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-600 font-bold flex-shrink-0">
                i
              </div>
              <div>
                <p className="font-semibold">Reactive Synchronization Mode Enabled</p>
                <p className="text-zinc-500 mt-0.5">
                  Adding or deleting items instantly refreshes the active state & cache index in the main layout. Try adding a custom couch to browse it live!
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
