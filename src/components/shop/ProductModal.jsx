import { useState } from "react";
import { X, Plus, Minus, ShoppingCart, RefreshCw } from "lucide-react";
import { useCart } from "./CartContext";
import { motion, AnimatePresence } from "framer-motion";

const grindOptions = [
  { value: "Beans", label: "Beans", icon: "◉" },
  { value: "Filter", label: "Filter", icon: "◎" },
  { value: "Plunger", label: "Plunger", icon: "◎" },
  { value: "Moka", label: "Moka", icon: "◎" },
  { value: "Turkish", label: "Turkish", icon: "◎" },
  { value: "Espresso", label: "Espresso", icon: "◎" },
];

const IntensityDots = ({ level = 3 }) => (
  <div className="flex items-center gap-3">
    <span className="text-xs uppercase tracking-[0.15em]" style={{ color: "rgba(198,167,94,0.35)", fontSize: "10px" }}>Smooth</span>
    <div className="flex gap-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.05 }}
          className="rounded-full" style={{
            width: i < level ? 10 : 7, height: i < level ? 10 : 7,
            background: i < level ? "#C6A75E" : "rgba(198,167,94,0.12)",
            boxShadow: i < level ? "0 0 8px #C6A75E60" : "none",
          }} />
      ))}
    </div>
    <span className="text-xs uppercase tracking-[0.15em]" style={{ color: "rgba(198,167,94,0.35)", fontSize: "10px" }}>Bold</span>
  </div>
);

const roastToIntensity = { light: 2, medium: 3, dark: 4 };

export default function ProductModal({ product, open, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [grindOption, setGrindOption] = useState(null);
  const [subscribe, setSubscribe] = useState(false);
  const [frequency, setFrequency] = useState("4 weeks");
  const { addToCart } = useCart();

  const intensity = roastToIntensity[product?.roast_level] || 3;
  const availableGrinds = product?.grind_options?.length > 0 ? product.grind_options : grindOptions.map(g => g.value);

  const handleAddToCart = () => {
    addToCart(product, quantity, grindOption);
    onClose();
    setQuantity(1);
    setGrindOption(null);
    setSubscribe(false);
  };

  if (!product || !open) return null;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            style={{ background: "#161616", border: "1px solid rgba(198,167,94,0.15)" }}
          >
            {/* Close */}
            <button onClick={onClose} className="absolute top-5 right-5 z-10 w-9 h-9 flex items-center justify-center transition-colors duration-200"
              style={{ color: "rgba(232,223,208,0.75)", border: "1px solid rgba(232,223,208,0.1)" }}
              onMouseEnter={e => e.currentTarget.style.color = "#C6A75E"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(232,223,208,0.75)"}>
              <X className="h-4 w-4" />
            </button>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative" style={{ background: "#111111", aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img
                  src={product.image_url || "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80"}
                  alt={product.name}
                  className="w-full h-full object-contain p-10"
                />
                <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(198,167,94,0.04) 0%, transparent 60%)" }} />
              </div>

              {/* Details */}
              <div className="p-8 md:p-10 flex flex-col gap-6">
                {/* Header */}
                <div>
                  {product.roast_level && (
                    <p className="text-xs uppercase tracking-[0.25em] mb-2" style={{ color: "rgba(198,167,94,0.55)" }}>
                      {product.roast_level} roast
                    </p>
                  )}
                  <h2 className="serif mb-3" style={{ fontSize: "2rem", fontWeight: 300, color: "#E8DFD0", fontStyle: "italic" }}>
                    {product.name}
                  </h2>
                  <p className="text-2xl font-light" style={{ color: "#C6A75E" }}>
                    R{product.price.toFixed(2)}
                    {product.weight && <span className="text-sm ml-2" style={{ color: "rgba(198,167,94,0.75)" }}>{product.weight}</span>}
                  </p>
                </div>

                {/* Intensity */}
                <IntensityDots level={intensity} />

                {/* Description */}
                {product.description && (
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(232,223,208,0.8)" }}>
                    {product.description}
                  </p>
                )}

                {/* Divider */}
                <div style={{ height: 1, background: "linear-gradient(to right, rgba(198,167,94,0.2), transparent)" }} />

                {/* Grind selection */}
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: "rgba(198,167,94,0.85)" }}>
                    Select Grind
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {grindOptions.filter(g => availableGrinds.includes(g.value)).map((g) => (
                      <button
                        key={g.value}
                        onClick={() => setGrindOption(g.value)}
                        className="py-3 px-2 text-xs uppercase tracking-[0.12em] text-center transition-all duration-200 border"
                        style={{
                          borderColor: grindOption === g.value ? "#C6A75E" : "rgba(198,167,94,0.15)",
                          color: grindOption === g.value ? "#C6A75E" : "rgba(232,223,208,0.4)",
                          background: grindOption === g.value ? "rgba(198,167,94,0.06)" : "transparent",
                        }}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-4">
                  <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "rgba(198,167,94,0.85)" }}>Qty</p>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center border transition-colors"
                      style={{ borderColor: "rgba(198,167,94,0.2)", color: "rgba(232,223,208,0.8)" }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = "#C6A75E"}
                      onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(198,167,94,0.2)"}>
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center text-sm" style={{ color: "#E8DFD0" }}>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center border transition-colors"
                      style={{ borderColor: "rgba(198,167,94,0.2)", color: "rgba(232,223,208,0.8)" }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = "#C6A75E"}
                      onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(198,167,94,0.2)"}>
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* Subscribe toggle */}
                <div style={{ border: "1px solid rgba(198,167,94,0.15)", padding: "14px 16px" }}>
                  <label className="flex items-center justify-between cursor-pointer gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em]" style={{ color: subscribe ? "#C6A75E" : "rgba(232,223,208,0.8)" }}>
                        Subscribe & Save 10%
                      </p>
                      {subscribe && (
                        <div className="flex gap-2 mt-2 flex-wrap">
                          {["2 weeks", "4 weeks", "6 weeks"].map(f => (
                            <button key={f} onClick={() => setFrequency(f)}
                              className="text-xs px-3 py-1 border transition-all"
                              style={{
                                borderColor: frequency === f ? "#C6A75E" : "rgba(198,167,94,0.2)",
                                color: frequency === f ? "#C6A75E" : "rgba(232,223,208,0.35)",
                                background: frequency === f ? "rgba(198,167,94,0.06)" : "transparent",
                              }}>
                              Every {f}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <div onClick={() => setSubscribe(!subscribe)}
                      className="w-10 h-5 relative transition-all"
                      style={{ background: subscribe ? "rgba(198,167,94,0.3)" : "rgba(198,167,94,0.1)", border: `1px solid ${subscribe ? "#C6A75E" : "rgba(198,167,94,0.2)"}` }}>
                      <motion.div animate={{ x: subscribe ? 20 : 0 }} transition={{ duration: 0.2 }}
                        className="absolute top-0.5 left-0.5 w-4 h-4"
                        style={{ background: subscribe ? "#C6A75E" : "rgba(198,167,94,0.3)" }} />
                    </div>
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0}
                    className="w-full py-4 text-sm uppercase tracking-[0.2em] font-medium transition-all duration-300"
                    style={{
                      background: product.stock > 0 ? "#C6A75E" : "rgba(198,167,94,0.15)",
                      color: product.stock > 0 ? "#0F0F0F" : "rgba(232,223,208,0.75)",
                    }}
                    onMouseEnter={e => { if (product.stock > 0) e.currentTarget.style.background = "#D4B870"; }}
                    onMouseLeave={e => { if (product.stock > 0) e.currentTarget.style.background = "#C6A75E"; }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <ShoppingCart className="h-4 w-4" />
                      {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}