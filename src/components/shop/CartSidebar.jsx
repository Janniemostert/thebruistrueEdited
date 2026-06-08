import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { motion, AnimatePresence } from "framer-motion";

export default function CartSidebar({ open, onClose }) {
  const { cart, updateQuantity, removeFromCart, getTotal } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50"
            style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md flex flex-col"
            style={{ background: "#161616", borderLeft: "1px solid rgba(198,167,94,0.12)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-7 py-6" style={{ borderBottom: "1px solid rgba(198,167,94,0.08)" }}>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] mb-1" style={{ color: "rgba(198,167,94,0.85)" }}>Your</p>
                <h2 className="serif text-xl" style={{ color: "#E8DFD0", fontStyle: "italic" }}>Cart</h2>
              </div>
              <button onClick={onClose} className="w-9 h-9 flex items-center justify-center border transition-colors"
                style={{ borderColor: "rgba(198,167,94,0.15)", color: "rgba(232,223,208,0.4)" }}
                onMouseEnter={e => e.currentTarget.style.color = "#C6A75E"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(232,223,208,0.4)"}>
                <X className="h-4 w-4" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-7">
                <ShoppingBag className="h-12 w-12 mb-4" style={{ color: "rgba(198,167,94,0.2)" }} />
                <p className="text-sm mb-6" style={{ color: "rgba(232,223,208,0.75)" }}>Your cart is empty</p>
                <button onClick={onClose} className="px-6 py-3 text-xs uppercase tracking-[0.2em] transition-all"
                  style={{ border: "1px solid rgba(198,167,94,0.3)", color: "#C6A75E" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(198,167,94,0.06)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Items */}
                <div className="flex-1 overflow-y-auto px-7 py-6 space-y-6">
                  {cart.map((item) => (
                    <div key={`${item.product.id}-${item.grindOption}`} className="flex gap-4 pb-6" style={{ borderBottom: "1px solid rgba(198,167,94,0.07)" }}>
                      <div style={{ width: 72, height: 72, background: "#111", flexShrink: 0 }}>
                        <img src={item.product.image_url || "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=200&q=80"}
                          alt={item.product.name} className="w-full h-full object-contain p-2" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="serif text-sm mb-0.5" style={{ color: "#E8DFD0", fontStyle: "italic" }}>{item.product.name}</h4>
                        {item.grindOption && (
                          <p className="text-xs uppercase tracking-[0.1em] mb-1" style={{ color: "rgba(198,167,94,0.75)" }}>{item.grindOption}</p>
                        )}
                        <p className="text-sm mb-3" style={{ color: "#C6A75E" }}>R{item.product.price.toFixed(2)}</p>

                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQuantity(item.product.id, item.grindOption, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center border transition-colors"
                            style={{ borderColor: "rgba(198,167,94,0.2)", color: "rgba(232,223,208,0.4)" }}>
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-xs" style={{ color: "#E8DFD0" }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.grindOption, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center border transition-colors"
                            style={{ borderColor: "rgba(198,167,94,0.2)", color: "rgba(232,223,208,0.4)" }}>
                            <Plus className="h-3 w-3" />
                          </button>
                          <button onClick={() => removeFromCart(item.product.id, item.grindOption)}
                            className="ml-auto text-xs uppercase tracking-[0.1em] transition-colors"
                            style={{ color: "rgba(232,223,208,0.2)" }}
                            onMouseEnter={e => e.currentTarget.style.color = "#C6A75E"}
                            onMouseLeave={e => e.currentTarget.style.color = "rgba(232,223,208,0.2)"}>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-7 py-6" style={{ borderTop: "1px solid rgba(198,167,94,0.08)" }}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs uppercase tracking-[0.2em]" style={{ color: "rgba(232,223,208,0.4)" }}>Subtotal</span>
                    <span className="text-lg serif" style={{ color: "#C6A75E" }}>R{getTotal().toFixed(2)}</span>
                  </div>
                  <p className="text-xs mb-6" style={{ color: "rgba(232,223,208,0.2)" }}>Shipping calculated at checkout</p>
                  <Link to={createPageUrl("Checkout")} onClick={onClose}>
                    <button className="w-full py-4 text-sm uppercase tracking-[0.2em] font-medium transition-all duration-300"
                      style={{ background: "#C6A75E", color: "#0F0F0F" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#D4B870"}
                      onMouseLeave={e => e.currentTarget.style.background = "#C6A75E"}>
                      Proceed to Checkout
                    </button>
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}