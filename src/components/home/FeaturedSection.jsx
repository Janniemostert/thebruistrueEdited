import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";

const features = [
  {
    name: "Morning Magic",
    roast: "Medium-Dark Roast",
    intensity: 5,
    description: "Bold, rich, and built for sunrise. Every sip a fresh start.",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698dee094c33bdd2a71bf8e8/38272ea2e_Screenshot_20260302_200800_Gallery.jpg",
    tag: "Best Seller",
  },
  {
    name: "Sunset Roast",
    roast: "Medium Roast",
    intensity: 4,
    description: "Warm and bold with chocolate notes and subtle smokiness.",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698dee094c33bdd2a71bf8e8/bd78479dd_Screenshot_20260302_201115_Gallery.jpg",
    tag: "Signature",
  },
  {
    name: "Evening Bliss",
    roast: "Medium Roast",
    intensity: 3,
    description: "A calming cup to ease you into the quiet of the evening.",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698dee094c33bdd2a71bf8e8/3baec08d2_Screenshot_20260302_201132_Gallery.jpg",
    tag: "Fan Favourite",
  },
];

const IntensityRow = ({ level }) => (
  <div className="flex gap-1.5 items-center">
    {Array.from({ length: 5 }).map((_, i) => (
      <div
        key={i}
        className="rounded-full"
        style={{
          width: i < level ? 8 : 5,
          height: i < level ? 8 : 5,
          background: i < level ? "#C6A75E" : "rgba(198,167,94,0.15)",
          boxShadow: i < level ? "0 0 6px #C6A75E50" : "none",
        }}
      />
    ))}
  </div>
);

export default function FeaturedSection() {
  return (
    <section style={{ background: "#0F0F0F", borderTop: "1px solid rgba(198,167,94,0.08)" }} className="py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-20">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "rgba(198,167,94,0.85)" }}>
              Our Collection
            </p>
            <h2 className="serif" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, color: "#E8DFD0", fontStyle: "italic", lineHeight: 1.1 }}>
              Signature Blends
            </h2>
          </div>
          <a
            href="https://thebruistrue.coffee"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 md:mt-0 flex items-center gap-2 text-xs uppercase tracking-[0.2em] transition-colors duration-300"
            style={{ color: "rgba(198,167,94,0.9)" }}
            onMouseEnter={e => e.currentTarget.style.color = "#C6A75E"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(198,167,94,0.9)"}
          >
            View All Products
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div
                className="relative overflow-hidden mb-6"
                style={{ aspectRatio: "3/4", background: "#0D0D0D" }}
              >
                {/* Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at center, rgba(198,167,94,0.1) 0%, transparent 70%)" }} />
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain p-4 transition-transform duration-700"
                  style={{ transform: "scale(1)", filter: "drop-shadow(0 10px 40px rgba(0,0,0,0.6))" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,15,15,0.8) 0%, transparent 60%)" }} />
                
                {/* Tag */}
                <div className="absolute top-4 left-4">
                  <span
                    className="text-xs uppercase tracking-[0.15em] px-3 py-1.5"
                    style={{ border: "1px solid rgba(198,167,94,0.75)", color: "#C6A75E", background: "rgba(15,15,15,0.8)", backdropFilter: "blur(8px)" }}
                  >
                    {item.tag}
                  </span>
                </div>

                {/* Gold glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: "inset 0 0 40px rgba(198,167,94,0.08)" }}
                />
              </div>

              {/* Info */}
              <div>
                <p className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: "rgba(198,167,94,0.85)" }}>
                  {item.roast}
                </p>
                <h3 className="serif text-xl mb-3 transition-colors duration-300" style={{ color: "#E8DFD0", fontStyle: "italic", fontWeight: 400 }}>
                  {item.name}
                </h3>
                <IntensityRow level={item.intensity} />
                <p className="text-sm leading-relaxed mt-3" style={{ color: "rgba(232,223,208,0.4)" }}>
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}