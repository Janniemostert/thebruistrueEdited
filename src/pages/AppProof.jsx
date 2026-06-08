import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";

const SECTIONS = [
  {
    title: "Brand Identity",
    items: [
      { label: "Brand Name", value: "The Bru Is True Coffee" },
      { label: "Tagline", value: "From green bean to great coffee." },
      { label: "Sub-tagline", value: "True Coffee. True People. True Purpose." },
      { label: "Theme", value: "Dark luxury — Matte black (#0F0F0F) with gold (#C6A75E) accents" },
      { label: "Typography", value: "Cormorant Garamond (serif) + Inter (sans)" },
    ]
  },
  {
    title: "Contact Information",
    items: [
      { label: "Address", value: "Monte Vista, Cape Town" },
      { label: "Phone", value: "+27 21 555 BREW" },
      { label: "Email", value: "hello@thebruistrue.com" },
      { label: "Hours (Mon–Fri)", value: "6am – 7pm" },
      { label: "Hours (Sat–Sun)", value: "7am – 8pm" },
    ]
  },
  {
    title: "Navigation / Pages",
    items: [
      { label: "Home", value: "Hero carousel, Featured blends, Values, Testimonials, CTA" },
      { label: "Shop", value: "Product grid with filter by category" },
      { label: "Menu", value: "Café menu — Espresso, Brewed, Cold, Bites" },
      { label: "Recipes", value: "Community recipes with submit + like + comments" },
      { label: "Loyalty", value: "Points system, rewards, referrals" },
      { label: "About", value: "Story, mission, timeline, team" },
      { label: "Contact", value: "Contact form + info" },
    ]
  },
  {
    title: "Blends (Hero Carousel)",
    items: [
      { label: "Morning Magic", value: "Medium-Dark Roast · Intensity 5/5" },
      { label: "Midday Roast", value: "Medium Roast · Intensity 5/5" },
      { label: "Sunset Roast", value: "Medium Roast · Intensity 4/5" },
      { label: "Evening Bliss", value: "Medium Roast · Intensity 3/5" },
    ]
  },
  {
    title: "Menu Pricing",
    items: [
      { label: "Espresso", value: "$3.50" },
      { label: "Americano", value: "$4.00" },
      { label: "Cappuccino", value: "$5.00" },
      { label: "Latte", value: "$5.50" },
      { label: "Flat White", value: "$5.50" },
      { label: "Cold Brew", value: "$5.50" },
      { label: "Pour Over", value: "$5.00" },
      { label: "Avocado Toast", value: "$9.00" },
      { label: "Açaí Bowl", value: "$10.00" },
    ]
  },
  {
    title: "About Page — Timeline",
    items: [
      { label: "2023", value: "The Idea Brews — dream born from honest coffee conversations" },
      { label: "2024", value: "Doors Open — first location on Brew Street" },
      { label: "2024", value: "Direct Trade — relationships with Ethiopian & Colombian farmers" },
      { label: "2025", value: "Growing Community — community of coffee lovers expands" },
    ]
  },
  {
    title: "Items to Review / Flag",
    items: [
      { label: "⚠️ About page — 'Brew Street'", value: "Still references old address. Update if needed." },
      { label: "⚠️ Contact page — Portland address", value: "Shows '123 Brew Street, Portland, OR 97201'. Update to Monte Vista, Cape Town." },
      { label: "⚠️ Contact page — Phone", value: "Shows '(503) 555-BREW'. Update to +27 21 555 BREW if needed." },
      { label: "⚠️ Menu — Dollar prices", value: "Menu uses $ pricing. Confirm if ZAR (R) is preferred." },
      { label: "⚠️ Team names", value: "Alex, Maya, Jordan, Sam — placeholders. Replace with real team if needed." },
    ]
  },
];

export default function AppProof() {
  const { data: products = [] } = useQuery({
    queryKey: ["products-proof"],
    queryFn: () => base44.entities.Product.filter({}, "-created_date", 50),
  });

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen" style={{ background: "#0F0F0F", color: "#E8DFD0" }}>
      <style>{`
        @media print {
          body { background: white !important; color: black !important; }
          .no-print { display: none !important; }
          .print-page { background: white !important; color: black !important; }
          .print-section { border: 1px solid #ddd !important; margin-bottom: 16px !important; page-break-inside: avoid; }
        }
      `}</style>

      <div className="max-w-4xl mx-auto px-6 py-12 print-page">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <p className="serif text-4xl mb-1" style={{ color: "#C6A75E", fontStyle: "italic", fontWeight: 300 }}>
              The Bru Is True
            </p>
            <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, #C6A75E, transparent)" }} />
            <p className="text-xs uppercase tracking-[0.3em] mt-2" style={{ color: "rgba(198,167,94,0.85)" }}>— COFFEE —</p>
          </div>
          <h1 className="text-2xl font-light mb-2" style={{ color: "#E8DFD0" }}>App Content Proof</h1>
          <p className="text-sm" style={{ color: "rgba(232,223,208,0.4)" }}>
            Generated {new Date().toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>

        {/* Sections */}
        {SECTIONS.map((section) => (
          <div key={section.title} className="mb-8 print-section" style={{ border: "1px solid rgba(198,167,94,0.15)", borderRadius: 4 }}>
            <div className="px-5 py-3" style={{ borderBottom: "1px solid rgba(198,167,94,0.12)", background: "rgba(198,167,94,0.05)" }}>
              <h2 className="text-xs uppercase tracking-[0.25em]" style={{ color: "#C6A75E" }}>{section.title}</h2>
            </div>
            <div className="divide-y" style={{ borderColor: "rgba(198,167,94,0.06)" }}>
              {section.items.map((item) => (
                <div key={item.label} className="grid grid-cols-5 px-5 py-3 gap-4">
                  <div className="col-span-2 text-sm font-medium" style={{ color: "rgba(232,223,208,0.55)" }}>{item.label}</div>
                  <div className="col-span-3 text-sm" style={{ color: item.label.startsWith("⚠️") ? "#E8A040" : "#E8DFD0" }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Products from DB */}
        <div className="mb-8 print-section" style={{ border: "1px solid rgba(198,167,94,0.15)", borderRadius: 4 }}>
          <div className="px-5 py-3" style={{ borderBottom: "1px solid rgba(198,167,94,0.12)", background: "rgba(198,167,94,0.05)" }}>
            <h2 className="text-xs uppercase tracking-[0.25em]" style={{ color: "#C6A75E" }}>Shop Products (Live from Database)</h2>
          </div>
          {products.length === 0 ? (
            <p className="px-5 py-4 text-sm" style={{ color: "rgba(232,223,208,0.75)" }}>Loading products...</p>
          ) : (
            <div className="divide-y" style={{ borderColor: "rgba(198,167,94,0.06)" }}>
              {products.map((p) => (
                <div key={p.id} className="grid grid-cols-5 px-5 py-3 gap-4">
                  <div className="col-span-2 text-sm font-medium" style={{ color: "rgba(232,223,208,0.55)" }}>
                    {p.name}
                    <span className="ml-2 text-xs" style={{ color: "rgba(232,223,208,0.75)" }}>[{p.category}]</span>
                  </div>
                  <div className="col-span-3 text-sm" style={{ color: "#E8DFD0" }}>
                    R{p.price} · {p.roast_level || "—"} roast · {p.weight || "—"} · Stock: {p.stock ?? "—"} · {p.active ? "✓ Active" : "✗ Inactive"} {p.featured ? "· ★ Featured" : ""}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Signature line */}
        <div className="mt-12 pt-8 border-t grid grid-cols-3 gap-8" style={{ borderColor: "rgba(198,167,94,0.12)" }}>
          {["Reviewed by", "Approved by", "Date"].map((label) => (
            <div key={label}>
              <div className="h-px mb-2" style={{ background: "rgba(198,167,94,0.2)" }} />
              <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "rgba(198,167,94,0.75)" }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Print button */}
        <div className="mt-8 flex justify-center no-print">
          <button
            onClick={handlePrint}
            className="px-10 py-3.5 text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300"
            style={{ background: "#C6A75E", color: "#0F0F0F" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#D4B870"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(198,167,94,0.35)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#C6A75E"; e.currentTarget.style.boxShadow = "none"; }}
          >
            Print / Save as PDF
          </button>
        </div>
      </div>
    </div>
  );
}