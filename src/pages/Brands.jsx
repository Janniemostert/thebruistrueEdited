import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const brands = [
  {
    name: "The Bru Is True",
    tagline: "Honest coffee, truthful flavor",
    description: "Our flagship brand delivering authentic craft coffee experiences with bold character and uncompromising quality. Every cup tells the truth.",
    roast: "Medium – Dark",
    character: "Bold · Honest · Craft",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800",
    accent: "#C6A75E",
  },
  {
    name: "Osabor",
    tagline: "Strength in every sip",
    description: "Rich, robust blends for those who demand intensity and depth. Crafted for the bold coffee enthusiast who never settles for less.",
    roast: "Dark",
    character: "Intense · Robust · Powerful",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800",
    accent: "#A65B2A",
  },
  {
    name: "Raven",
    tagline: "Dark roasts, deeper stories",
    description: "Mystery meets mastery in our darkest, most complex roasts. For those who appreciate the art of the dark side of coffee.",
    roast: "Extra Dark",
    character: "Mysterious · Complex · Dark",
    image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800",
    accent: "#6B7280",
  },
  {
    name: "Jax",
    tagline: "Energy reimagined",
    description: "Bold, energetic, and unapologetically modern. Coffee that matches your pace and amplifies your day from first light to last mile.",
    roast: "Medium",
    character: "Energetic · Modern · Bold",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800",
    accent: "#2563EB",
  },
];

export default function Brands() {
  return (
    <div className="min-h-screen" style={{ background: "#0F0F0F" }}>
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1600"
          alt="Brands"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.2)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(15,15,15,0.5), rgba(15,15,15,0.97))" }} />
        <div className="absolute inset-0 flex items-end justify-start max-w-7xl mx-auto px-6 md:px-12 pb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: "rgba(198,167,94,0.9)" }}>
              Our Portfolio
            </p>
            <h1 className="serif" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 300, color: "#E8DFD0", fontStyle: "italic" }}>
              Our Brands
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm max-w-2xl mb-20"
          style={{ color: "rgba(232,223,208,0.8)", lineHeight: 1.8 }}
        >
          Four distinct brands, one unified commitment to exceptional coffee experiences. Each brand carries its own character, story, and soul — all rooted in our passion for the craft.
        </motion.p>

        <div className="space-y-24">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}
            >
              <div className="relative overflow-hidden" style={{ direction: "ltr" }}>
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-72 md:h-96 object-cover"
                  style={{ filter: "brightness(0.7) saturate(0.8)" }}
                />
                <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${brand.accent}15, transparent)` }} />
                <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: brand.accent }} />
              </div>

              <div style={{ direction: "ltr" }}>
                <div className="w-8 h-px mb-6" style={{ background: brand.accent }} />
                <p className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: brand.accent, opacity: 0.8 }}>
                  {brand.character}
                </p>
                <h2 className="serif mb-3" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "#E8DFD0", fontStyle: "italic" }}>
                  {brand.name}
                </h2>
                <p className="serif text-xl mb-6" style={{ color: brand.accent, fontWeight: 300, fontStyle: "italic" }}>
                  {brand.tagline}
                </p>
                <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(232,223,208,0.55)" }}>
                  {brand.description}
                </p>
                <div className="flex items-center gap-6">
                  <span className="text-xs uppercase tracking-[0.2em]" style={{ color: "rgba(232,223,208,0.75)" }}>
                    Roast: <span style={{ color: "rgba(232,223,208,0.85)" }}>{brand.roast}</span>
                  </span>
                  <Link
                    to="/Shop"
                    className="text-xs uppercase tracking-[0.2em] border-b pb-0.5 transition-colors"
                    style={{ color: brand.accent, borderColor: `${brand.accent}40` }}
                  >
                    Shop this brand →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 text-center border-t pt-20"
          style={{ borderColor: "rgba(198,167,94,0.1)" }}
        >
          <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "rgba(198,167,94,0.85)" }}>Wholesale &amp; B2B</p>
          <h3 className="serif mb-6" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 300, color: "#E8DFD0", fontStyle: "italic" }}>
            Want any of these brands for your business?
          </h3>
          <Link
            to="/WhiteLabel"
            className="inline-block px-8 py-3 text-xs uppercase tracking-[0.2em] transition-all border"
            style={{ borderColor: "#C6A75E", color: "#C6A75E" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(198,167,94,0.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
          >
            Explore White Label Services
          </Link>
        </motion.div>
      </div>
    </div>
  );
}