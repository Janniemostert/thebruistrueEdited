import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  { quote: "Every morning starts with Morning Magic. It's not just coffee — it's a ritual I refuse to break.", author: "Sarah M.", role: "Cape Town" },
  { quote: "The depth of Sunset Roast is unmatched. Chocolate and smoke in perfect harmony. I'm converted.", author: "James K.", role: "Johannesburg" },
  { quote: "Evening Bliss changed how I end my days. Finally a coffee I can drink after 6pm without guilt.", author: "Amara P.", role: "Durban" },
];

export default function TestimonialSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((current + 1) % testimonials.length);

  return (
    <section style={{ background: "#0A0A0A", borderTop: "1px solid rgba(198,167,94,0.06)" }} className="py-24 md:py-36">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <p className="text-xs uppercase tracking-[0.3em] mb-12" style={{ color: "rgba(198,167,94,0.75)" }}>
          What People Say
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5 }}
          >
            <blockquote className="serif mb-8" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 300, fontStyle: "italic", color: "rgba(232,223,208,0.7)", lineHeight: 1.5 }}>
              "{testimonials[current].quote}"
            </blockquote>
            <div>
              <p className="text-sm font-medium" style={{ color: "#C6A75E" }}>{testimonials[current].author}</p>
              <p className="text-xs mt-1 uppercase tracking-[0.2em]" style={{ color: "rgba(232,223,208,0.75)" }}>{testimonials[current].role}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-6 mt-12">
          <button onClick={prev} className="w-10 h-10 flex items-center justify-center border transition-all duration-300" style={{ borderColor: "rgba(198,167,94,0.2)", color: "rgba(198,167,94,0.75)" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#C6A75E"; e.currentTarget.style.color = "#C6A75E"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(198,167,94,0.2)"; e.currentTarget.style.color = "rgba(198,167,94,0.75)"; }}>
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                style={{ width: i === current ? 24 : 6, height: 2, background: i === current ? "#C6A75E" : "rgba(198,167,94,0.2)", transition: "all 0.3s" }}
              />
            ))}
          </div>
          <button onClick={next} className="w-10 h-10 flex items-center justify-center border transition-all duration-300" style={{ borderColor: "rgba(198,167,94,0.2)", color: "rgba(198,167,94,0.75)" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#C6A75E"; e.currentTarget.style.color = "#C6A75E"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(198,167,94,0.2)"; e.currentTarget.style.color = "rgba(198,167,94,0.75)"; }}>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}