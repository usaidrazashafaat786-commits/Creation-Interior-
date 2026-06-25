import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&auto=format&fit=crop&q=80",
    title: "Sculpting Luxury Interiors",
    subtitle: "Artisanal Woodwork & Premium Textures",
    tagline: "Creation Interiors Premium Collection"
  },
  {
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&auto=format&fit=crop&q=80",
    title: "The Golden Standard of Comfort",
    subtitle: "Plush Velvets, Real Marbles & Premium Teak",
    tagline: "New Seasonal Arrivals"
  },
  {
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&auto=format&fit=crop&q=80",
    title: "Bespoke Space Architecture",
    subtitle: "Minimalist Sliding Wardrobes & Modular Shelves",
    tagline: "Custom Dimensions Fabricated to Order"
  }
];

export default function BannerSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div id="hero_slider_container" className="relative w-full h-[280px] md:h-[400px] overflow-hidden rounded-2xl group border border-zinc-200 dark:border-zinc-800 shadow-lg">
      {/* Background Image Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={slides[index].image}
            alt={slides[index].title}
            className="w-full h-full object-cover brightness-[0.5] dark:brightness-[0.4]"
          />
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators Navigation */}
      <div className="absolute top-4 left-4 z-10 bg-amber-500/90 text-zinc-950 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase">
        {slides[index].tagline}
      </div>

      {/* Front Hero Text Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 z-10 text-white pointer-events-none">
        <motion.p
          key={`sub-${index}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-amber-400 font-medium text-xs md:text-sm tracking-wider uppercase mb-1"
        >
          {slides[index].subtitle}
        </motion.p>
        <motion.h1
          key={`title-${index}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-2 max-w-2xl text-zinc-50 font-serif"
        >
          {slides[index].title}
        </motion.h1>
      </div>

      {/* Arrow Buttons */}
      <button
        id="slide_prev_btn"
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white transition opacity-0 group-hover:opacity-100 backdrop-blur-sm z-20"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        id="slide_next_btn"
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white transition opacity-0 group-hover:opacity-100 backdrop-blur-sm z-20"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            id={`slide_dot_${i}`}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === index ? "bg-amber-500 w-6" : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
