import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import BannerSlider from "./components/BannerSlider";
import CategoryFilter from "./components/CategoryFilter";
import ProductCard from "./components/ProductCard";
import CategorySidebar from "./components/CategorySidebar";
import ProductDetailModal from "./components/ProductDetailModal";
import CartSidebar from "./components/CartSidebar";
import WishlistSidebar from "./components/WishlistSidebar";
import AdminPanel from "./components/AdminPanel";
import AuthView from "./components/AuthView";
import OrderHistory from "./components/OrderHistory";
import { defaultProducts } from "./data/defaultProducts";
import { Product, CartItem, Order, UserProfile, BannerSlide } from "./types";
import { useRealFirebase, db, auth } from "./services/firebase";
import { collection, getDocs, addDoc, onSnapshot, doc, setDoc } from "firebase/firestore";
import { Sofa, Bed, ShieldCheck, HelpCircle, Gift, PhoneCall, Code, Landmark } from "lucide-react";

const logoImg = "/src/logo.png";

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
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length < 15) {
          return defaultProducts;
        }
        return parsed;
      } catch (e) {
        return defaultProducts;
      }
    }
    return defaultProducts;
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
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem("creation_wishlist");
    return saved ? JSON.parse(saved) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(600000);

  // Dynamic state managers for Admin Customizer
  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem("creation_categories");
    return saved ? JSON.parse(saved) : ["Bedroom Furniture", "Dining Furniture", "Chairs", "Wardrobes", "Foam Products"];
  });

  const [bannerSlides, setBannerSlides] = useState<BannerSlide[]>(() => {
    const saved = localStorage.getItem("creation_banner_slides");
    return saved ? JSON.parse(saved) : [];
  });

  const [logoUrl, setLogoUrl] = useState<string>(() => {
    const saved = localStorage.getItem("creation_logo_url");
    return saved || logoImg;
  });

  const [adminCreds, setAdminCreds] = useState<{ email: string; pass: string }>(() => {
    const saved = localStorage.getItem("creation_admin_creds");
    return saved ? JSON.parse(saved) : { email: "admin@creationinteriors.com", pass: "admin" };
  });

  // Dynamic Syncer effect hooks
  useEffect(() => {
    localStorage.setItem("creation_categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("creation_banner_slides", JSON.stringify(bannerSlides));
  }, [bannerSlides]);

  useEffect(() => {
    localStorage.setItem("creation_logo_url", logoUrl);
  }, [logoUrl]);

  useEffect(() => {
    localStorage.setItem("creation_admin_creds", JSON.stringify(adminCreds));
  }, [adminCreds]);

  useEffect(() => {
    localStorage.setItem("creation_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const handleToggleWishlist = (prod: Product, e?: any) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
      e.preventDefault();
    }
    setWishlist((prev) => {
      if (prev.includes(prod.id)) {
        return prev.filter((id) => id !== prod.id);
      } else {
        return [...prev, prod.id];
      }
    });
  };

  // Dynamic configuration handlers
  const handleAddCategory = (newCat: string) => {
    setCategories((prev) => [...prev, newCat]);
  };

  const handleDeleteCategory = (catToDelete: string) => {
    setCategories((prev) => prev.filter((c) => c !== catToDelete));
    if (selectedCategory === catToDelete) {
      setSelectedCategory(null);
    }
  };

  const handleAddSlide = (newSlide: BannerSlide) => {
    setBannerSlides((prev) => [...prev, newSlide]);
  };

  const handleDeleteSlide = (slideIndex: number) => {
    setBannerSlides((prev) => prev.filter((_, idx) => idx !== slideIndex));
  };

  const handleUpdateLogo = (newLogo: string) => {
    setLogoUrl(newLogo);
  };

  const handleUpdateAdminCreds = (email: string, pass: string) => {
    setAdminCreds({ email, pass });
  };

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

  // Handle deep-linking share URL parameters (?product=id) on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const prodId = params.get("product");
    if (prodId && products.length > 0) {
      const match = products.find((p) => String(p.id) === String(prodId));
      if (match) {
        setSelectedProduct(match);
      }
    }
  }, [products]);

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
    alert(`🎉 Order Registered Successfully!\n\nID: ${orderId}\nTotal: Rs. ${subtotal.toLocaleString("en-IN")}\n\nWe will now open WhatsApp to send these specifications directly to Creation Interiors!`);
    
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
        onOpenWishlist={() => setIsWishlistOpen(true)}
        wishlistCount={wishlist.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenCategoryMenu={() => setIsCategoryMenuOpen(true)}
        activeView={activeView}
        setActiveView={setActiveView}
        logoUrl={logoUrl}
      />

      {/* INTERACTIVE STOREFRONT VIEW */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        
        {/* Banner Hero Slides */}
        <BannerSlider slides={bannerSlides} />

        {/* Category Filter ribbons */}
        <div className="pt-2">
          <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} categories={categories} />
        </div>

        {/* EDITORIAL RENDERING VS SEARCH CATALOGUE RESULTS */}
        {selectedCategory === null && searchQuery === "" ? (
          /* RENDER THE COMPETITOR'S REPLICA LANDING PAGE */
          <div className="space-y-20">
            
            {/* Popular Categories Preview Grid */}
            <section className="space-y-8">
              <div className="text-center space-y-2">
                <span className="text-[9px] font-black tracking-widest text-[#B79041] bg-[#B79041]/10 border border-[#B79041]/20 px-3 py-1 rounded-full uppercase inline-block">
                  EXPLORE OUR SHOWROOM
                </span>
                <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-zinc-900 dark:text-zinc-100 font-medium">
                  Popular Categories
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                  Click a collection to filter our dynamic showcase and configure your bespoke custom layout plans.
                </p>
              </div>

              {/* Grid of clickable category cards */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  {
                    name: "Bedroom Furniture",
                    tagline: "Royal Master Suites",
                    badge: "Trending",
                    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&auto=format&fit=crop&q=80",
                  },
                  {
                    name: "Dining Furniture",
                    tagline: "Solid Teak & Quartz",
                    badge: "Artisanal",
                    image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=400&auto=format&fit=crop&q=80",
                  },
                  {
                    name: "Chairs",
                    tagline: "Ergonomic Loungers",
                    badge: "Ergonomic",
                    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&auto=format&fit=crop&q=80",
                  },
                  {
                    name: "Wardrobes",
                    tagline: "Modern Fitted Closets",
                    badge: "Bespoke",
                    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&auto=format&fit=crop&q=80",
                  },
                  {
                    name: "Foam Products",
                    tagline: "Orthopedic Support",
                    badge: "Wellness",
                    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&auto=format&fit=crop&q=80",
                  }
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setSelectedCategory(item.name)}
                    className="group relative flex flex-col justify-end overflow-hidden rounded-2xl aspect-[4/5] bg-zinc-950 border border-zinc-200/10 hover:border-[#B79041]/50 transition-all duration-500 text-left cursor-pointer outline-none shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:scale-[1.03] active:scale-[0.98]"
                  >
                    {/* Background image overlay */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700 ease-out brightness-[0.7] group-hover:brightness-[0.45]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent group-hover:via-black/70 transition-all duration-500" />
                    </div>

                    {/* Content inside card */}
                    <div className="relative z-10 p-4 space-y-1.5 transform group-hover:translate-y-[-2px] transition-transform duration-500">
                      <span className="inline-block text-[8px] font-black tracking-widest bg-[#B79041] text-white px-2 py-0.5 rounded-md uppercase shadow-sm">
                        {item.badge}
                      </span>
                      <h4 className="text-xs md:text-sm font-serif font-bold text-white tracking-tight group-hover:text-[#B79041] transition-colors duration-300 leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-zinc-300 group-hover:text-white transition-colors duration-300 font-sans tracking-wide truncate">
                        {item.tagline}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* 1. Bedroom Furniture Section */}
            <section className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-zinc-900 dark:text-zinc-100">
                  Bedroom Furniture
                </h2>
                <div className="flex justify-center">
                  <button
                    onClick={() => setSelectedCategory("Bedroom Furniture")}
                    className="border border-zinc-300 dark:border-zinc-700 px-7 py-2.5 rounded-none hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-xs font-serif tracking-widest uppercase font-medium"
                  >
                    View all
                  </button>
                </div>
              </div>

              {/* Bedroom Row Carousel/Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products
                  .filter((p) => p.category === "Bedroom Furniture")
                  .slice(0, 4)
                  .map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onShowDetails={setSelectedProduct}
                      onAddToCart={handleAddToCart}
                      isWishlisted={wishlist.includes(prod.id)}
                      onToggleWishlist={handleToggleWishlist}
                    />
                  ))}
              </div>

              {/* Delicate Pagination Indicator */}
              <div className="flex items-center justify-center gap-3 text-zinc-400 text-xs">
                <button className="p-1 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-not-allowed" disabled>
                  &lt;
                </button>
                <span className="font-mono text-[11px] tracking-wider select-none">1 / 1</span>
                <button className="p-1 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-not-allowed" disabled>
                  &gt;
                </button>
              </div>
            </section>

            {/* 2. Premium Split Mid-Promo Banner Block */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-zinc-50/50 dark:bg-zinc-900/30 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-900/50">
              <div className="md:col-span-6 overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800 shadow-sm aspect-[16/10]">
                <img
                  src="https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=800&auto=format&fit=crop&q=80"
                  alt="Fine Dining Furniture Design"
                  className="w-full h-full object-cover hover:scale-103 transition-transform duration-700"
                />
              </div>
              
              <div className="md:col-span-6 space-y-6 md:pl-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold tracking-widest text-[#B79041] uppercase">
                    FURNITURE THAT FEELS LIKE
                  </h3>
                  <h4 className="text-4xl md:text-5xl font-serif italic tracking-tight text-zinc-900 dark:text-zinc-100 font-medium">
                    Home
                  </h4>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-lg">
                  From luxurious family dinners to quiet, peaceful evenings, our pieces are meticulously handcrafted using premium materials to turn every room into a timeless sanctuary you love coming back to.
                </p>
                <div>
                  <button
                    onClick={() => setSelectedCategory("Dining Furniture")}
                    className="px-8 py-3.5 bg-zinc-900 hover:bg-zinc-850 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-serif text-xs tracking-widest uppercase font-medium transition duration-150 shadow-sm outline-none"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </section>

            {/* 3. Dining Furniture Section */}
            <section className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-zinc-900 dark:text-zinc-100">
                  Dining Furniture
                </h2>
                <div className="flex justify-center">
                  <button
                    onClick={() => setSelectedCategory("Dining Furniture")}
                    className="border border-zinc-300 dark:border-zinc-700 px-7 py-2.5 rounded-none hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-xs font-serif tracking-widest uppercase font-medium"
                  >
                    View all
                  </button>
                </div>
              </div>

              {/* Dining Row Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products
                  .filter((p) => p.category === "Dining Furniture")
                  .slice(0, 4)
                  .map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onShowDetails={setSelectedProduct}
                      onAddToCart={handleAddToCart}
                      isWishlisted={wishlist.includes(prod.id)}
                      onToggleWishlist={handleToggleWishlist}
                    />
                  ))}
              </div>

              {/* Pagination indicators */}
              <div className="flex items-center justify-center gap-3 text-zinc-400 text-xs">
                <button className="p-1 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-not-allowed" disabled>
                  &lt;
                </button>
                <span className="font-mono text-[11px] tracking-wider select-none">1 / 1</span>
                <button className="p-1 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-not-allowed" disabled>
                  &gt;
                </button>
              </div>
            </section>

            {/* 4. Complete Catalog & Range Slider Section below */}
            <section className="border-t border-zinc-100 dark:border-zinc-900 pt-16 space-y-8">
              <div className="space-y-2">
                <h3 className="text-xl font-serif text-zinc-900 dark:text-zinc-50 font-bold">
                  Browse Complete Custom Catalog
                </h3>
                <p className="text-xs text-zinc-500">
                  Apply fine filters to view dynamic models, custom bedside vanities and premium products.
                </p>
              </div>

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
                        <span>Min: Rs. 0</span>
                        <span className="text-zinc-950 dark:text-white font-black">Max: Rs. {maxPrice.toLocaleString("en-IN")}</span>
                      </div>
                      <input
                        type="range"
                        min="5000"
                        max="600000"
                        step="5000"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                        className="w-full accent-[#B79041] outline-none h-1 bg-zinc-200 rounded-lg cursor-pointer dark:bg-zinc-700"
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
                </div>

                {/* Catalog list right */}
                <div className="lg:col-span-9 space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-500">
                      Showing All <strong className="text-zinc-850 dark:text-zinc-200">{filteredProducts.length}</strong> premium models matched
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredProducts.map((prod) => (
                      <ProductCard
                        key={prod.id}
                        product={prod}
                        onShowDetails={setSelectedProduct}
                        onAddToCart={handleAddToCart}
                        isWishlisted={wishlist.includes(prod.id)}
                        onToggleWishlist={handleToggleWishlist}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>

          </div>
        ) : (
          /* STANDARD FILTERED GRID VIEW (ACTIVATES WHEN AN INLINE SEARCH OR SPECIFIC CATEGORY PILL IS CLICKED) */
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900 pb-4">
              <div>
                <h3 className="text-lg font-serif font-bold text-zinc-900 dark:text-zinc-100">
                  Search Results & Collections
                </h3>
                <p className="text-xs text-zinc-500 mt-1">
                  Matched products matching your specific query filter
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory(null);
                  setMaxPrice(600000);
                }}
                className="text-xs font-bold text-[#B79041] hover:underline"
              >
                Clear Search & Go Home
              </button>
            </div>

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
                      <span>Min: Rs. 0</span>
                      <span className="text-zinc-950 dark:text-white font-black">Max: Rs. {maxPrice.toLocaleString("en-IN")}</span>
                    </div>
                    <input
                      type="range"
                      min="5000"
                      max="600000"
                      step="5000"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                      className="w-full accent-[#B79041] outline-none h-1 bg-zinc-200 rounded-lg cursor-pointer dark:bg-zinc-700"
                    />
                  </div>
                </div>

                {/* Customer Purchase Order list */}
                {user ? (
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 p-6 rounded-3xl shadow-sm">
                    <OrderHistory orders={currentUserOrders} />
                  </div>
                ) : null}

              </div>

              {/* Catalog list right */}
              <div className="lg:col-span-9 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500">
                    Showing <strong className="text-zinc-850 dark:text-zinc-200">{filteredProducts.length}</strong> matching models
                  </span>
                  
                  {selectedCategory && (
                    <span className="text-[10px] font-bold px-3 py-1 bg-[#B79041]/10 border border-[#B79041]/20 text-[#B79041] rounded-full tracking-wider uppercase">
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
                        setMaxPrice(600000);
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
                        isWishlisted={wishlist.includes(prod.id)}
                        onToggleWishlist={handleToggleWishlist}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Bottom Quick Info bar / Trust Badges */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 border-t border-zinc-150 dark:border-zinc-850/60">
          <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-900 rounded-2xl shadow-sm text-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#B79041]/10 flex items-center justify-center text-[#B79041] text-xl flex-shrink-0">
              🚚
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 dark:text-zinc-50">Pan-Pakistan Secure Transit</h4>
              <p className="text-zinc-400 mt-0.5">Free transit insurance & premium white-glove on-site installation</p>
            </div>
          </div>
          <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 rounded-2xl shadow-sm text-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#B79041]/10 flex items-center justify-center text-[#B79041] text-xl flex-shrink-0">
              🔨
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 dark:text-zinc-50">Artisanal Customization</h4>
              <p className="text-zinc-400 mt-0.5">Custom dimension fabrics & seasoned luxury teakwood slabs</p>
            </div>
          </div>
          <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 rounded-2xl shadow-sm text-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#B79041]/10 flex items-center justify-center text-[#B79041] text-xl flex-shrink-0">
              📱
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 dark:text-zinc-50">Direct WhatsApp Checkout</h4>
              <p className="text-zinc-400 mt-0.5">Secure order blueprints sent directly to senior showroom managers</p>
            </div>
          </div>
        </section>

      </main>

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

      {/* Categories Selection Sidebar Drawer */}
      <CategorySidebar
        isOpen={isCategoryMenuOpen}
        onClose={() => setIsCategoryMenuOpen(false)}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Wishlist Sidebar Drawer */}
      <WishlistSidebar
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={products.filter((p) => wishlist.includes(p.id))}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
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
        categories={categories}
        onAddCategory={handleAddCategory}
        onDeleteCategory={handleDeleteCategory}
        slides={bannerSlides}
        onAddSlide={handleAddSlide}
        onDeleteSlide={handleDeleteSlide}
        logoUrl={logoUrl}
        onUpdateLogo={handleUpdateLogo}
        adminCreds={adminCreds}
        onUpdateAdminCreds={handleUpdateAdminCreds}
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
            Crafted for Android & Web platform. Access full Jetpack Compose Kotlin codebase inside the Control Board Panel under Admin Access.
          </p>
          <button
            onClick={() => setIsAdminOpen(true)}
            className="mt-3 inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-[11px] transition cursor-pointer"
          >
            🛠️ Control Board Panel
          </button>
        </div>
      </footer>

      {/* Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        id="floating_whatsapp_btn"
        className="fixed bottom-6 right-6 z-50 p-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl hover:shadow-green-500/20 hover:-translate-y-1 transition-all duration-300 group flex items-center justify-center cursor-pointer outline-none active:scale-95"
        title="Chat on WhatsApp"
      >
        <svg
          className="w-6 h-6 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="absolute right-full mr-3 bg-zinc-950 dark:bg-zinc-900 text-white text-[10px] tracking-widest uppercase font-black px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl border border-zinc-200/10 dark:border-zinc-800/60">
          Chat on WhatsApp
        </span>
        {/* Pulsating Ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366]/30 animate-ping -z-10 pointer-events-none" />
      </a>

    </div>
  );
}
