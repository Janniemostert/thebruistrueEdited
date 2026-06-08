import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const blends = [
  {
    name: "Morning Magic",
    roast: "Medium-Dark Roast",
    intensity: 5,
    description: "From green bean to great coffee. Bold, rich, and built for sunrise.",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698dee094c33bdd2a71bf8e8/38272ea2e_Screenshot_20260302_200800_Gallery.jpg",
  },
  {
    name: "Midday Roast",
    roast: "Medium Roast",
    intensity: 5,
    description: "Balanced and bright — your focused afternoon companion.",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698dee094c33bdd2a71bf8e8/e626bbb56_Screenshot_20260302_201322_ChatGPT.jpg",
  },
  {
    name: "Sunset Roast",
    roast: "Medium Roast",
    intensity: 4,
    description: "Warm, bold, chocolate notes. True coffee for the golden hour.",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698dee094c33bdd2a71bf8e8/bd78479dd_Screenshot_20260302_201115_Gallery.jpg",
  },
  {
    name: "Evening Bliss",
    roast: "Medium Roast",
    intensity: 3,
    description: "A calming cup to ease you into the quiet of the evening.",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698dee094c33bdd2a71bf8e8/3baec08d2_Screenshot_20260302_201132_Gallery.jpg",
  },
];

const IntensityDots = ({ level, max = 5 }) => (
  <div className="flex items-center gap-3">
    <span style={{ color: "rgba(198,167,94,0.75)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Smooth</span>
    <div className="flex gap-1.5 items-center">
      {Array.from({ length: max }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.06, duration: 0.25 }}
          className="rounded-full"
          style={{
            width: i < level ? 11 : 8,
            height: i < level ? 11 : 8,
            background: i < level ? "#C6A75E" : "rgba(198,167,94,0.18)",
            boxShadow: i < level ? "0 0 10px #C6A75E70" : "none",
          }}
        />
      ))}
    </div>
    <span style={{ color: "rgba(198,167,94,0.75)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Bold</span>
  </div>
);

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDir(1);
      setCurrent(prev => (prev + 1) % blends.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const navigate = (idx) => {
    setDir(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  const prev = () => navigate((current - 1 + blends.length) % blends.length);
  const next = () => navigate((current + 1) % blends.length);

  const blend = blends[current];

  return (
    <div className="relative overflow-hidden" style={{ minHeight: "100vh", background: "#0A0A0A" }}>
      {/* Ambient background glow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 65% 50%, rgba(198,167,94,0.07) 0%, transparent 60%)`,
          }}
        />
      </AnimatePresence>

      {/* Gold top line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, #C6A75E40, transparent)" }} />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 min-h-screen flex flex-col justify-center">
        {/* Gold centered logo above */}
        <div className="absolute top-24 left-0 right-0 flex flex-col items-center">
          <p className="serif text-xs uppercase tracking-[0.4em] mb-1" style={{ color: "rgba(198,167,94,0.85)" }}>— COFFEE —</p>
          <p className="serif text-xs uppercase tracking-[0.2em]" style={{ color: "rgba(232,223,208,0.75)", fontStyle: "italic" }}>From green bean to great coffee.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center pt-16">
          {/* Left: Text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${current}`}
              initial={{ opacity: 0, x: dir * 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -dir * 30 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="order-2 md:order-1 flex flex-col gap-6"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: "rgba(198,167,94,0.55)" }}>
                  Blend {String(current + 1).padStart(2, "0")} / {String(blends.length).padStart(2, "0")}
                </p>
                <h1 className="serif mb-2" style={{
                  fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                  fontWeight: 300,
                  color: "#C6A75E",
                  fontStyle: "italic",
                  lineHeight: 1.05,
                  textShadow: "0 0 40px rgba(198,167,94,0.3)"
                }}>
                  {blend.name}
                </h1>
                <p className="text-xs uppercase tracking-[0.3em] mb-6" style={{ color: "rgba(232,223,208,0.8)" }}>
                  {blend.roast}
                </p>
              </div>

              {/* Intensity */}
              <div>
                <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "rgba(198,167,94,0.75)" }}>Intensity</p>
                <IntensityDots level={blend.intensity} />
              </div>

              {/* Divider */}
              <div style={{ height: 1, width: 64, background: "linear-gradient(to right, #C6A75E60, transparent)" }} />

              <p className="text-sm leading-relaxed" style={{ color: "rgba(232,223,208,0.8)", maxWidth: "380px" }}>
                {blend.description}
              </p>

              <div className="flex gap-4 flex-wrap">
                <a
                  href="https://thebruistrue.coffee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-3.5 text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300"
                  style={{ background: "#C6A75E", color: "#0A0A0A" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#D4B870"; e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(198,167,94,0.35)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#C6A75E"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  Shop Now
                </a>
                <Link
                  to={createPageUrl("Menu")}
                  className="inline-flex items-center px-8 py-3.5 text-xs uppercase tracking-[0.25em] border transition-all duration-300"
                  style={{ borderColor: "rgba(198,167,94,0.3)", color: "rgba(232,223,208,0.8)" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#C6A75E"; e.currentTarget.style.color = "#C6A75E"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(198,167,94,0.3)"; e.currentTarget.style.color = "rgba(232,223,208,0.8)"; }}
                >
                  View Blends
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right: Packaging image */}
          <div className="order-1 md:order-2 flex justify-center items-center relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${current}`}
                initial={{ opacity: 0, scale: 0.92, x: dir * 40 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.94, x: -dir * 40 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative"
                style={{ maxWidth: "340px", width: "100%" }}
              >
                {/* Glow behind bag */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: "radial-gradient(ellipse at center, rgba(198,167,94,0.18) 0%, transparent 65%)",
                  transform: "scale(1.3)",
                  filter: "blur(20px)",
                }} />
                <img
                  src={blend.image}
                  alt={blend.name}
                  className="relative w-full h-auto"
                  style={{ objectFit: "contain", filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.8))" }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="absolute bottom-10 left-6 md:left-12 flex items-center gap-5">
          <button onClick={prev} className="w-10 h-10 flex items-center justify-center border transition-all duration-300"
            style={{ borderColor: "rgba(198,167,94,0.25)", color: "rgba(198,167,94,0.85)" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#C6A75E"; e.currentTarget.style.color = "#C6A75E"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(198,167,94,0.25)"; e.currentTarget.style.color = "rgba(198,167,94,0.85)"; }}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {blends.map((_, i) => (
              <button key={i} onClick={() => navigate(i)} style={{
                width: i === current ? 28 : 6,
                height: 2,
                background: i === current ? "#C6A75E" : "rgba(198,167,94,0.25)",
                transition: "all 0.35s",
                cursor: "pointer",
              }} />
            ))}
          </div>
          <button onClick={next} className="w-10 h-10 flex items-center justify-center border transition-all duration-300"
            style={{ borderColor: "rgba(198,167,94,0.25)", color: "rgba(198,167,94,0.85)" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#C6A75E"; e.currentTarget.style.color = "#C6A75E"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(198,167,94,0.25)"; e.currentTarget.style.color = "rgba(198,167,94,0.85)"; }}>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Tagline bottom right */}
        <div className="absolute bottom-12 right-6 md:right-12 hidden md:block">
          <p className="serif text-xs italic" style={{ color: "rgba(198,167,94,0.3)", letterSpacing: "0.1em" }}>
            True Coffee. True People. True Purpose.
          </p>
        </div>
      </div>
    </div>
  );
}