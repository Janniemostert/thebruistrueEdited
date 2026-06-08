import { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const retailLinks = [
  { label: "Home", page: "Home" },
  { label: "Blends", page: "Menu" },
  // { label: "Recipes", page: "Recipes" },
  // { label: "Loyalty", page: "Loyalty" },
];

const portfolioLinks = [
  { label: "Our Brands", page: "Brands" },
  { label: "White Label", page: "WhiteLabel" },
  { label: "About", page: "About" },
  { label: "Contact", page: "Contact" },
];

const shopHref = "https://thebruistrue.coffee";

const linkStyle = (isActive = false) => ({
  color: isActive ? "#C6A75E" : "rgba(232,223,208,0.8)",
  paddingBottom: "3px",
  borderBottom: isActive ? "1px solid #C6A75E" : "1px solid transparent",
});

export default function Navbar({ currentPage }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ background: "rgba(15,15,15,0.92)", borderColor: "rgba(198,167,94,0.12)", backdropFilter: "blur(12px)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Mobile row — burger left, logo center, shop right */}
        <div className="md:hidden flex items-center justify-between h-16">
          <button
            onClick={() => setOpen(!open)}
            className="p-1 transition-colors"
            style={{ color: "rgba(232,223,208,0.8)" }}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link to={createPageUrl("Home")} className="flex items-center gap-3">
            <div className="w-px h-6" style={{ background: "linear-gradient(to bottom, transparent, #C6A75E, transparent)" }} />
            <img src="/bit.png" alt="The Bru Is True Logo" className="h-8 w-auto object-contain" />
            <div className="w-px h-6" style={{ background: "linear-gradient(to bottom, transparent, #C6A75E, transparent)" }} />
          </Link>

          <a
            href={shopHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-[0.15em] transition-colors"
            style={{ color: "rgba(232,223,208,0.8)" }}
            onMouseEnter={e => e.currentTarget.style.color = "#C6A75E"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(232,223,208,0.8)"}
          >
            Shop
          </a>
        </div>

        {/* Desktop — logo centered on top, links centered below */}
        <div className="hidden md:block">
          {/* Row 1: Logo */}
          <div className="flex justify-center pt-5 pb-3">
            <Link to={createPageUrl("Home")} className="flex items-center gap-3">
              <div className="w-px h-6" style={{ background: "linear-gradient(to bottom, transparent, #C6A75E, transparent)" }} />
              <img src="/bit.png" alt="The Bru Is True Logo" className="h-10 w-auto object-contain" />
              <div className="w-px h-6" style={{ background: "linear-gradient(to bottom, transparent, #C6A75E, transparent)" }} />
            </Link>
          </div>

          {/* Row 2: Nav links centered, Shop at far right */}
          <div className="relative flex items-center justify-center pb-4">
            <div className="flex items-center gap-7">
              {retailLinks.map((link) => (
                <Link
                  key={link.page}
                  to={createPageUrl(link.page)}
                  className="text-xs uppercase tracking-[0.18em] transition-colors duration-300"
                  style={linkStyle(currentPage === link.page)}
                  onMouseEnter={e => e.currentTarget.style.color = "#C6A75E"}
                  onMouseLeave={e => e.currentTarget.style.color = currentPage === link.page ? "#C6A75E" : "rgba(232,223,208,0.8)"}
                >
                  {link.label}
                </Link>
              ))}

              {portfolioLinks.map((link) => (
                <Link
                  key={link.page}
                  to={createPageUrl(link.page)}
                  className="text-xs uppercase tracking-[0.18em] transition-colors duration-300"
                  style={linkStyle(currentPage === link.page)}
                  onMouseEnter={e => e.currentTarget.style.color = "#C6A75E"}
                  onMouseLeave={e => e.currentTarget.style.color = currentPage === link.page ? "#C6A75E" : "rgba(232,223,208,0.8)"}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Shop — anchored to the far right */}
            <a
              href={shopHref}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-0 text-xs uppercase tracking-[0.18em] transition-colors duration-300"
              style={{ color: "rgba(232,223,208,0.8)", paddingBottom: "3px", borderBottom: "1px solid transparent" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#C6A75E"; e.currentTarget.style.borderBottomColor = "#C6A75E"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(232,223,208,0.8)"; e.currentTarget.style.borderBottomColor = "transparent"; }}
            >
              Shop ↗
            </a>
          </div>
        </div>

      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t"
            style={{ borderColor: "rgba(198,167,94,0.1)", background: "#0F0F0F" }}
          >
            <div className="px-6 py-6">
              <p className="text-xs uppercase tracking-[0.25em] mb-4" style={{ color: "rgba(198,167,94,0.75)" }}>Retail</p>
              <div className="space-y-1 mb-6">
                {retailLinks.map((link) => (
                  <Link
                    key={link.page}
                    to={createPageUrl(link.page)}
                    onClick={() => setOpen(false)}
                    className="py-3 text-sm uppercase tracking-[0.15em] transition-colors flex items-center gap-2"
                    style={{ color: currentPage === link.page ? "#C6A75E" : "rgba(232,223,208,0.8)", display: "flex" }}
                  >
                    {currentPage === link.page && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#C6A75E" }} />}
                    {link.label}
                  </Link>
                ))}
                <a
                  href={shopHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm uppercase tracking-[0.15em] transition-colors"
                  style={{ color: "rgba(232,223,208,0.8)" }}
                >
                  Shop ↗
                </a>
              </div>
              <div className="w-full h-px mb-6" style={{ background: "rgba(198,167,94,0.1)" }} />
              <p className="text-xs uppercase tracking-[0.25em] mb-4" style={{ color: "rgba(198,167,94,0.75)" }}>Portfolio &amp; B2B</p>
              <div className="space-y-1">
                {portfolioLinks.map((link) => (
                  <Link
                    key={link.page}
                    to={createPageUrl(link.page)}
                    onClick={() => setOpen(false)}
                    className="py-3 text-sm uppercase tracking-[0.15em] transition-colors flex items-center gap-2"
                    style={{ color: currentPage === link.page ? "#C6A75E" : "rgba(232,223,208,0.8)", display: "flex" }}
                  >
                    {currentPage === link.page && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#C6A75E" }} />}
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
