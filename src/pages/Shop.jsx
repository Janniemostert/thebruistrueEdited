import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import ProductCard from "../components/shop/ProductCard";
import { useCart } from "../components/shop/CartContext";

const categories = [
  { id: "all", label: "All Products" },
  { id: "beans", label: "Whole Beans" },
  { id: "ground", label: "Ground Coffee" },
  { id: "bundles", label: "Bundles" },
  { id: "merch", label: "Merch" },
];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { cart } = useCart();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => base44.entities.Product.filter({ active: true }, "-created_date"),
  });

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category === activeCategory);



  return (
    <div className="min-h-screen" style={{ background: "#0F0F0F" }}>
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&q=80"
          alt="Coffee shop"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.25)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(15,15,15,0.6), rgba(15,15,15,0.95))" }} />
        <div className="absolute inset-0 flex items-end justify-start max-w-7xl mx-auto px-6 md:px-12 pb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: "rgba(198,167,94,0.9)" }}>
              The Bru Is True
            </p>
            <h1 className="serif" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 300, color: "#E8DFD0", fontStyle: "italic" }}>
              Our Shop
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="px-5 py-2 text-xs uppercase tracking-[0.15em] transition-all duration-300 border"
              style={{
                borderColor: activeCategory === cat.id ? "#C6A75E" : "rgba(198,167,94,0.15)",
                color: activeCategory === cat.id ? "#C6A75E" : "rgba(232,223,208,0.4)",
                background: activeCategory === cat.id ? "rgba(198,167,94,0.06)" : "transparent",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products grid */}
        {isLoading ? (
          <div className="text-center py-20 text-sm uppercase tracking-[0.2em]" style={{ color: "rgba(232,223,208,0.2)" }}>
            Loading...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-sm uppercase tracking-[0.2em]" style={{ color: "rgba(232,223,208,0.2)" }}>
            No products found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}