import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-32 md:py-44">
      <img
        src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1600&q=80"
        alt="Coffee craftsmanship"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.25)" }}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(15,15,15,0.9) 0%, rgba(15,15,15,0.7) 100%)" }} />

      <div className="relative max-w-4xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs uppercase tracking-[0.35em] mb-6" style={{ color: "rgba(198,167,94,0.9)" }}>
            Start Your Journey
          </p>
          <h2 className="serif mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 300, color: "#E8DFD0", fontStyle: "italic", lineHeight: 1.1 }}>
            Find Your Perfect Cup
          </h2>
          <p className="text-sm leading-relaxed mb-10 mx-auto" style={{ color: "rgba(232,223,208,0.8)", maxWidth: "480px" }}>
            Explore our signature blends — each crafted to match a different moment, mood, and morning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://thebruistrue.coffee"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-sm uppercase tracking-[0.2em] transition-all duration-300"
              style={{ background: "#C6A75E", color: "#0F0F0F" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#D4B870"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#C6A75E"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Shop Now
            </a>
            <Link
              to={createPageUrl("Menu")}
              className="inline-flex items-center justify-center px-8 py-4 text-sm uppercase tracking-[0.2em] border transition-all duration-300"
              style={{ borderColor: "rgba(198,167,94,0.75)", color: "rgba(232,223,208,0.85)" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#C6A75E"; e.currentTarget.style.color = "#C6A75E"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(198,167,94,0.75)"; e.currentTarget.style.color = "rgba(232,223,208,0.85)"; }}
            >
              View Blends
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}