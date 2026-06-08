import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Package, Palette, Users, ShoppingBag } from "lucide-react";

const services = [
  {
    icon: Package,
    title: "White Label Solutions",
    description: "Complete private label coffee programs tailored to your brand. From sourcing to packaging, we handle everything so you can focus on selling.",
    points: ["Custom blends", "Your branding", "Flexible MOQ", "Full support"],
  },
  {
    icon: Palette,
    title: "Packaging Design",
    description: "Stand out on the shelf with our expert packaging design services. Creative, functional, and brand-aligned design that converts.",
    points: ["Brand identity", "Print-ready files", "Material guidance", "Design revisions"],
  },
  {
    icon: Users,
    title: "Client Collaboration",
    description: "Hands-on partnership throughout your journey. We work closely with you to bring your coffee vision to life from concept to shelf.",
    points: ["Strategy sessions", "Sample development", "Market insights", "Ongoing support"],
  },
  {
    icon: ShoppingBag,
    title: "E-commerce Integration",
    description: "Seamless online retail solutions with secure checkout, inventory management, and customer engagement tools built for coffee brands.",
    points: ["Shopify setup", "Payment gateways", "Loyalty programs", "Analytics tracking"],
  },
];

const steps = ["Consultation", "Blend Development", "Packaging + Branding", "Launch + Support"];

export default function WhiteLabel() {
  return (
    <div className="min-h-screen" style={{ background: "#0F0F0F" }}>
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600"
          alt="White Label"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.2)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(15,15,15,0.5), rgba(15,15,15,0.97))" }} />
        <div className="absolute inset-0 flex items-end justify-start max-w-7xl mx-auto px-6 md:px-12 pb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: "rgba(198,167,94,0.9)" }}>
              B2B &amp; Wholesale
            </p>
            <h1 className="serif" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 300, color: "#E8DFD0", fontStyle: "italic" }}>
              White Label &amp; Services
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm max-w-2xl mb-20"
          style={{ color: "rgba(232,223,208,0.8)", lineHeight: 1.8 }}
        >
          Complete solutions for brands, retailers, and entrepreneurs ready to enter the coffee market. We blend e-commerce, creativity, and coffee expertise into one seamless experience — your vision, our expertise.
        </motion.p>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 border"
                style={{ borderColor: "rgba(198,167,94,0.12)", background: "#161616" }}
              >
                <Icon className="h-5 w-5 mb-6" style={{ color: "#C6A75E" }} />
                <h3 className="serif text-xl mb-3" style={{ color: "#E8DFD0", fontWeight: 300, fontStyle: "italic" }}>
                  {svc.title}
                </h3>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: "rgba(232,223,208,0.8)" }}>
                  {svc.description}
                </p>
                <ul className="space-y-2">
                  {svc.points.map(pt => (
                    <li key={pt} className="flex items-center gap-3 text-xs uppercase tracking-[0.15em]" style={{ color: "rgba(232,223,208,0.35)" }}>
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#C6A75E" }} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Process */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-b py-20 mb-24"
          style={{ borderColor: "rgba(198,167,94,0.1)" }}
        >
          <p className="text-xs uppercase tracking-[0.3em] mb-12" style={{ color: "rgba(198,167,94,0.85)" }}>How it works</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={step}>
                <div className="text-4xl serif mb-3" style={{ color: "rgba(198,167,94,0.2)", fontStyle: "italic" }}>0{i + 1}</div>
                <h4 className="text-sm uppercase tracking-[0.15em] mb-2" style={{ color: "#E8DFD0" }}>{step}</h4>
                <div className="w-6 h-px" style={{ background: "#C6A75E" }} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="serif mb-4" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 300, color: "#E8DFD0", fontStyle: "italic" }}>
            Ready to build your coffee brand?
          </h3>
          <p className="text-sm mb-8" style={{ color: "rgba(232,223,208,0.4)" }}>
            Let's discuss how we can help bring your vision to life.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/Contact"
              className="inline-block px-8 py-3 text-xs uppercase tracking-[0.2em] transition-all"
              style={{ background: "#C6A75E", color: "#0F0F0F" }}
              onMouseEnter={e => e.currentTarget.style.background = "#D4B86E"}
              onMouseLeave={e => e.currentTarget.style.background = "#C6A75E"}
            >
              Get in Touch
            </Link>
            <Link
              to="/Brands"
              className="inline-block px-8 py-3 text-xs uppercase tracking-[0.2em] transition-all border"
              style={{ borderColor: "rgba(198,167,94,0.3)", color: "rgba(232,223,208,0.8)" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#C6A75E"; e.currentTarget.style.color = "#C6A75E"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(198,167,94,0.3)"; e.currentTarget.style.color = "rgba(232,223,208,0.8)"; }}
            >
              View Our Brands
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}