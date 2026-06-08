import { motion } from "framer-motion";
import { useState } from "react";
import ProductModal from "./ProductModal";

const IntensityDots = ({ level = 3 }) => (
  <div className="flex gap-1.5 items-center">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="rounded-full" style={{
        width: i < level ? 7 : 5, height: i < level ? 7 : 5,
        background: i < level ? "#C6A75E" : "rgba(198,167,94,0.15)",
        boxShadow: i < level ? "0 0 5px #C6A75E40" : "none",
      }} />
    ))}
  </div>
);

const roastToIntensity = { light: 2, medium: 3, dark: 4 };

export default function ProductCard({ product, index }) {
  const [showModal, setShowModal] = useState(false);
  const intensity = roastToIntensity[product.roast_level] || 3;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.06 }}
        className="group cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        {/* Image container */}
        <div
          className="relative overflow-hidden mb-5"
          style={{ aspectRatio: "3/4", background: "#161616" }}
        >
          <img
            src={product.image_url || "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80"}
            alt={product.name}
            className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"
            style={{ boxShadow: "inset 0 0 60px rgba(198,167,94,0.08)" }} />

          {product.featured && (
            <div className="absolute top-4 left-4">
              <span className="text-xs uppercase tracking-[0.15em] px-3 py-1.5"
                style={{ border: "1px solid rgba(198,167,94,0.85)", color: "#C6A75E", background: "rgba(15,15,15,0.85)", backdropFilter: "blur(8px)" }}>
                Featured
              </span>
            </div>
          )}

          {product.stock <= 0 && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(15,15,15,0.7)" }}>
              <span className="text-xs uppercase tracking-[0.2em]" style={{ color: "rgba(232,223,208,0.4)" }}>Out of Stock</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-2">
          {product.roast_level && (
            <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "rgba(198,167,94,0.85)" }}>
              {product.roast_level} roast
            </p>
          )}
          <div className="flex items-start justify-between gap-2">
            <h3 className="serif transition-colors duration-300" style={{ fontSize: "1.1rem", fontStyle: "italic", color: "#E8DFD0" }}
              onMouseEnter={e => e.currentTarget.style.color = "#C6A75E"}
              onMouseLeave={e => e.currentTarget.style.color = "#E8DFD0"}>
              {product.name}
            </h3>
            <span className="text-sm font-medium shrink-0" style={{ color: "#C6A75E" }}>
              R{product.price.toFixed(0)}
            </span>
          </div>
          <IntensityDots level={intensity} />
          {product.weight && (
            <p className="text-xs" style={{ color: "rgba(232,223,208,0.75)" }}>{product.weight}</p>
          )}
        </div>
      </motion.div>

      <ProductModal product={product} open={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}