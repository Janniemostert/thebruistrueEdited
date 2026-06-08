import { motion } from "framer-motion";

const values = [
  {
    number: "01",
    title: "Sourced with Intention",
    description: "Every bean is traceable, ethically sourced from farms that share our commitment to craft and sustainability.",
  },
  {
    number: "02",
    title: "Roasted to Perfection",
    description: "Small-batch roasting that honours the origin of each bean, bringing out its fullest potential cup after cup.",
  },
  {
    number: "03",
    title: "Brewed with Purpose",
    description: "From the first pour to the last sip, we believe coffee is a ritual worth doing right — every single time.",
  },
];

export default function ValuesSection() {
  return (
    <section style={{ background: "#161616" }} className="py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Left: Text */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "rgba(198,167,94,0.85)" }}>
              Our Philosophy
            </p>
            <h2 className="serif mb-12" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, color: "#E8DFD0", fontStyle: "italic", lineHeight: 1.15 }}>
              Truth in<br />Every Cup
            </h2>

            <div className="space-y-10">
              {values.map((v, i) => (
                <motion.div
                  key={v.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="flex gap-6"
                >
                  <span className="serif text-xs mt-1 shrink-0" style={{ color: "#C6A75E", opacity: 0.5 }}>{v.number}</span>
                  <div>
                    <h3 className="text-base font-medium mb-2" style={{ color: "#E8DFD0" }}>{v.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(232,223,208,0.4)" }}>{v.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div style={{ aspectRatio: "3/4", background: "#1C1C1C", position: "relative", overflow: "hidden" }}>
              <img
                src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=90"
                alt="Coffee craft"
                className="w-full h-full object-cover"
                style={{ filter: "brightness(0.6) contrast(1.1)" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(198,167,94,0.05) 0%, transparent 60%)" }} />
            </div>
            {/* Gold accent border */}
            <div
              style={{
                position: "absolute",
                top: 16, left: 16, right: -16, bottom: -16,
                border: "1px solid rgba(198,167,94,0.15)",
                zIndex: -1,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}