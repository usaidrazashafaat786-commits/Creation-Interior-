import { Product } from "../types";

const rawProducts: Product[] = [
  // ==========================================
  // BEDROOM FURNITURE (10 Products)
  // ==========================================
  {
    id: "class-bed-dressing",
    name: "Class Bed Dressing Suite",
    description: "The ultimate royal master suite. Features custom neoclassical tufted tall velvet headboard, matching high-lacquer finished nightstands, premium vanity dressers with metallic gold accents, and a luxury posture-support structure.",
    price: 525500,
    category: "Bedroom Furniture",
    imageUrl: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Includes": "1 x King Bedstead, 2 x Luxury Bedside Tables, 1 x Premium Vanity Dresser",
      "Material": "Solid Hardwood Frame, Premium Italian Plush Velvet, Brushed Brass",
      "Finish": "High-Gloss Piano Lacquer Protection",
      "Delivery": "Complimentary Premium Transit & On-site Assembly across major cities"
    },
    isAvailable: true
  },
  {
    id: "oxford-bed-dressing",
    name: "Oxford Bed Dressing Set",
    description: "Sophisticated British elegance reimagined. Handcrafted luxury paneling matched with a warm-toned fabric upholstered headboard and state-of-the-art floating nightstands with built-in ambient warm lighting options.",
    price: 350000,
    category: "Bedroom Furniture",
    imageUrl: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Includes": "1 x King Size Floating Frame, 2 x Integrated Floating Side-Tables",
      "Material": "Select Walnut Veneer, High-Density Performance Fabric Core",
      "Features": "Under-bed discrete LED lighting channel, soft-close drawer slides",
      "Assembly": "Complimentary expert installation included"
    },
    isAvailable: true
  },
  {
    id: "charm-bed-dressing",
    name: "Charm Bed Dressing Masterpiece",
    description: "A gorgeous contemporary masterpiece. Sleek clean-line golden stainless steel inserts embedded in a hand-tufted micro-suede display headboard, accompanied by stylish modern dresser modules.",
    price: 532000,
    category: "Bedroom Furniture",
    imageUrl: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Includes": "1 x Luxury King Bed, 2 x Designer Bedside Pedestals, 1 x Large Console Dresser",
      "Material": "German Beechwood Base, Micro-suede fabric, PVD Gold-plated accents",
      "Warranty": "10 Years Limited Structural Timber Warranty"
    },
    isAvailable: true
  },
  {
    id: "supremo-bed-dressing",
    name: "Supremo Bed Dressing Suite",
    description: "Our absolute signature imperial design. Double-height cushioned velvet backdrop block, finished with exquisite direct-import marble bedside tops, custom brass fixtures, and a majestic vanity console.",
    price: 507500,
    category: "Bedroom Furniture",
    imageUrl: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Includes": "1 x Royal Double-Height Headboard Bed, 2 x Premium Italian Marble Bedside Tables",
      "Material": "Teak Timber, Premium Italian Marble, Heavy-gauge Brass framing",
      "Finish": "Hand-applied natural protective oil and varnish coating"
    },
    isAvailable: true
  },
  {
    id: "royal-emperor-bed",
    name: "Royal Emperor Bed",
    description: "Indulge in absolute grandeur. Hand-carved solid teak wood crown design with premium gold-leaf detailing and a luxurious deep-buttoned beige silk tufted headboard.",
    price: 615000,
    category: "Bedroom Furniture",
    imageUrl: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Dimensions": "84\" (W) x 88\" (L) x 68\" (H)",
      "Carving": "100% Artisanal Handcrafted Woodwork",
      "Upholstery": "Pure Dupioni Silk Cover, High Resiliency Foam Core"
    },
    isAvailable: true
  },
  {
    id: "majestic-teak-bed",
    name: "Majestic Teak Bed",
    description: "Natural organic warmth with luxury integrity. Crafted entirely of seasoned premium-grade Burmese teakwood displaying raw grain finishes and geometric floating headboard slats.",
    price: 295000,
    category: "Bedroom Furniture",
    imageUrl: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Timber": "Grade-A Solid Burmese Teakwood",
      "Finish": "Water-resistant matte polyurethane coat",
      "Hardware": "Heavy-duty concealed German fittings"
    },
    isAvailable: true
  },
  {
    id: "florentine-canopy-bed",
    name: "Florentine Canopy Bed",
    description: "Ethereal renaissance architecture for the modern bedroom. Slim matte-black forged iron canopy frame paired with a premium hand-upholstered linen headboard backboard.",
    price: 340000,
    category: "Bedroom Furniture",
    imageUrl: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Structure": "Reinforced Powder-Coated Italian Forged Iron",
      "Headboard": "100% Organic Belgian Linen",
      "Accent": "Polished brass bracket collars"
    },
    isAvailable: true
  },
  {
    id: "classic-slatted-oak-bed",
    name: "Classic Slatted Oak Bed",
    description: "Minimalist Scandinavian bedroom aesthetics. Built of solid white oak timber featuring beautiful curved corners and a robust slatted frame designed for optimal cooling and ventilation.",
    price: 245000,
    category: "Bedroom Furniture",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Material": "Solid North American White Oak Wood",
      "Base": "Durable multi-slat laminated beechwood suspension",
      "Eco-Rating": "Zero-VOC eco-certified natural wood oils"
    },
    isAvailable: true
  },
  {
    id: "modern-floating-plinth-bed",
    name: "Modern Floating Plinth Bed",
    description: "Striking architectural statement. Concealed support base creates a magnificent floating weightless illusion, finished in luxury charcoal oak veneer with matching headboard panels.",
    price: 385000,
    category: "Bedroom Furniture",
    imageUrl: "https://images.unsplash.com/photo-1617325247661-675ab4d61196?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Design": "Low-Profile Plinth Suspension Bedstead",
      "Veneer": "Crown-cut Charcoal Oak with textured finish",
      "Options": "Integrated warm LED halo runner beneath frame"
    },
    isAvailable: true
  },
  {
    id: "grand-velour-suite",
    name: "Grand Velour Bed Suite",
    description: "Opulent velvet masterpiece. Dramatic wingback headboard design wrapped in dense emerald velour fabric, completed with hand-polished copper plinths and trims.",
    price: 495000,
    category: "Bedroom Furniture",
    imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Upholstery": "High-pile Stain-Proof Emerald Velour",
      "Trims": "PVD electroplated rose gold stainless steel",
      "Mattress support": "Heavy-duty double hydraulic lift-up storage"
    },
    isAvailable: true
  },

  // ==========================================
  // DINING FURNITURE (10 Products)
  // ==========================================
  {
    id: "valenza-dining-set",
    name: "Valenza Dining Set",
    description: "Exquisite dining grandeur. Polished premium quartz slab table comfortable for up to 8 adults, supported by custom sculptural heavy-metal double column pedestals and accompanied by 8 luxurious high-back dining chairs.",
    price: 396000,
    category: "Dining Furniture",
    imageUrl: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Includes": "1 x Grand Valenza Quartz Table, 8 x Premium Tufted Velvet Chairs",
      "Tabletop": "25mm Polished Quartz slab with stain-resistant protection",
      "Base": "Carbon steel matte base in rich charcoal black",
      "Seating Comfort": "High-elastic resilience memory foam seat pans"
    },
    isAvailable: true
  },
  {
    id: "supremo-dining-set",
    name: "Supremo Dining Set",
    description: "The ultimate family feast arrangement. Solid seasoned live-edge teak table with gold brass butterfly inlays, completed with hand-tailored ergonomic dining chairs that provide perfect lumbar posture alignment.",
    price: 432000,
    category: "Dining Furniture",
    imageUrl: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Includes": "1 x 8-Seater Live-Edge Premium Teak Table, 8 x Crafted Suede Dining Chairs",
      "Material": "Seasoned Grade-A Teakwood, Premium Italian Suede Fabric",
      "Table Profile": "45mm heavy solid timber with raw elegant organic edges"
    },
    isAvailable: true
  },
  {
    id: "elegance-dining-set",
    name: "Elegance Dining Set",
    description: "A modern luxury icon. Flawless white Carrara marble dining deck paired with bespoke structural gold metal frames, completed by lightweight shell chairs draped in high-end stainproof bouclé.",
    price: 426500,
    category: "Dining Furniture",
    imageUrl: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Includes": "1 x Carrara Marble Golden-framed Dining Table, 6 x Custom Bouclé Dining Chairs",
      "Material": "Genuine White Carrara Marble, Electroplated Gold Stainless Steel Frame",
      "Care": "Sealed for optimal liquid resistance. Wipe clean with soft damp cloth."
    },
    isAvailable: true
  },
  {
    id: "bravo-dining-set",
    name: "Bravo Dining Set",
    description: "Warmth meets luxurious design. Rich black-walnut dining surface fitted with artistic brass line-work, matched beautifully with ergonomic deep tan aniline leather bucket seats for maximum conversational comfort.",
    price: 347500,
    category: "Dining Furniture",
    imageUrl: "https://images.unsplash.com/photo-1530018607912-eff2df11a116?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Includes": "1 x Premium Walnut Table, 6 x Top-Grain Tan Leather Dining Chairs",
      "Material": "North American Walnut, Top-Grain Aniline Leather, Burnished Steel Legs",
      "Dimensions": "220cm (L) x 100cm (W) x 76cm (H)"
    },
    isAvailable: true
  },
  {
    id: "monarch-marble-10seater",
    name: "Monarch Marble 10-Seater Set",
    description: "Grand entertaining banquet solution. Massive custom Italian Calacatta Viola marble tabletop with gorgeous deep burgundy veining, complete with ten majestic velvet buttoned chairs.",
    price: 785000,
    category: "Dining Furniture",
    imageUrl: "https://images.unsplash.com/photo-1519643381401-22c77e60520e?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Seating Capacity": "10-12 Adults comfortably",
      "Marble": "Premium honed Calacatta Viola Marble",
      "Chairs": "Solid Beechwood legs, velvet finish, hand-applied gold tacks"
    },
    isAvailable: true
  },
  {
    id: "scandinavian-ash-dining",
    name: "Nordic Ash Dining Concept",
    description: "Pure Japanese and Nordic hybrid fusion. Natural ashwood dining table highlighting subtle pale finishes, complete with 6 beautifully hand-woven paper-cord luxury dining chairs.",
    price: 280000,
    category: "Dining Furniture",
    imageUrl: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Material": "Premium Solid Ashwood & Oak",
      "Chair Seat": "Hand-woven natural danish paper-cord (takes 12 hours per chair)",
      "Finish": "Matte natural hardwax soap finish"
    },
    isAvailable: true
  },
  {
    id: "rustic-loft-dining-table",
    name: "Rustic Loft Dining Set",
    description: "A perfect blend of industrial metalwork and warm organic live-edge timber. Made of heavy 50mm thick reclaimed railroad oak sleepers matched with a sturdy modern X-frame carbon steel base.",
    price: 265000,
    category: "Dining Furniture",
    imageUrl: "https://images.unsplash.com/photo-1617806118233-18e1db207f62?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Timber": "Reclaimed Century-Old Oak wood slabs",
      "Base Support": "Heavy industrial carbon-steel profile coated in matte black",
      "Seats": "6 x Handcrafted vintage genuine leather saddle chairs"
    },
    isAvailable: true
  },
  {
    id: "imperial-oval-dining",
    name: "Imperial Oval Dining Set",
    description: "Masterful circular luxury dining. Gorgeous radial walnut veneer starburst design on a statement pedestal leg, making conversations flow beautifully. Includes 6 custom-tailored chairs.",
    price: 395000,
    category: "Dining Furniture",
    imageUrl: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Table Type": "Radial Walnut Starburst Oval Pedestal",
      "Material": "American Walnut timber & heavy-cast fluted iron pedestal",
      "Finish": "Satin clear lacquer for moisture block"
    },
    isAvailable: true
  },
  {
    id: "vintage-teak-buffet-credenza",
    name: "Heritage Teak Buffet Credenza",
    description: "The ideal dining room centerpiece. Exquisite mid-century retro side credenza handcrafted with sliding tambour doors and solid brass drawer-pull handles.",
    price: 195000,
    category: "Dining Furniture",
    imageUrl: "https://images.unsplash.com/photo-1565538810844-1e119fc048af?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Cabinetry": "Solid teak wood framing and internal shelving",
      "Tambour Doors": "Precisely routed teak wood slats with fabric backing",
      "Storage": "3 x Velvet-lined cutlery drawers, 2 x heavy cabinets"
    },
    isAvailable: true
  },
  {
    id: "contemporary-glass-dining",
    name: "Contemporary Glass Dining Deck",
    description: "Sleek architectural transparency. Heavy 15mm thick tempered glass top floats gracefully above geometric polished steel interlocking struts, elevating spatial airiness.",
    price: 290000,
    category: "Dining Furniture",
    imageUrl: "https://images.unsplash.com/photo-1544207625-f852f8670836?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Glass": "15mm High-density clear tempered safety glass",
      "Framing": "Bespoke high-mirror polished #304 stainless steel",
      "Seats": "6 x Italian premium eco-leather modern sling chairs"
    },
    isAvailable: true
  },

  // ==========================================
  // CHAIRS (10 Products)
  // ==========================================
  {
    id: "mid-century-lounge-chair",
    name: "Mid-Century Lounge Armchair",
    description: "Our signature icon. Iconic molded walnut plywood seat shell paired with high-end top-grain black aniline leather cushions and a solid steel swiveling five-star pedestal base.",
    price: 115000,
    category: "Chairs",
    imageUrl: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Type": "Premium Swivel Lounge Chair & Matching Foot Ottoman",
      "Wood Shell": "7-Ply Molded Walnut Plywood with genuine wood veneer",
      "Cushions": "Top-Grain Italian Aniline Leather, Premium Latex filling"
    },
    isAvailable: true
  },
  {
    id: "regal-velvet-accent-chair",
    name: "Regal Velvet Accent Chair",
    description: "Make an absolute statement. Beautifully sculpted curved barrel accent chair upholstered in magnificent mustard yellow velvet, resting on elegant gold-plated steel legs.",
    price: 55000,
    category: "Chairs",
    imageUrl: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Fabric": "Stainproof mustard yellow high-density velvet",
      "Frame": "Reinforced solid larchwood frame core",
      "Legs": "Electroplated titanium gold rustproof steel"
    },
    isAvailable: true
  },
  {
    id: "sculptural-boucle-armchair",
    name: "Sculptural Bouclé Cozy Chair",
    description: "Unparalleled soft tactile bliss. Curved organic cocoon silhouette draped in luxurious cream-colored bouclé textured fabric, offering a cozy clouds sitting experience.",
    price: 78000,
    category: "Chairs",
    imageUrl: "https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Upholstery": "Premium Textured Cream Bouclé (Wool-blend)",
      "Cushioning": "High-density foam wrapped in premium down feathers",
      "Base": "Concealed heavy swivel steel ring platform"
    },
    isAvailable: true
  },
  {
    id: "lux-leather-wingback",
    name: "Imperial Leather Wingback Chair",
    description: "The timeless gentleman's study reading chair. Tall supportive back with deep hand-tufted buttoning in luxury distressed tan brown leather and solid mahogany wooden block legs.",
    price: 145000,
    category: "Chairs",
    imageUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Leather": "100% Full-grain South American cowhide",
      "Structure": "Kiln-dried solid mahogany wood framework",
      "Accents": "Hand-hammered brass upholstery studs"
    },
    isAvailable: true
  },
  {
    id: "ergonomic-executive-mesh",
    name: "Ergonomic Executive Office Chair",
    description: "State-of-the-art office engineering. High tensile strength breathable mesh backrest, adjustable 3D lumbar support pad, and multi-position lock sync-tilt controls.",
    price: 48000,
    category: "Chairs",
    imageUrl: "https://images.unsplash.com/photo-1519947400038-953af18444d2?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Mechanism": "Premium Italian synchro-tilt multi-locking controller",
      "Armrests": "4D adjustability (height, depth, angle, width)",
      "Gas Lift": "Class 4 heavy-duty pneumatic gas cylinder"
    },
    isAvailable: true
  },
  {
    id: "nordic-minimalist-dining-chair",
    name: "Nordic Minimalist Oak Chair",
    description: "Understated elegance. Sculpted solid white oak wood dining chair featuring fluid curved legs and a comfortable semi-circular back rest panel.",
    price: 32000,
    category: "Chairs",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Wood": "North American Kiln-dried White Oak",
      "Finish": "Ultra-matte clear organic wood lacquer",
      "Stackability": "Designed to stack up to 4 chairs high"
    },
    isAvailable: true
  },
  {
    id: "vintage-industrial-stool",
    name: "Vintage Industrial Iron Stool",
    description: "Rugged character meets breakfast bar seating. Adjustable height swivel wood seat mounted on raw architectural iron framework with a foot rest ring.",
    price: 25000,
    category: "Chairs",
    imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Seat Top": "Solid distressed elmwood round block",
      "Base Frame": "Raw dark iron casting with protective clear coating",
      "Height Range": "65cm to 85cm adjustable thread"
    },
    isAvailable: true
  },
  {
    id: "plush-boucle-swivel-chair",
    name: "Plush Bouclé Swivel Armchair",
    description: "Chic contemporary lifestyle living. Complete 360-degree silent rotation capability, stuffed with thick plush duck-down padding, ideal for master bedroom corners or vanity desks.",
    price: 85000,
    category: "Chairs",
    imageUrl: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Rotating base": "Dual-bearing heavy gauge steel swivel",
      "Fabric type": "Luxury textured linen-bouclé blend",
      "Load capacity": "Comfortably supports up to 180kg"
    },
    isAvailable: true
  },
  {
    id: "teakwood-slatted-easy-chair",
    name: "Teakwood Slatted Easy Chair",
    description: "Sunkissed luxury lounging. Perfect veranda or indoor reading easy chair made of high-grade golden teak wood with woven natural rattan mesh back support.",
    price: 65000,
    category: "Chairs",
    imageUrl: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Wood Grade": "Grade-A Solid Burmese Teak",
      "Mesh Core": "100% Handmade natural rattan split weave",
      "Angle": "Perfect 115-degree physiological relaxation angle"
    },
    isAvailable: true
  },
  {
    id: "chesterfield-tufted-armchair",
    name: "Classic Chesterfield Armchair",
    description: "Uncompromised historic nobility. Features classic rolled armrests, deep tufting with hand-wrapped buttons, and ornate turned timber bun feet.",
    price: 155000,
    category: "Chairs",
    imageUrl: "https://images.unsplash.com/photo-1617582907226-c49e2d8200d9?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Material": "Distressed Top-grain Cognac Leather",
      "Cushion Base": "Heavy coil springs wrapped in premium Dacron foam",
      "Wooden Legs": "Ornate hand-turned walnut finished wood"
    },
    isAvailable: true
  },

  // ==========================================
  // WARDROBES (10 Products)
  // ==========================================
  {
    id: "aurora-sliding-wardrobe",
    name: "Aurora Sliding Wardrobe",
    description: "Sleek spatial efficiency. Triple-door wide modern sliding wardrobe with built-in soft-closing dampers, integrated motion-activated LED interior hangar lighting, and tinted glass window panels.",
    price: 285000,
    category: "Wardrobes",
    imageUrl: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Doors": "3 x High-tension sliding glass doors with soft-close dampers",
      "Lighting": "Concealed warm white 3000K motion-sensor LEDs",
      "Interior Layout": "6 x Adjustable shelves, 4 x Solid timber organizer drawers, 3 x Hangar rails"
    },
    isAvailable: true
  },
  {
    id: "imperial-walkin-closet",
    name: "Imperial Walk-In Closet System",
    description: "Ultimate organizer luxury. Massive fully modular custom-configured wardrobe room layout made of exquisite rich mahogany veneers, open storage shelves, and specialized watch/jewelry drawer display drawers.",
    price: 595000,
    category: "Wardrobes",
    imageUrl: "https://images.unsplash.com/photo-1558882224-cca166733360?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Modular Units": "5 x Pre-assembled architectural tall modules",
      "Wood Structure": "Conifer-core multiply board with real dark mahogany wood veneer",
      "Drawers": "Full extension soft-closing undermount slides with leather linings"
    },
    isAvailable: true
  },
  {
    id: "classic-provincial-armoire",
    name: "Classic Provincial Armoire",
    description: "Vintage French provincial elegance. Exquisitely painted antique off-white hardwood armoire featuring hand-carved floral cabriole legs and vintage brass keylocks.",
    price: 215000,
    category: "Wardrobes",
    imageUrl: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Timber": "Solid Mature Alderwood & Russian Birch",
      "Finish": "Aesthetic distressed antique milk paint coat by hand",
      "Locking": "Functional historic dual-bolt iron key locks"
    },
    isAvailable: true
  },
  {
    id: "minimalist-matte-wardrobe",
    name: "Minimalist Matte Wardrobe",
    description: "Ultra-modern architectural block closet. Clean anti-fingerprint matte charcoal door finishes with elegant full-height recessed black aluminum strip pull handles.",
    price: 195000,
    category: "Wardrobes",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Finish Type": "Italian Zero-Gloss Anti-Scratch Nanotechnology Matte",
      "Hinges": "Blum soft-closing 110-degree hinges",
      "Shelving": "Reinforced 18mm high-density fiberboard sheets"
    },
    isAvailable: true
  },
  {
    id: "glass-mirrored-dressing-closet",
    name: "Mirror Glass Dressing Wardrobe",
    description: "Reflect and double your bedroom light. Modern 4-door premium wardrobe fitted with full-length bronze-tinted lead-free crystal mirrors on all outer surfaces.",
    price: 265000,
    category: "Wardrobes",
    imageUrl: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Mirror Class": "Premium bronze-tinted copper-free safety mirror sheets",
      "Cabinet timber": "Kiln-dried hardwood ply",
      "Drawer rails": "Push-to-open modern magnetic pressure latches"
    },
    isAvailable: true
  },
  {
    id: "scandinavian-open-wardrobe",
    name: "Scandi Open Clothes Rack",
    description: "Sleek minimalist boutique display hanging system. Made of natural blonde birchwood framing combined with matte white powder-coated heavy steel base shelves.",
    price: 85000,
    category: "Wardrobes",
    imageUrl: "https://images.unsplash.com/photo-1532372320978-9b4d8a3a0245?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Wood": "Seasoned Finnish Birch Wood",
      "Metal": "Thick gauge cold-rolled steel panels",
      "Features": "Adjustable bottom feet leveling pads"
    },
    isAvailable: true
  },
  {
    id: "rustic-solid-oak-wardrobe",
    name: "Rustic Solid Oak Wardrobe",
    description: "Warm country house tradition. Heavy robust design with beautiful wood grain, double doors opening to reveal immense hanging spaces and wide base blanket drawers.",
    price: 245000,
    category: "Wardrobes",
    imageUrl: "https://images.unsplash.com/photo-1505693395321-883724634266?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Timber": "100% Solid American Red Oak Wood",
      "Drawers": "Traditional hand-cut dovetail joints",
      "Handles": "Forged oil-rubbed bronze rustic loops"
    },
    isAvailable: true
  },
  {
    id: "teak-triple-door-cabinet",
    name: "Artisanal Teak Triple-Door Cabinet",
    description: "Exquisite handmade masterpiece. Features traditional louvered wooden door slats allowing natural air ventilation, keeping fabrics exceptionally fresh.",
    price: 325000,
    category: "Wardrobes",
    imageUrl: "https://images.unsplash.com/photo-1597072689227-8882273e8f6a?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Wood": "Burmese Teakwood and Rosewood core",
      "Doors": "Hand-routed angled timber louvers",
      "Storage": "3 x full hang spaces, 4 x bottom drawers"
    },
    isAvailable: true
  },
  {
    id: "industrial-loft-steel-closet",
    name: "Industrial Loft Metal-Wood Closet",
    description: "A perfect fusion of raw urban materials. Matte dark iron mesh door fronts contrasted beautifully with warm distressed solid pine internal wood shelves.",
    price: 185000,
    category: "Wardrobes",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Frame": "Structural black angle-iron profile",
      "Wood": "Kiln-dried rough sawn Southern Yellow Pine",
      "Features": "Unique sliding industrial barn-door rollers"
    },
    isAvailable: true
  },
  {
    id: "monochrome-fitted-wardrobe",
    name: "Monochrome Built-In Wardrobe",
    description: "High-end sleek minimalist fitted storage. Perfect sleek white acrylic panels paired with recessed light-wood side boards for a balanced modern look.",
    price: 295000,
    category: "Wardrobes",
    imageUrl: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Exterior": "Ultra-glossy white acrylic sheets bonded to ply core",
      "Interior": "Canadian Maple wood texture laminate",
      "Extras": "Pull-out full-length trouser hanger rack"
    },
    isAvailable: true
  },

  // ==========================================
  // SOFA SET (12 Products)
  // ==========================================
  {
    id: "monarch-velvet-sofa",
    name: "Monarch Royal Velvet Sofa Set",
    description: "The crown jewel of living room comfort. Features custom deep-tufted rich emerald green velvet upholstery, double-cushioned seat pans, and premium gold-capped tapered solid wood legs. Complete 3+2+1 seating setup.",
    price: 485000,
    category: "Sofa Set",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Seating Capacity": "6 Adults (3-Seater, 2-Seater, and 1-Seater Sofa Suite)",
      "Material": "Solid Seasoned Larchwood Frame, Premium Italian High-Pile Velvet",
      "Cushioning": "High-Resiliency 40-Density Foam, pocket springs, and luxury fiber wrap",
      "Legs": "Solid Teak with PVD Gold-plated Brass feet caps"
    },
    isAvailable: true
  },
  {
    id: "italian-sectional-sofa",
    name: "Milano Italian Leather L-Shape Sectional",
    description: "Ultra-modern architectural excellence. Handcrafted with authentic top-grain Italian aniline leather that develops a gorgeous rich patina over time. Features multi-position adjustable headrests and a sprawling modular chaise lounge.",
    price: 620000,
    category: "Sofa Set",
    imageUrl: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Configuration": "Left-Facing L-Shape Modular Sectional",
      "Leather Type": "100% Genuine Top-Grain Italian Aniline Leather",
      "Frame Support": "Reinforced structural steel corner brackets and seasoned beechwood",
      "Features": "5-stage ratchet adjustable headrests, deep-lounge configuration"
    },
    isAvailable: true
  },
  {
    id: "oxford-chesterfield-set",
    name: "Oxford Vintage Leather Chesterfield Set",
    description: "Understated historical nobility. Classic British chesterfield silhouette with deep hand-folded diamond button tufting, elegant rolled scroll arms, and classic brass stud detailing. Upholstered in rich vintage tan cowhide.",
    price: 510000,
    category: "Sofa Set",
    imageUrl: "https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Includes": "1 x Grand 3-Seater, 2 x Classic Chesterfield Armchairs",
      "Upholstery": "Premium full-aniline distressed cowhide leather",
      "Craftsmanship": "100% Hand-hammered brass upholstery tacks & hand-folded diamond tufting",
      "Base Support": "Heavy-gauge steel sinuous spring suspension"
    },
    isAvailable: true
  },
  {
    id: "boucle-cloud-sectional",
    name: "Cloud Comfort Bouclé Sofa Lounge",
    description: "The ultimate tactile sanctuary. Sprawling organic curved silhouette wrapped in a high-weight rich cream-colored wool bouclé fabric. Engineered with duck-down feather blend inserts for a floating cloud seating feel.",
    price: 425000,
    category: "Sofa Set",
    imageUrl: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Structure": "Low-profile curvilinear modular construction",
      "Fabric Type": "Premium Textured Cream Wool-blend Bouclé",
      "Filling": "50% Shredded memory foam, 50% Natural sterilized duck-down feathers",
      "Base": "Concealed heavy-duty non-slip platform feet"
    },
    isAvailable: true
  },
  {
    id: "nordic-hybrid-sofa",
    name: "Copenhagen Nordic Hybrid Oak Sofa",
    description: "A gorgeous blend of Japanese and Scandinavian minimalism. Features a beautifully exposed frame made of solid sustainably sourced North American white oak, holding plump stainproof light-grey linen cushions.",
    price: 310000,
    category: "Sofa Set",
    imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Includes": "1 x 3-Seater Sofa, 1 x Coordinating Lounge Accent Chair",
      "Timber": "Grade-A Solid North American White Oak with matte lacquer finish",
      "Fabric": "Stain-resistant and hydrophobic blended natural organic linen",
      "Removable Covers": "Yes, all cushion covers are fully zippered and dry-cleanable"
    },
    isAvailable: true
  },
  {
    id: "casablanca-custom-lounge",
    name: "Casablanca Imperial 7-Seater Suite",
    description: "Regal eastern hospitality reinvented. High-back comfortable design with exquisite hand-carved mahogany wood panels framing the crown and armrests, completed in luxury rich brocade golden-cream fabrics.",
    price: 680000,
    category: "Sofa Set",
    imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Includes": "1 x 3-Seater, 2 x 2-Seater Comfort Couches",
      "Wood Panels": "Solid Mature Swat Valley Walnut Wood with semi-gloss honey polish",
      "Upholstery": "Heavy-duty imported damask and royal jacquard fabric weave",
      "Warranty": "15 Years Termite and Wood Splitting Warranty"
    },
    isAvailable: true
  },
  {
    id: "tuscan-warm-leather",
    name: "Tuscan Cognac Leather Loveseat Suite",
    description: "Sleek, low-slung, mid-century classic design. Features premium full-grain cognac-colored warm leather encasing a high-density orthopedic seating deck, supported by artistic matte-black architectural steel legs.",
    price: 285000,
    category: "Sofa Set",
    imageUrl: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Includes": "2 x Modular Loveseats (Comfortably seats 4 adults)",
      "Leather Class": "Premium grade drum-dyed full-grain cowhide",
      "Metal Base": "Reinforced structural tube steel powder-coated in matte charcoal",
      "Dimensions": "165cm (W) x 88cm (D) x 72cm (H) per loveseat"
    },
    isAvailable: true
  },
  {
    id: "emerald-wing-lounge",
    name: "Emerald Tufted Wingback Living Room Set",
    description: "Dramatic proportions for stylish lounges. Features beautiful extra-high shelter wingback panels, deep hand-folded buttoning, and matching cylindrical velvet bolsters for perfect lateral lumbar support.",
    price: 395000,
    category: "Sofa Set",
    imageUrl: "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Includes": "1 x High-Back 3-Seater, 2 x Majestic Matching Wingback Armchairs",
      "Fabric Core": "Royal Emerald-Green dense structural performance velvet",
      "Hardware": "Heavy-duty concealed steel brackets, interlocking corner blocks",
      "Cushioning": "Multi-layered memory foam topped with hypoallergenic soft microfibers"
    },
    isAvailable: true
  },
  {
    id: "contemporary-minimalist-sofa",
    name: "Tokyo Sleek Architectural Sofa Set",
    description: "Clean, geometric, and crisp lines. Designed for high-end modern apartments, featuring raw low-profile industrial layouts, premium high-resiliency dense foam, and premium charcoal-grey interwoven textile covers.",
    price: 340000,
    category: "Sofa Set",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Includes": "1 x Architectural 3-Seater, 1 x Luxury Matching Daybed Ottoman",
      "Fabric": "Interwoven heavyweight anti-snag tech fabric (ideal for pet owners)",
      "Internal Core": "Solid kiln-dried Russian pine wood with high elastomeric webbings"
    },
    isAvailable: true
  },
  {
    id: "golden-accent-luxury-sofa",
    name: "Venetian Gilded Royal Sofa Suite",
    description: "An absolute masterpiece of premium Italian renaissance luxury. Showcases magnificent hand-carved mahogany scrollwork details completely finished in actual 24k gold-leaf gilding, paired with deluxe floral champagne damask fabric.",
    price: 750000,
    category: "Sofa Set",
    imageUrl: "https://images.unsplash.com/photo-1512211534123-531e2d36d24a?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Includes": "1 x Royal 3-Seater, 2 x Gilded Master Armchairs",
      "Gilding": "Intricate hand-applied 24-Karat Gold Leaf gilding",
      "Upholstery": "Directly imported Venetian silk-blended luxury champagne damask",
      "Detailing": "Deep-diamond tufting, hand-twisted piping, deluxe feather-blend cushions"
    },
    isAvailable: true
  },
  {
    id: "artisan-rattan-living-set",
    name: "Bali Premium Teak & Rattan Lounge Set",
    description: "Bring luxurious organic tropical serenity into your master sitting rooms. Crafted using seasoned premium-grade solid teak wood matched with tight handmade split-cane wicker weave details and warm linen cushions.",
    price: 260000,
    category: "Sofa Set",
    imageUrl: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Includes": "1 x 3-Seater Sofa, 2 x Matching Teak-Rattan Lounge Armchairs",
      "Wood Material": "Burmese plantation-grown premium Teak timber",
      "Weave Type": "100% Traditional Indonesian double-caning wicker weave",
      "Cushion Base": "Weatherproof and fade-resistant high-density foam in natural oatmeal cotton"
    },
    isAvailable: true
  },
  {
    id: "parisian-salon-sofa",
    name: "Parisian Classic Salon Curved Sofa Set",
    description: "Soft romantic luxury. Gently curved kidneys-shaped sofa set designed to foster intimate conversations. Upholstered in premium velvet with polished solid brass bases that capture reflections elegantly.",
    price: 465000,
    category: "Sofa Set",
    imageUrl: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Includes": "1 x Curved Kidneys-Shape 3-Seater, 1 x Matching Curved Accent Chair",
      "Upholstery": "Premium velvet in Parisian Rose Blush",
      "Base Plinth": "Highly polished brass steel wrap detailing",
      "Structure": "Double-layered elastic webbing, resilient solid wood core"
    },
    isAvailable: true
  }
];

const mappedProducts: Product[] = rawProducts.map((p) => {
  let category = p.category;
  if (category === "Bedroom Furniture") {
    category = "Bedroom Sets";
  } else if (category === "Dining Furniture") {
    category = "Dining Sets";
  } else if (category === "Sofa Set" || category === "Sofa Sets") {
    category = "Sofa Sets";
  } else if (category === "Chairs") {
    if (p.id.includes("dining")) {
      category = "Dining Sets";
    } else {
      category = "Custom Furniture";
    }
  } else if (category === "Wardrobes") {
    category = "Custom Furniture";
  }
  return {
    ...p,
    category
  };
});

const extraProducts: Product[] = [
  {
    id: "royal-multitasker-sofa-cum-bed",
    name: "Royal Multitasker Velvet Sofa Cum Bed",
    description: "The epitome of space-saving luxury. Unfolds smoothly via a German counter-balanced hydraulic pull-out mechanism. Upholstered in stain-resistant performance velvet with modular side storage armrests.",
    price: 185000,
    category: "Sofa Cum Beds",
    imageUrl: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Bed Mode Dimensions": "King Size (72 x 78 inches)",
      "Mechanism": "Premium patented counter-balanced hydraulic glide",
      "Fabric": "Stain-resistant Royal Velvet with high double-rub count",
      "Mattress Core": "6-inch Orthopedic cooling gel memory foam built-in"
    },
    isAvailable: true
  },
  {
    id: "milano-dual-fold-sofa-bed",
    name: "Milano Dual-Fold Premium Sofa Bed",
    description: "Sleek contemporary design that transitions from an elegant 3-seater sofa to a luxurious double bed in under 10 seconds. Crafted with high-grade steel click-clack machinery and solid ash wood legs.",
    price: 145000,
    category: "Sofa Cum Beds",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Sofa Mode": "Compact 3-Seater Comfort Lounge",
      "Bed Mode": "Double Bed Size (60 x 75 inches)",
      "Inner Framework": "Reinforced high-tensile structural carbon steel",
      "Cushioning": "High-resiliency 40-density orthopedic support foam"
    },
    isAvailable: true
  },
  {
    id: "signature-master-interior-consultation",
    name: "Elite Interior Design Consultation & 3D Visualization",
    description: "Creation Interior's premium complete turnkey design experience. Includes on-site measurements, complete floor layouts, color theme charts, sample board collection, and realistic 3D photorealistic architectural renders.",
    price: 75000,
    category: "Interior Design",
    imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Consultation Type": "Turnkey Full Home Design Consultation & Execution Roadmap",
      "Deliverables": "Full 3D Architectural Walkthrough, Material Sample Board, Electrical & Lighting Maps",
      "Site Visits": "Up to 3 personal site audits by senior lead architect",
      "Refundable": "100% credited back into manufacturing order value"
    },
    isAvailable: true
  },
  {
    id: "royal-palace-complete-living-design",
    name: "Royal Palace Signature Theme Design Package",
    description: "Bespoke design theme curation for your villa, penthouse, or executive suite. Complete layout customization, custom molding designs, luxury lighting maps, and coordinated fabric pairings.",
    price: 150000,
    category: "Interior Design",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Scope": "Complete Living & Bedroom Theme Coordination",
      "Renders": "4K Ultra-HD photorealistic architectural visualizations (3 angles per room)",
      "Timeframe": "Complete design package delivered in 14 business days",
      "Designer": "Exclusive matching with senior design consultant"
    },
    isAvailable: true
  },
  {
    id: "custom-monarch-carved-majestic-bed",
    name: "Custom Monarch Hand-Carved Teak Bed Set",
    description: "A gorgeous luxury master suite completely handmade to your dimensions. Features solid premium Grade-A Burmese teak wood, exquisite hand-chiseled details by expert artisans, and custom fabric accent headboard colors of your choice.",
    price: 495000,
    category: "Custom Furniture",
    imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce058fe85?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Wood Type": "100% Seasoned Grade-A Teak Wood (Burmese origin)",
      "Customizability": "Select headboard fabrics, polish tones (natural, walnut, dark oak), and dimensions",
      "Craftsmanship": "100% Hand-carved master artisan paneling with intricate scrollwork",
      "Warranty": "Lifetime termite-proof guarantee"
    },
    isAvailable: true
  }
];

export const defaultProducts: Product[] = [...mappedProducts, ...extraProducts];
