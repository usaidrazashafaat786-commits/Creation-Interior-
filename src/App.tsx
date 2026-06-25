import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import BannerSlider from "./components/BannerSlider";
import CategoryFilter from "./components/CategoryFilter";
import ProductCard from "./components/ProductCard";
import ProductDetailModal from "./components/ProductDetailModal";
import CartSidebar from "./components/CartSidebar";
import AdminPanel from "./components/AdminPanel";
import AuthView from "./components/AuthView";
import OrderHistory from "./components/OrderHistory";
import KotlinExplorer from "./components/KotlinExplorer";
import { defaultProducts } from "./data/defaultProducts";
import { Product, CartItem, Order, UserProfile } from "./types";
import { useRealFirebase, db, auth } from "./services/firebase";
import { collection, getDocs, addDoc, onSnapshot, doc, setDoc } from "firebase/firestore";
import { Sofa, Bed, ShieldCheck, HelpCircle, Gift, PhoneCall, Code, Landmark } from "lucide-react";

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("creation_dark_mode");
    return saved ? saved === "true" : true; // Default to dark for luxury feel
  });

  // Active navigation view state
  const [activeView, setActiveView] = useState<"shop" | "codebase">("shop");

  // Authentication state
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem("creation_user");
    if (saved) return JSON.parse(saved);
    // Pre-populate a standard premium user session for seamless instant testing
    return {
      uid: "user-demo-99",
      email: "guest@creationinteriors.com",
      isAdmin: false
    };
  });

  // Core inventories & cart state
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem("creation_products");
    return saved ? JSON.parse(saved) : defaultProducts;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("creation_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("creation_orders");
    if (saved) return JSON.parse(saved);
    // Pre-seed an historic order for a gorgeous pre-populated list
    return [
      {
        orderId: "ORD-9352-ID",
        userId: "user-demo-99",
        userEmail: "guest@creationinteriors.com",
        items: [
          {
            productId: "premium-sofa-1",
            productName: "Royal Velvet Sectional Sofa",
            quantity: 1,
            unitPrice: 45999
          }
        ],
        totalPrice: 45999,
        timestamp: Date.now() - 86400000 * 2, // 2 days ago
        status: "Dispatched",
        deliveryPhone: "+91 98765 43210",
        deliveryAddress: "Flat 4B, Emerald Heights, MG Road, Bangalore"
      }
    ];
  });

  // UI state managers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(60000);

  // Sync caches
  useEffect(() => {
    localStorage.setItem("creation_dark_mode", String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("creation_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("creation_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("creation_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("creation_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("creation_user");
    }
  }, [user]);

  // Firebase Real Integration checks
  useEffect(() => {
    if (useRealFirebase && db) {
      // Setup dynamic listeners for real firestore sync
      const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
        if (!snapshot.empty) {
          const loaded: Product[] = [];
          snapshot.forEach((doc) => {
            loaded.push({ id: doc.id, ...doc.data() } as Product);
          });
          setProducts(loaded);
        }
      });
      return () => unsubscribe();
    }
  }, []);

  // CART OPERATIONS
  const handleAddToCart = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (productId: string, change: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + change;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // CHECKOUT & WHATSAPP EXPORTER
  const handlePlaceOrder = (deliveryPhone: string, deliveryAddress: string) => {
    if (cart.length === 0) return;

    const subtotal = cart.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}-ID`;

    const newOrder: Order = {
      orderId,
      userId: user?.uid || "guest-uid",
      userEmail: user?.email || "guest@creationinteriors.com",
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        unitPrice: item.product.price
      })),
      totalPrice: subtotal,
      timestamp: Date.now(),
      status: "Pending",
      deliveryPhone,
      deliveryAddress
    };

    // Add order to local list
    setOrders((prev) => [newOrder, ...prev]);

    // Format secure order lines for WhatsApp markdown
    const messageLines = [
      `🛋️ *New Order Booking: Creation Interiors*`,
      `==============================`,
      `Order UUID: \`${orderId}\``,
      `Client ID: *${user?.email || "Guest Buyer"}*`,
      `Phone Contact: *${deliveryPhone}*`,
      `Shipping Address: _${deliveryAddress}_`,
      `==============================`,
      `*Selected Models:*`
    ];

    cart.forEach((item, index) => {
      messageLines.push(`${index + 1}. *${item.product.name}* (Qty: ${item.quantity}) - ₹ ${(item.product.price * item.quantity).toLocaleString("en-IN")}`);
    });

    messageLines.push(`==============================`);
    messageLines.push(`*Grand Total:* ₹ *${subtotal.toLocaleString("en-IN")}*`);
    messageLines.push(`\nPlease verify this order inventory and send confirmation. Thank you!`);

    const fullMessage = messageLines.join("\n");
    const encodedMessage = encodeURIComponent(fullMessage);
    
    // Replace with actual furniture business contact WhatsApp number
    const businessNumber = "919876543210"; 
    const whatsappLink = `https://api.whatsapp.com/send?phone=${businessNumber}&text=${encodedMessage}`;

    // Clear cart immediately
    setCart([]);
    setIsCartOpen(false);

    // Prompt user and open the window Safely in new targets
    alert(`🎉 Order Registered Successfully!\n\nID: ${orderId}\nTotal: ₹ ${subtotal.toLocaleString("en-IN")}\n\nWe will now open WhatsApp to send these specifications directly to Creation Interiors!`);
    
    window.open(whatsappLink, "_blank");
  };

  // ADMIN CRUD OPERATIONS
  const handleAddProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  const handleUpdateProduct = (updatedProd: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedProd.id ? updatedProd : p)));
  };

  const handleDeleteProduct = (prodId: string) => {
    if (confirm("Are you sure you want to remove this model from the catalog?")) {
      setProducts((prev) => prev.filter((p) => p.id !== prodId));
    }
  };

  // Filter Catalog lists
  const filteredProducts = products.filter((prod) => {
    const matchesCategory = selectedCategory === null || prod.category === selectedCategory;
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = prod.price <= maxPrice;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  // Calculate order counts for indicators
  const currentUserOrders = orders.filter((o) => o.userId === user?.uid);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? "dark bg-zinc-950 text-zinc-100" : "bg-zinc-50 text-zinc-900"}`}>
      
      {/* Navbar Widget */}
      <Navbar
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cart.reduce((s, c) => s + c.quantity, 0)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenAdmin={() => setIsAdminOpen(true)}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {activeView === "shop" ? (
        /* INTERACTIVE STOREFRONT VIEW */
        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-9">
          
          {/* Banner Hero Slides */}
          <BannerSlider />

          {/* Quick Info bar */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4.5 bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 rounded-2xl shadow-sm text-xs flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 font-bold">
                🚚
              </div>
              <div>
                <h4 className="font-bold">Pan-India Freight Delivery</h4>
                <p className="text-zinc-400 mt-0.5">Free transit insurance & on-site assembly tools</p>
              </div>
            </div>
            <div className="p-4.5 bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 rounded-2xl shadow-sm text-xs flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 font-bold">
                🔨
              </div>
              <div>
                <h4 className="font-bold">Artisanal Customization</h4>
                <p className="text-zinc-400 mt-0.5">Custom dimension fabrics & seasoned teakwood slabs</p>
              </div>
            </div>
            <div className="p-4.5 bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 rounded-2xl shadow-sm text-xs flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 font-bold">
                📱
              </div>
              <div>
                <h4 className="font-bold">WhatsApp Direct dispatch Checkouts</h4>
                <p className="text-zinc-400 mt-0.5">Secure item details sent directly to the managers</p>
              </div>
            </div>
          </section>

          {/* Category Filter ribbons */}
          <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

          {/* Catalog grid and filters decks */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left filtration panel sidebar */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Range inputs */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 p-6 rounded-3xl shadow-sm text-xs space-y-4">
                <h4 className="font-serif font-bold text-sm text-zinc-900 dark:text-zinc-100 border-b border-zinc-100 dark:border-zinc-800 pb-2 flex items-center gap-2">
                  <span>Price Range Limit</span>
                </h4>
                <div>
                  <div className="flex justify-between text-[11px] font-bold text-zinc-400 mb-2">
                    <span>Min: ₹ 0</span>
                    <span className="text-amber-600 dark:text-amber-400">Max: ₹ {maxPrice.toLocaleString("en-IN")}</span>
                  </div>
                  <input
                    type="range"
                    min="2000"
                    max="60000"
                    step="1000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    className="w-full accent-amber-500 outline-none h-1 bg-zinc-200 rounded-lg cursor-pointer dark:bg-zinc-700"
                  />
                  <span className="text-[10px] text-zinc-400 block mt-2 text-right">Adjust slider limits to filter premium models</span>
                </div>
              </div>

              {/* Order history section */}
              {user ? (
                <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 p-6 rounded-3xl shadow-sm">
                  <OrderHistory orders={currentUserOrders} />
                </div>
              ) : (
                <div className="p-6 bg-zinc-100 dark:bg-zinc-900/50 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl text-center text-xs text-zinc-500 space-y-2.5">
                  <Landmark className="w-6 h-6 text-amber-500 mx-auto" />
                  <p>Log in as customer to unlock your dynamic Purchase Order Receipts list.</p>
                  <button
                    onClick={() => setIsAuthOpen(true)}
                    className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    Login Now
                  </button>
                </div>
              )}

              {/* Action Promo card */}
              <div className="relative overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-950 dark:from-zinc-900 dark:to-zinc-900 rounded-3xl p-6 text-white border border-zinc-850 shadow-md">
                <Gift className="w-8 h-8 text-amber-400 mb-3" />
                <h4 className="font-serif font-bold text-base text-zinc-150 leading-tight">Interactive Code Workspace</h4>
                <p className="text-[11px] text-zinc-400 leading-relaxed mt-1.5">
                  We have bundled the full Android Jetpack Compose codebase directly under the companion view!
                </p>
                <button
                  onClick={() => setActiveView("codebase")}
                  className="mt-4 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-zinc-950 text-xs font-black rounded-xl transition flex items-center gap-1.5 outline-none"
                >
                  <Code className="w-3.5 h-3.5" />
                  Explore Kotlin Source files
                </button>
              </div>

            </div>

            {/* Catalog list right */}
            <div className="lg:col-span-9 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">
                  Showing <strong className="text-zinc-850 dark:text-zinc-200">{filteredProducts.length}</strong> premium models matched
                </span>
                
                {selectedCategory && (
                  <span className="text-[10px] font-bold px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 rounded-full tracking-wider uppercase">
                    Category: {selectedCategory}
                  </span>
                )}
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-850 rounded-3xl">
                  <Sofa className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
                  <p className="text-sm font-bold text-zinc-800 dark:text-zinc-300">No furniture matching your criteria.</p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory(null);
                      setMaxPrice(60000);
                    }}
                    className="text-xs text-amber-600 dark:text-amber-400 font-bold mt-1 hover:underline"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredProducts.map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onShowDetails={setSelectedProduct}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              )}
            </div>

          </div>

        </main>
      ) : (
        /* KOTLIN ANDROID CODEBASE BLUEPRINTS VIEW */
        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
          <KotlinExplorer />
        </main>
      )}

      {/* Cart Drawer Overlay */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onPlaceOrder={handlePlaceOrder}
        userEmail={user?.email}
      />

      {/* Product Detail Spec Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Admin Panel Configuration Board */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
      />

      {/* Account Login Registration Views */}
      <AuthView
        user={user}
        onLogin={setUser}
        onLogout={() => setUser(null)}
        onClose={() => setIsAuthOpen(false)}
        isOpen={isAuthOpen}
      />

      {/* Page simple footer */}
      <footer className="border-t border-zinc-150 dark:border-zinc-850 py-10 mt-16 bg-white dark:bg-zinc-950 text-xs text-zinc-500 dark:text-zinc-400 text-center">
        <div className="w-full max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-serif text-zinc-900 dark:text-zinc-100 font-black">Creation Interiors Fine furniture</p>
          <p>© 2026 Creation Interiors. All architectural and carpentry designs reserved.</p>
          <p className="text-[10px] text-zinc-400">
            Crafted for Android & Web platform. Access code explorer from top right menu to view/copy Jetpack Compose screens.
          </p>
        </div>
      </footer>

    </div>
  );
}
