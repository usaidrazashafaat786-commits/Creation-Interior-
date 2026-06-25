import { Product } from "../types";

export const defaultProducts: Product[] = [
  {
    id: "premium-sofa-1",
    name: "Royal Velvet Sectional Sofa",
    description: "Ultra-premium L-shaped sofa wrapped in deep forest-green plush velvet fabric. High-density organic rebound foam provides an back-rest contouring feel. Structured with seasoned silver-oak wood rails and finished with gorgeous brushed brass gold support legs.",
    price: 45999,
    category: "Sofas",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80",
    specifications: {
      "Material": "Royal Forest Velvet, Solid Silver-Oak Timber",
      "Dimensions": "280cm (W) x 165cm (D) x 85cm (H)",
      "Foam Type": "Triple layer high-density HD-38 reflex cushion system",
      "Leg Finish": "Polished Golden Brass Electroplating",
      "Assembly": "Free home professional installation included"
    },
    isAvailable: true
  },
  {
    id: "premium-sofa-2",
    name: "Chesterfield Classic Tufted Couch",
    description: "A timeless masterpiece. Handcrafted in distressed midnight blue leather with deep-button tufting, premium rolled armrests, and beautiful solid mahogany wood bun feet. Features vintage brass nailhead accents along the contours.",
    price: 52499,
    category: "Sofas",
    imageUrl: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=600&auto=format&fit=crop&q=80",
    specifications: {
      "Material": "Distressed Top-Grain Cowhide Leather, Mahogany",
      "Dimensions": "220cm (W) x 95cm (D) x 78cm (H)",
      "Cushioning": "Pre-sprung seating with pocket coils & density foam",
      "Nailheads": "Hand-burnished antique brass pins",
      "Warranty": "5 Years Structural Warranty"
    },
    isAvailable: true
  },
  {
    id: "premium-bed-1",
    name: "King Sized Teakwood Bedstead",
    description: "Architectural frame crafted entirely from grade-A Indonesian teak timber. Headboard features custom hand-woven natural rattan webbing matched with velvet-padded backing to deliver a rustic yet modern aesthetic.",
    price: 38999,
    category: "Beds",
    imageUrl: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&auto=format&fit=crop&q=80",
    specifications: {
      "Material": "Pure Grade-A Teak Timber, Natural French Rattan",
      "Size": "King Size (fits 72\" x 78\" mattress)",
      "Finish": "Water-resistant matte polyurethane finish",
      "Included": "Headboard, footboard, and heavy-duty structural slats",
      "Assembly": "Requires 2 person assembly (Support provided on-site)"
    },
    isAvailable: true
  },
  {
    id: "premium-bed-2",
    name: "Nordic Luxury Velvet Bed",
    description: "A plush floating-concept bed upholstered in dense cream teddy velvet. Designed with sleek integrated warm-tinted LED ambient lighting strip on headboard margins, supported on a resilient structural metal skeletal chassis.",
    price: 31500,
    category: "Beds",
    imageUrl: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&auto=format&fit=crop&q=80",
    specifications: {
      "Material": "Upholstered Cream Bouclé/Teddy Velvet, Iron Core Frame",
      "Features": "Built-in touch-sensitive LED reading strip",
      "Power Specs": "12V adapter with 1.8m extension cord",
      "Slat Material": "Flexible laminated birch wood arch slats",
      "Height": "115cm Headboard Height"
    },
    isAvailable: true
  },
  {
    id: "premium-table-1",
    name: "Carrara Marble Dining Suite",
    description: "Exquisite 6-seater dining table topped with 20mm premium polished Carrara white marble. Supported by an artistic interlocking sculptural steel column coated in black matte anti-rust powder coating.",
    price: 29999,
    category: "Dining Tables",
    imageUrl: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=600&auto=format&fit=crop&q=80",
    specifications: {
      "Desktop": "20mm Polished Italian Carrara Marble with anti-stain sealer",
      "Base": "Architectural interlocking steel pedestal",
      "Dimensions": "180cm (L) x 90cm (W) x 76cm (H)",
      "Seats": "Optimized comfortably for up to 6 adults",
      "Care": "Clean with damp fiber cloth. Avoid acidic cleaning products."
    },
    isAvailable: true
  },
  {
    id: "premium-table-2",
    name: "Luxury Walnut Live-Edge Table",
    description: "Solid live-edge slab table showing the beautiful natural, organic flowing grains of premium North-American Black Walnut timber. Joints feature beautiful industrial bow-tie butterfly stabilizers.",
    price: 36999,
    category: "Dining Tables",
    imageUrl: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=600&auto=format&fit=crop&q=80",
    specifications: {
      "Timber": "Pure North-American Black Walnut (45mm thickness)",
      "Base Structure": "Heavy duty black steel industrial trapezoidal legs",
      "Dimensions": "200cm (L) x 95cm (W) x 76cm (H)",
      "Finish": "Hand-rubbed OSMO protective oil coating",
      "Grain Pattern": "Unique live-edge contour. No two pieces are identical."
    },
    isAvailable: true
  },
  {
    id: "premium-chair-1",
    name: "Ergonomic Tan Leather Armchair",
    description: "Mid-century architectural statements chair designed for superior lounger comfort. Padded with high resilience molded foam wrapped in supreme tan aniline leather, sitting on an integrated 360-degree silent satin-black swivel base.",
    price: 14500,
    category: "Chairs",
    imageUrl: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&auto=format&fit=crop&q=80",
    specifications: {
      "Upholstery": "Top-Grain Aniline Leather in Sienna Tan",
      "Base": "360-degree steel alloy swivel mechanism",
      "Foam": "Cold-cure contour molded memory foam",
      "Max Capacity": "140 kg weight threshold",
      "Features": "Adjustable tilt damper adjustment"
    },
    isAvailable: true
  },
  {
    id: "premium-chair-2",
    name: "Velvet Shell Accent Chair",
    description: "A glamorous addition for lounge spaces. Sculpted clam-shell back stitching upholstered in soft petal pink velvet with stylish tapered golden splayed legs. Adds instant boutique luxury vibe to dressing tables or foyers.",
    price: 8999,
    category: "Chairs",
    imageUrl: "https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?w=600&auto=format&fit=crop&q=80",
    specifications: {
      "Fabric": "Microfiber high-thread count Velvet",
      "Frame": "Reinforced multilayer plywood",
      "Support": "Golden-plated steel tubular legs with floor protector pads",
      "Dimensions": "75cm (W) x 70cm (D) x 82cm (H)",
      "Colorway": "Dusty Petal Pink & Metallic Brass Gold"
    },
    isAvailable: true
  },
  {
    id: "premium-wardrobe-1",
    name: "Fitted Sliding Mirror Wardrobe",
    description: "Majestic storage unit featuring two grand full-height sliding doors fitted with shatterproof safety mirror plates. The inner space houses multi-level modular drawers, chrome clothes rails, and sensor LED cupboard illumination.",
    price: 34999,
    category: "Wardrobes",
    imageUrl: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&auto=format&fit=crop&q=80",
    specifications: {
      "Body Material": "E1 grade heavy-density engineered timber boards",
      "Doors": "Soft-closing high glide tracks with security mirror panels",
      "Dimensions": "180cm (W) x 62cm (D) x 210cm (H)",
      "Features": "Rechargeable magnetic cabinet LED strips included",
      "Shelving Layout": "10 customizable interior blocks"
    },
    isAvailable: true
  },
  {
    id: "premium-wardrobe-2",
    name: "Sleek Charcoal Oak Closet",
    description: "A spacious 3-door wardrobe crafted in deep matte-black charcoal oak veneer. Soft-closing hinges open to reveal an ultra-luxe copper-gold inner finish with dynamic hanging modules and accessory drawers.",
    price: 28900,
    category: "Wardrobes",
    imageUrl: "https://images.unsplash.com/photo-1558882224-cca166733360?w=600&auto=format&fit=crop&q=80",
    specifications: {
      "material": "German Matte Oak Veneer, Premium Copper Internals",
      "Hinges": "Blum soft-closing steel hydraulic hinges",
      "Dimensions": "150cm (W) x 60cm (D) x 200cm (H)",
      "Internal Storage": "Includes 2 gold jewelry organizer trays, 3 hanger bars",
      "Finish": "Anti-fingerprint matte lacquer protection"
    },
    isAvailable: true
  },
  {
    id: "premium-foam-1",
    name: "Latex Rebound Ortho Foam Mattress",
    description: "High-science sleep solution. Integrates a top layer of breathable natural Belgian Pin-Hex Dunlop Latex with a supporting orthopedic support foam core. Delivers perfect spinal alignment and zero motion transfer guarantees.",
    price: 18999,
    category: "Foam Products",
    imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&auto=format&fit=crop&q=80",
    specifications: {
      "Comfort Layers": "Natural Dunlop Latex, Orthopedic contouring memory foam",
      "Cover Fabric": "Breathable Aloe-Vera treated knit cotton quilted cover",
      "Thickness": "8 Inches (20cm) Luxury Profile",
      "Feel Profile": "Medium-Firm (Highly recommended for back-pain relief)",
      "Warranty": "10 Years Limited Manufacturer Warranty"
    },
    isAvailable: true
  },
  {
    id: "premium-foam-2",
    name: "Premium Gel-Cool Ortho pillow",
    description: "Cradles head and neck perfectly using contouring memory foam topped with advanced thermo-regulating cool gel capsules. Prevents sweat and delivers peaceful sleep microclimates.",
    price: 3499,
    category: "Foam Products",
    imageUrl: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&auto=format&fit=crop&q=80",
    specifications: {
      "Core material": "Cool-Gel infused memory foam block",
      "Dimensions": "60cm x 40cm x 12cm",
      "Exterior Cover": "Machine washable premium bamboo fiber cover",
      "Acoustics": "Completely anti-snore adaptive elevation"
    },
    isAvailable: true
  }
];
