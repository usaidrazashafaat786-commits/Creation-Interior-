import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Sparkles, 
  Gem, 
  Volume2, 
  VolumeX, 
  MapPin, 
  Mail, 
  Globe, 
  PhoneCall, 
  Calendar,
  X,
  Compass
} from "lucide-react";

interface PresentationProps {
  onClose?: () => void;
  isOpenAsModal?: boolean;
}

export default function MegaSalePresentation({ onClose, isOpenAsModal = false }: PresentationProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const totalSlides = 8;
  const slideDuration = 6000; // 6 seconds per slide

  // Autoplay Logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, slideDuration);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setIsPlaying(false); // Pause on manual interaction
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsPlaying(false); // Pause on manual interaction
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  // Handle subtle ambient chime/ambient sound
  const playSoundEffect = () => {
    if (isMuted) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(329.63, audioCtx.currentTime); // E4 note (warm luxury note)
      oscillator.frequency.exponentialRampToValueAtTime(440.00, audioCtx.currentTime + 0.15); // A4
      
      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 1.2);
    } catch (e) {
      console.log("Audio feedback error:", e);
    }
  };

  const selectSlide = (index: number) => {
    setCurrentSlide(index);
    setIsPlaying(false);
    playSoundEffect();
  };

  // Custom styling elements & gradients
  const overlayGradient = "radial-gradient(circle at 10% 10%, rgba(183, 144, 65, 0.08) 0%, transparent 40%), radial-gradient(circle at 90% 90%, rgba(183, 144, 65, 0.08) 0%, transparent 40%)";

  return (
    <div 
      className={`relative bg-zinc-950 text-white select-none ${
        isOpenAsModal 
          ? "fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 bg-black/95" 
          : "w-full rounded-3xl border border-zinc-800 shadow-2xl overflow-hidden"
      } transition-all duration-300`}
      id="mega_sale_presentation_wrapper"
    >
      
      {/* Immersive Slide Viewport */}
      <div 
        className={`relative bg-black flex flex-col justify-between overflow-hidden ${
          isOpenAsModal 
            ? "w-full h-full md:max-w-6xl md:h-[680px] md:rounded-2xl border border-zinc-800" 
            : "w-full aspect-[16/10] md:aspect-[16/9] min-h-[460px] md:min-h-[580px]"
        }`}
        style={{ backgroundImage: `radial-gradient(circle at center, #121212 0%, #000000 100%)` }}
      >
        
        {/* Subtle Ambient Decorative Gradients */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-80" style={{ background: overlayGradient }} />

        {/* Top Header Controls Bar */}
        <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-zinc-900 bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B79041] animate-pulse" />
            <span className="text-[10px] font-black tracking-widest uppercase text-[#B79041]">
              Creation Interior • Mega Sale Presentation
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Play/Pause Autoplay Indicator */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition text-xs flex items-center gap-1 cursor-pointer"
              title={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
            >
              {isPlaying ? <Pause className="w-4 h-4 text-[#B79041]" /> : <Play className="w-4 h-4" />}
              <span className="text-[10px] uppercase tracking-wider font-bold hidden sm:inline">
                {isPlaying ? "Autoplay On" : "Autoplay"}
              </span>
            </button>

            {/* Mute/Unmute Audio Chime */}
            <button
              onClick={() => {
                setIsMuted(!isMuted);
                if (isMuted) {
                  setTimeout(() => playSoundEffect(), 100);
                }
              }}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition cursor-pointer"
              title={isMuted ? "Enable Audio Chime" : "Mute Audio Chime"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#B79041]" />}
            </button>

            {/* Close Button if opened as modal */}
            {onClose && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition ml-2 cursor-pointer"
                title="Exit Presentation Mode"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Slide Stage Area */}
        <div className="relative flex-grow flex items-center justify-center p-6 md:p-12 z-10">
          <AnimatePresence mode="wait">
            
            {/* SLIDE 1: Cover Presentation */}
            {currentSlide === 0 && (
              <motion.div
                key="slide_0"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full flex flex-col items-center justify-center text-center space-y-6"
              >
                {/* Immersive Ambient Background Layer specifically for Slide 1 */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity z-0"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&auto=format&fit=crop&q=80')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-0" />

                <div className="relative z-10 space-y-4">
                  <p className="text-[#B79041] text-xs md:text-sm font-bold tracking-[0.3em] uppercase">
                    CREATION INTERIOR PRESENTS
                  </p>
                  
                  <h1 className="text-5xl md:text-8xl font-serif tracking-tight text-[#B79041] font-bold leading-none select-text">
                    MEGA SALE
                  </h1>
                  
                  <p className="text-lg md:text-2xl font-sans tracking-[0.2em] font-light text-zinc-100 select-text">
                    UP TO <span className="text-white font-bold">40% OFF</span> ON PREMIUM DESIGNS
                  </p>

                  <div className="pt-6 flex justify-center">
                    <div className="border border-[#B79041] px-6 py-2.5 rounded-none bg-black/40 backdrop-blur-sm text-[11px] md:text-xs tracking-widest font-mono text-[#B79041] uppercase">
                      27 JUNE 2026 – 10 JULY 2026
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SLIDE 2: Elevated Living Vision Statement */}
            {currentSlide === 1 && (
              <motion.div
                key="slide_1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-3xl text-center space-y-6"
              >
                <div className="w-12 h-[1.5px] bg-[#B79041] mx-auto" />
                <h2 className="text-3xl md:text-5xl font-serif font-medium tracking-wide text-[#B79041] uppercase">
                  ELEVATED LIVING
                </h2>
                <p className="text-zinc-300 text-sm md:text-xl font-sans font-light leading-relaxed select-text">
                  Discover the intersection of modern sophistication and timeless craftsmanship. 
                  Creation Interior redefines the luxury experience for your home, crafting bespoke masterpieces tailored strictly to your dreams.
                </p>
                <div className="flex justify-center gap-6 pt-4 text-[11px] uppercase tracking-widest font-bold text-zinc-500">
                  <span>Premium Materials</span>
                  <span className="text-[#B79041]">•</span>
                  <span>German Machinery</span>
                  <span className="text-[#B79041]">•</span>
                  <span>Handcrafted Heritage</span>
                </div>
              </motion.div>
            )}

            {/* SLIDE 3: Living Room Opulence (Sofa Sets) */}
            {currentSlide === 2 && (
              <motion.div
                key="slide_2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              >
                <div className="md:col-span-6 space-y-4 text-left">
                  <span className="text-[10px] font-bold text-[#B79041] uppercase tracking-widest">
                    Collection Category
                  </span>
                  <h2 className="text-3xl md:text-5xl font-serif font-bold text-white uppercase leading-tight select-text">
                    LIVING ROOM <br />
                    <span className="text-[#B79041]">OPULENCE</span>
                  </h2>
                  <p className="text-zinc-300 text-xs md:text-sm leading-relaxed max-w-md select-text">
                    Transform your primary living space with our signature collections. From deep-seated luxury velvet sofas to bespoke gold-plated centerpieces, every item is a testament to refined taste.
                  </p>
                  
                  <div className="pt-2 border-t border-zinc-900">
                    <p className="text-xs font-bold text-[#B79041] mb-2 font-serif">
                      Featured: The Obsidian Series
                    </p>
                    <ul className="text-xs text-zinc-400 space-y-1">
                      <li className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#B79041]" />
                        Premium Italian Leather Options & High-Resiliency Cushions
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#B79041]" />
                        Hand-finished Solid Brass Accents & Tapered Teak Legs
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="md:col-span-6 h-full min-h-[180px] md:min-h-[280px] rounded-xl overflow-hidden relative shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80"
                    alt="Luxury Sofa Set Creation Interiors"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                </div>
              </motion.div>
            )}

            {/* SLIDE 4: Dining Excellence */}
            {currentSlide === 3 && (
              <motion.div
                key="slide_3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              >
                <div className="md:col-span-6 h-full min-h-[180px] md:min-h-[280px] rounded-xl overflow-hidden relative shadow-lg order-last md:order-first">
                  <img
                    src="https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=800&auto=format&fit=crop&q=80"
                    alt="Dining Table Creation Interiors"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent" />
                </div>

                <div className="md:col-span-6 space-y-4 text-left">
                  <span className="text-[10px] font-bold text-[#B79041] uppercase tracking-widest">
                    Dining Room Suites
                  </span>
                  <h2 className="text-3xl md:text-5xl font-serif font-bold text-white uppercase leading-tight select-text">
                    DINING <br />
                    <span className="text-[#B79041]">EXCELLENCE</span>
                  </h2>
                  <h3 className="text-xs md:text-sm text-zinc-200 font-sans tracking-wide">
                    The Royal Banqueting Table
                  </h3>
                  <p className="text-zinc-300 text-xs md:text-sm leading-relaxed max-w-md select-text">
                    Host with unparalleled confidence. Our dining sets combine scratch-resistant quartz & heavy-duty Italian marble surfaces with elegant brushed gold-finished pedestals.
                  </p>
                  
                  <div className="pt-2 border-t border-zinc-900">
                    <ul className="text-xs text-zinc-400 space-y-1">
                      <li className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#B79041]" />
                        Scratch-resistant & hot-pot friendly Marble Tops
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#B79041]" />
                        Ergonomic dense foam Velvet seating chairs
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SLIDE 5: Serene Sanctuaries (Bedroom Sets) */}
            {currentSlide === 4 && (
              <motion.div
                key="slide_4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              >
                <div className="md:col-span-6 space-y-4 text-left">
                  <span className="text-[10px] font-bold text-[#B79041] uppercase tracking-widest">
                    Bedroom Architecture
                  </span>
                  <h2 className="text-3xl md:text-5xl font-serif font-bold text-white uppercase leading-tight select-text">
                    SERENE <br />
                    <span className="text-[#B79041]">SANCTUARIES</span>
                  </h2>
                  <h3 className="text-xs md:text-sm text-[#B79041] font-sans italic tracking-wide">
                    Master Bedroom Suite
                  </h3>
                  <p className="text-zinc-300 text-xs md:text-sm leading-relaxed max-w-md select-text">
                    Your bedroom should be a sanctuary of peace, recovery, and absolute prestige. Our collection features extra-large cushioned winged headboards with integrated gold accent mood lighting.
                  </p>
                  <div className="pt-2 border-t border-zinc-900">
                    <span className="text-[10px] bg-[#B79041]/10 border border-[#B79041]/30 text-[#B79041] font-mono px-3 py-1 rounded-full uppercase tracking-wider">
                      Lifetime Wood Guarantee Included
                    </span>
                  </div>
                </div>

                <div className="md:col-span-6 h-full min-h-[180px] md:min-h-[280px] rounded-xl overflow-hidden relative shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&auto=format&fit=crop&q=80"
                    alt="Luxury Bed Suite Creation Interiors"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                </div>
              </motion.div>
            )}

            {/* SLIDE 6: Luxury In The Details (Premium Materials) */}
            {currentSlide === 5 && (
              <motion.div
                key="slide_5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="w-full space-y-6 text-center"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#B79041] uppercase tracking-widest">
                    Exquisite Sourcing & Materials
                  </span>
                  <h2 className="text-3xl md:text-5xl font-serif font-bold text-white uppercase tracking-tight select-text">
                    LUXURY IN THE DETAILS
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                  <div className="p-5 bg-zinc-900/50 rounded-xl border border-zinc-800/80 hover:border-[#B79041]/40 transition duration-300">
                    <div className="w-10 h-10 bg-[#B79041]/10 border border-[#B79041]/20 rounded-lg flex items-center justify-center mb-4 text-[#B79041]">
                      <Gem className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#B79041] mb-2 uppercase">
                      PREMIUM MARBLE
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed select-text">
                      Directly sourced premium marble slabs. Features rich, natural, distinctive white and gold veining textures that ensure each dining table is completely unique.
                    </p>
                  </div>

                  <div className="p-5 bg-zinc-900/50 rounded-xl border border-zinc-800/80 hover:border-[#B79041]/40 transition duration-300">
                    <div className="w-10 h-10 bg-[#B79041]/10 border border-[#B79041]/20 rounded-lg flex items-center justify-center mb-4 text-[#B79041]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#B79041] mb-2 uppercase">
                      BRUSHED BRASS
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed select-text">
                      High-grade stainless steel electroplated with fine brushed gold and brass coatings. Anti-corrosive, highly reflective, and designed to look majestic for generations.
                    </p>
                  </div>

                  <div className="p-5 bg-zinc-900/50 rounded-xl border border-zinc-800/80 hover:border-[#B79041]/40 transition duration-300">
                    <div className="w-10 h-10 bg-[#B79041]/10 border border-[#B79041]/20 rounded-lg flex items-center justify-center mb-4 text-[#B79041]">
                      <Compass className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#B79041] mb-2 uppercase">
                      LUXE FABRICS
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed select-text">
                      High-GSM European velvets, rich textured linens, and stain-resistant performance bouclés designed for high-density, cozy feel and easy cleanup.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SLIDE 7: Unmissable Offers (40% Max Discount) */}
            {currentSlide === 6 && (
              <motion.div
                key="slide_6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              >
                <div className="md:col-span-5 text-center space-y-1">
                  <div className="text-[#B79041] font-serif font-bold text-8xl md:text-[140px] leading-none select-text">
                    40%
                  </div>
                  <div className="text-xs tracking-[0.25em] font-bold text-zinc-100 uppercase">
                    MAXIMUM DISCOUNT
                  </div>
                  <div className="text-[10px] font-black text-[#B79041] uppercase tracking-widest mt-2">
                    EXCLUSIVE SEASON OFFER
                  </div>
                </div>

                <div className="md:col-span-7 space-y-4 text-left md:pl-8 border-l border-zinc-900">
                  <span className="text-[10px] font-bold text-[#B79041] uppercase tracking-widest">
                    Mega Sale Event
                  </span>
                  <h2 className="text-3xl md:text-5xl font-serif font-bold text-white uppercase select-text">
                    UNMISSABLE OFFERS
                  </h2>
                  <p className="text-zinc-300 text-xs md:text-sm leading-relaxed select-text">
                    This limited-time Mega Sale is our most significant curation event of the season. Take this opportunity to completely refresh your living rooms, dining spaces, and bedrooms with our premium bespoke items.
                  </p>
                  <div className="h-[1px] w-20 bg-[#B79041]" />
                  <p className="text-xs text-[#B79041] font-bold tracking-wider select-text">
                    Available across our Pakistan flagship boutiques & digital store.
                  </p>
                </div>
              </motion.div>
            )}

            {/* SLIDE 8: Contact & Showroom Visit Call to Action */}
            {currentSlide === 7 && (
              <motion.div
                key="slide_7"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5 }}
                className="w-full text-center space-y-6"
              >
                <span className="text-[10px] font-bold text-[#B79041] uppercase tracking-widest">
                  Plan Your Design Visit
                </span>
                <h2 className="text-3xl md:text-6xl font-serif font-bold text-white tracking-tight leading-none uppercase select-text">
                  VISIT OUR SHOWROOM
                </h2>
                <p className="text-zinc-400 text-xs md:text-base max-w-xl mx-auto select-text">
                  Step inside our boutique center to feel the fabrics, test the cushion densities, and finalize custom dimension diagrams with our senior interior consultants.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left pt-4 max-w-4xl mx-auto">
                  <div className="p-4 bg-zinc-900/40 rounded-xl border border-zinc-800">
                    <div className="flex items-center gap-2 text-[#B79041] font-bold text-xs uppercase tracking-wider mb-2 font-serif">
                      <MapPin className="w-4 h-4" />
                      FLAGSHIP STORE
                    </div>
                    <p className="text-zinc-300 text-xs leading-relaxed select-text">
                      Plot 102, Design Avenue Corridor, Near Premium Center, Karachi, Pakistan.
                    </p>
                  </div>

                  <div className="p-4 bg-zinc-900/40 rounded-xl border border-zinc-800">
                    <div className="flex items-center gap-2 text-[#B79041] font-bold text-xs uppercase tracking-wider mb-2 font-serif">
                      <Mail className="w-4 h-4" />
                      EMAIL SUPPORT
                    </div>
                    <p className="text-zinc-300 text-xs leading-relaxed select-text">
                      info@creationinterior.com<br />
                      sales@creationinterior.com
                    </p>
                  </div>

                  <div className="p-4 bg-zinc-900/40 rounded-xl border border-zinc-800">
                    <div className="flex items-center gap-2 text-[#B79041] font-bold text-xs uppercase tracking-wider mb-2 font-serif">
                      <PhoneCall className="w-4 h-4" />
                      WHATSAPP HOTLINE
                    </div>
                    <a 
                      href="https://wa.me/923379929157" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-[#B79041] transition text-xs font-bold font-mono tracking-wide select-text block mt-1"
                    >
                      +92 337 9929157
                    </a>
                    <span className="text-[10px] text-zinc-500 block">Click to start immediate chat</span>
                  </div>
                </div>

                {/* Instant Action CTA Buttons */}
                <div className="flex flex-wrap justify-center gap-3 pt-4">
                  <a
                    href="https://wa.me/923379929157?text=Hi%20Creation%20Interior%2C%20I%20would%20like%20to%20inquire%20about%20the%20Mega%20Sale%20Offers!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-[#B79041] hover:bg-[#a37f34] text-white text-xs font-bold tracking-widest uppercase transition-colors flex items-center gap-2 shadow-lg"
                  >
                    Inquire Sale Offers On WhatsApp
                  </a>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Bottom Slide Deck Navigation & Progress Bar */}
        <div className="relative z-10 px-6 py-5 border-t border-zinc-900 bg-black/40 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => selectSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === idx 
                    ? "w-8 bg-[#B79041]" 
                    : "w-2 bg-zinc-700 hover:bg-zinc-500"
                } cursor-pointer`}
                title={`Go to Slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Core Controls: Prev/Next Buttons */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-zinc-500">
              Slide <span className="text-[#B79041] font-bold">{currentSlide + 1}</span> of {totalSlides}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 hover:border-[#B79041]/50 transition cursor-pointer"
                title="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNext}
                className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 hover:border-[#B79041]/50 transition cursor-pointer"
                title="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
