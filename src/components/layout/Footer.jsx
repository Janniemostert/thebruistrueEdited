import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { Instagram, Facebook, MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: "#0A0A0A", borderTop: "1px solid rgba(198,167,94,0.12)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <p className="serif text-3xl" style={{ color: "#C6A75E", fontStyle: "italic", fontWeight: 300 }}>
                The Bru Is True
              </p>
              <div className="mt-2 w-12 h-px" style={{ background: "linear-gradient(to right, #C6A75E, transparent)" }} />
            </div>
            <p className="text-sm leading-relaxed max-w-sm mb-6" style={{ color: "rgba(232,223,208,0.35)" }}>
              Honestly sourced. Carefully roasted. Passionately brewed.<br />
              Every cup tells a story of truth and dedication.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full flex items-center justify-center border transition-colors duration-300" style={{ borderColor: "rgba(198,167,94,0.2)", color: "rgba(232,223,208,0.75)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#C6A75E"; e.currentTarget.style.color = "#C6A75E"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(198,167,94,0.2)"; e.currentTarget.style.color = "rgba(232,223,208,0.75)"; }}>
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full flex items-center justify-center border transition-colors duration-300" style={{ borderColor: "rgba(198,167,94,0.2)", color: "rgba(232,223,208,0.75)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#C6A75E"; e.currentTarget.style.color = "#C6A75E"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(198,167,94,0.2)"; e.currentTarget.style.color = "rgba(232,223,208,0.75)"; }}>
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] mb-6" style={{ color: "rgba(198,167,94,0.9)" }}>
              Explore
            </h4>
            <div className="space-y-3">
              <a
                href="https://thebruistrue.coffee"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm transition-colors duration-200"
                style={{ color: "rgba(232,223,208,0.75)" }}
                onMouseEnter={e => e.currentTarget.style.color = "#C6A75E"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(232,223,208,0.75)"}
              >
                Shop
              </a>
              {[
                { label: "Home", page: "Home" },
                { label: "Blends", page: "Menu" },
                { label: "About", page: "About" },
                { label: "Contact", page: "Contact" },
              ].map(({ label, page }) => (
                <Link
                  key={page}
                  to={createPageUrl(page)}
                  className="block text-sm transition-colors duration-200"
                  style={{ color: "rgba(232,223,208,0.75)" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#C6A75E"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(232,223,208,0.75)"}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] mb-6" style={{ color: "rgba(198,167,94,0.9)" }}>
              Visit Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" style={{ color: "#C6A75E" }} />
                <p className="text-sm" style={{ color: "rgba(232,223,208,0.75)" }}>
                  Monte Vista<br />Cape Town
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0" style={{ color: "#C6A75E" }} />
                <a href="tel:+27215552739" className="text-sm transition-colors duration-200" style={{ color: "rgba(232,223,208,0.75)" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#C6A75E"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(232,223,208,0.75)"}>
                  +27 21 555 BREW
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0" style={{ color: "#C6A75E" }} />
                <a href="mailto:info@thebruistrue.com" className="text-sm transition-colors duration-200" style={{ color: "rgba(232,223,208,0.75)" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#C6A75E"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(232,223,208,0.75)"}>
                  info@thebruistrue.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: "1px solid rgba(198,167,94,0.08)" }}>
          <p className="text-xs" style={{ color: "rgba(232,223,208,0.7)" }}>
            © {new Date().getFullYear()} The Bru Is True Coffee. All rights reserved.
          </p>
          <p className="text-xs serif" style={{ color: "rgba(198,167,94,0.75)", fontStyle: "italic" }}>
            Crafted with care & caffeine.
          </p>
        </div>
      </div>
    </footer>
  );
}