import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const blends = [
  {
    id: "morning-magic",
    name: "Morning Magic",
    time: "Morning",
    roast: "Medium–Dark Roast",
    intensity: 5,
    profile:
      "Morning Magic is bold by design. Roasted to a medium–dark profile to unlock deep caramelisation while preserving structure. It delivers strength without bitterness — powerful, controlled, confident.",
    flavourNotes: ["Dark chocolate", "Toasted almond", "Caramelised sugar", "Subtle smoky finish"],
    body: "Full-bodied",
    acidity: "Low–medium acidity",
    finish: "Long, lingering finish",
    brewMethods: ["Espresso", "Moka Pot", "Plunger", "Strong Filter"],
    brewGuide: [
      { method: "Espresso", lines: ["18g in → 36g out", "25–30 seconds", "92–94°C"] },
      { method: "Filter", lines: ["20g → 300ml", "3 minutes", "Medium grind"] },
      { method: "Plunger", lines: ["30g → 500ml", "4 minutes", "Coarse grind"] },
      { method: "Moka Pot", lines: ["Medium-fine grind", "Medium heat", "Remove once flowing steadily"] },
      { method: "Cold Brew", lines: ["100g → 1L", "24–48 hours", "Coarse grind"] },
    ],
    whoItsFor: "For early risers. Builders. Decision-makers.\nFuel for those who start before the world does.",
    bestFor: "Morning Coffee / Espresso",
  },
  {
    id: "midday-roast",
    name: "Midday Roast",
    time: "Midday",
    roast: "Medium Roast",
    intensity: 4,
    profile:
      "Midday Roast is balanced and structured. A classic medium roast that highlights sweetness while maintaining clarity and smoothness. Steady energy without heaviness.",
    flavourNotes: ["Milk chocolate", "Marzipan", "Soft citrus brightness", "Light brown sugar finish"],
    body: "Medium body",
    acidity: "Balanced acidity",
    finish: "Clean finish",
    brewMethods: ["Espresso", "Filter", "Plunger", "Moka Pot", "Pour Over"],
    brewGuide: [
      { method: "Espresso", lines: ["18g in → 36g out", "26–30 seconds"] },
      { method: "Filter", lines: ["18g → 300ml", "2:45–3 minutes"] },
      { method: "Plunger", lines: ["28g → 500ml", "4 minutes"] },
      { method: "Moka Pot", lines: ["Medium-fine grind", "Medium heat"] },
      { method: "Pour Over", lines: ["20g → 320ml", "2:30–3 minutes"] },
    ],
    whoItsFor: "For focus. For momentum.\nThe coffee that carries you through the work.",
    bestFor: "Everyday balance",
  },
  {
    id: "sunset-roast",
    name: "Sunset Roast",
    time: "Afternoon",
    roast: "Medium Roast",
    intensity: 3,
    profile:
      "Sunset Roast is smooth and rounded. A medium roast crafted for late afternoon transition — warm, relaxed, easy drinking.",
    flavourNotes: ["Cocoa butter", "Caramelised sugar", "Spiced toffee apple", "Hint of cardamom"],
    body: "Medium-smooth body",
    acidity: "Low acidity",
    finish: "Comforting finish",
    brewMethods: ["Filter", "Plunger", "Moka Pot", "Cold Brew"],
    brewGuide: [
      { method: "Filter", lines: ["18g → 300ml", "3 minutes"] },
      { method: "Plunger", lines: ["28g → 500ml", "4 minutes"] },
      { method: "Moka Pot", lines: ["Medium-fine grind", "Low–medium heat"] },
      { method: "Cold Brew", lines: ["90g → 1L", "14–16 hours"] },
    ],
    whoItsFor: "For unwinding without slowing down.\nThe bridge between productivity and pause.",
    bestFor: "Late afternoon",
  },
  {
    id: "evening-bliss",
    name: "Evening Bliss",
    time: "Evening",
    roast: "Medium Roast",
    intensity: 3,
    profile:
      "Evening Bliss is refined and calming. A smooth medium roast designed for after-dinner enjoyment — comforting without overpowering.",
    flavourNotes: ["Cocoa", "Soft toffee", "Soft vanilla undertone"],
    body: "Silky medium body",
    acidity: "Medium acidity",
    finish: "Smooth finish",
    brewMethods: ["Plunger", "Filter", "Moka Pot", "Espresso (smooth)"],
    brewGuide: [
      { method: "Plunger", lines: ["28g → 500ml", "4 minutes"] },
      { method: "Filter", lines: ["18g → 300ml", "3 minutes"] },
      { method: "Moka Pot", lines: ["Medium-fine grind", "Low heat"] },
      { method: "Espresso (smooth style)", lines: ["18g in → 34g out", "27–30 seconds"] },
    ],
    whoItsFor: "For evenings that slow down.\nFor conversation. For reflection.",
    bestFor: "After dinner",
  },
];

const comparisonRows = [
  { label: "Roast", keys: blends.map(b => b.roast) },
  { label: "Intensity", keys: blends.map(b => `${b.intensity}/5`) },
  { label: "Body", keys: blends.map(b => b.body.split(" ")[0]) },
  { label: "Acidity", keys: blends.map(b => b.acidity.split(" ")[0]) },
  { label: "Best For", keys: blends.map(b => b.bestFor) },
];

function IntensityDots({ value }) {
  return (
    <div className="flex gap-1.5 items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ background: i < value ? "#C6A75E" : "rgba(198,167,94,0.2)" }}
        />
      ))}
      <span className="text-xs ml-1" style={{ color: "rgba(198,167,94,0.8)" }}>{value}/5</span>
    </div>
  );
}

export default function Menu() {
  const [active, setActive] = useState(blends[0].id);
  const blend = blends.find(b => b.id === active);

  return (
    <div className="min-h-screen" style={{ background: "#0F0F0F" }}>

      {/* Hero */}
      <div className="relative pt-32 pb-16 md:pt-40 md:pb-20 text-center px-6">
        <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "rgba(198,167,94,0.75)" }}>
          The Range
        </p>
        <h1 className="text-4xl md:text-6xl font-light mb-4" style={{ color: "rgba(232,223,208,0.95)", letterSpacing: "-0.01em" }}>
          Our <span className="serif italic" style={{ color: "#C6A75E" }}>Blends</span>
        </h1>
        <p className="text-sm leading-relaxed mx-auto" style={{ color: "rgba(232,223,208,0.6)", maxWidth: "480px" }}>
          Four coffees. Four moments. Each roasted with intention for the time of day it was made for.
        </p>
        <div className="mt-8 w-12 h-px mx-auto" style={{ background: "linear-gradient(to right, transparent, #C6A75E, transparent)" }} />
      </div>

      {/* Blend tabs */}
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="flex gap-2 md:gap-0 overflow-x-auto pb-2 md:pb-0 md:grid md:grid-cols-4 border-b" style={{ borderColor: "rgba(198,167,94,0.12)" }}>
          {blends.map((b) => (
            <button
              key={b.id}
              onClick={() => setActive(b.id)}
              className="flex-shrink-0 md:flex-shrink relative px-4 md:px-6 py-4 text-left transition-colors duration-300"
              style={{ color: active === b.id ? "#C6A75E" : "rgba(232,223,208,0.5)" }}
            >
              <span className="block text-xs uppercase tracking-[0.2em] mb-0.5" style={{ color: active === b.id ? "rgba(198,167,94,0.8)" : "rgba(232,223,208,0.3)" }}>
                {b.time}
              </span>
              <span className="text-sm font-medium whitespace-nowrap">{b.name}</span>
              {active === b.id && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ background: "#C6A75E" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Blend detail */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <div className="grid md:grid-cols-2 gap-12 md:gap-16">

              {/* Left column */}
              <div>
                <div className="mb-8">
                  <p className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: "rgba(198,167,94,0.75)" }}>
                    {blend.roast}
                  </p>
                  <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ color: "rgba(232,223,208,0.95)" }}>
                    {blend.name}
                  </h2>
                  <IntensityDots value={blend.intensity} />
                </div>

                {/* Profile */}
                <div className="mb-8">
                  <h3 className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "rgba(198,167,94,0.75)" }}>
                    Roast Profile
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(232,223,208,0.8)" }}>
                    {blend.profile}
                  </p>
                </div>

                {/* Flavour notes */}
                <div className="mb-8">
                  <h3 className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: "rgba(198,167,94,0.75)" }}>
                    Flavour Notes
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {blend.flavourNotes.map((note) => (
                      <span
                        key={note}
                        className="px-3 py-1.5 text-xs uppercase tracking-[0.15em]"
                        style={{ border: "1px solid rgba(198,167,94,0.25)", color: "rgba(232,223,208,0.8)" }}
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Body & Acidity */}
                <div className="mb-8">
                  <h3 className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "rgba(198,167,94,0.75)" }}>
                    Body &amp; Acidity
                  </h3>
                  <div className="space-y-1.5">
                    {[blend.body, blend.acidity, blend.finish].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#C6A75E" }} />
                        <span className="text-sm" style={{ color: "rgba(232,223,208,0.8)" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Best brewing methods */}
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "rgba(198,167,94,0.75)" }}>
                    Best Brewing Methods
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {blend.brewMethods.map((m) => (
                      <span
                        key={m}
                        className="px-3 py-1 text-xs"
                        style={{ background: "rgba(198,167,94,0.08)", color: "#C6A75E", border: "1px solid rgba(198,167,94,0.2)" }}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div>
                {/* Who it's for */}
                <div className="mb-10 p-6" style={{ border: "1px solid rgba(198,167,94,0.15)", background: "rgba(198,167,94,0.04)" }}>
                  <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "rgba(198,167,94,0.75)" }}>
                    Who It&apos;s For
                  </p>
                  <p className="text-sm leading-relaxed serif italic" style={{ color: "rgba(232,223,208,0.85)" }}>
                    {blend.whoItsFor.split("\n").map((line, i) => (
                      <span key={i}>{line}{i < blend.whoItsFor.split("\n").length - 1 && <br />}</span>
                    ))}
                  </p>
                </div>

                {/* Brew guide */}
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: "rgba(198,167,94,0.75)" }}>
                    Brew Guide
                  </h3>
                  <div className="space-y-3">
                    {blend.brewGuide.map((guide) => (
                      <div
                        key={guide.method}
                        className="p-4"
                        style={{ borderBottom: "1px solid rgba(198,167,94,0.1)" }}
                      >
                        <p className="text-xs uppercase tracking-[0.18em] mb-2" style={{ color: "#C6A75E" }}>
                          {guide.method}
                        </p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1">
                          {guide.lines.map((line) => (
                            <span key={line} className="text-xs" style={{ color: "rgba(232,223,208,0.75)" }}>
                              {line}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Comparison table */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-16 border-t" style={{ borderColor: "rgba(198,167,94,0.1)" }}>
        <p className="text-xs uppercase tracking-[0.3em] mb-8 text-center" style={{ color: "rgba(198,167,94,0.75)" }}>
          Range Overview
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(198,167,94,0.2)" }}>
                <th className="pb-4 text-left text-xs uppercase tracking-[0.18em] font-normal w-24" style={{ color: "rgba(198,167,94,0.75)" }} />
                {blends.map((b) => (
                  <th
                    key={b.id}
                    className="pb-4 text-left text-xs uppercase tracking-[0.15em] font-normal"
                    style={{ color: active === b.id ? "#C6A75E" : "rgba(232,223,208,0.8)" }}
                  >
                    {b.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, ri) => (
                <tr key={row.label} style={{ borderBottom: ri < comparisonRows.length - 1 ? "1px solid rgba(198,167,94,0.08)" : "none" }}>
                  <td className="py-3.5 text-xs uppercase tracking-[0.15em]" style={{ color: "rgba(198,167,94,0.6)" }}>
                    {row.label}
                  </td>
                  {row.keys.map((val, i) => (
                    <td key={i} className="py-3.5 text-xs pr-4" style={{ color: "rgba(232,223,208,0.75)" }}>
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
