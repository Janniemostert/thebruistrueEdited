import { motion } from "framer-motion";

const timeline = [
  {
    year: "2023",
    title: "The Idea Brews",
    desc: "A dream born from late-night conversations about what honest coffee really means."
  },
  {
    year: "2024",
    title: "Doors Open",
    desc: "We opened our first location — a small, sun-drenched space in Monte Vista, Cape Town."
  },
  {
    year: "2024",
    title: "Direct Trade",
    desc: "We traveled to origin, building relationships with farmers in Ethiopia and Colombia."
  },
  {
    year: "2025",
    title: "Growing Community",
    desc: "From regulars to family — our community of coffee lovers continues to grow."
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#FBF7F2]">
      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1600&q=80"
          alt="Coffee shop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1A0F0A]/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-[#D4A574] uppercase tracking-[0.25em] text-xs font-medium">
              Since 2024
            </span>
            <h1 className="text-5xl md:text-6xl font-light text-white mt-3">
              Our <span className="italic text-[#D4A574]">Story</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Mission */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#D4A574] uppercase tracking-[0.25em] text-xs font-medium">
              Our Mission
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-[#1A0F0A] mt-3 mb-6 leading-tight">
              Truth in Every <span className="italic">Cup</span>
            </h2>
            <div className="space-y-4 text-[#1A0F0A]/50 leading-relaxed">
              <p>
                At The Bru Is True, we believe great coffee starts with honesty — 
                honesty about where beans come from, how they're roasted, and why every 
                detail matters.
              </p>
              <p>
                We work directly with small-scale farmers who share our commitment to 
                quality and sustainability. No middlemen, no shortcuts, no compromises.
              </p>
              <p>
                Every batch is roasted in-house, in small lots, to bring out the unique 
                character of each origin. We're not hiding behind dark roasts or fancy 
                labels — what you taste is the truth.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80"
                alt="Coffee roasting"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#D4A574] text-[#1A0F0A] rounded-xl p-5 shadow-xl">
              <p className="text-3xl font-light">100%</p>
              <p className="text-xs uppercase tracking-widest mt-1">Direct Trade</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#2C1810] py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-[#D4A574] uppercase tracking-[0.25em] text-xs font-medium">
              Our Journey
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-white mt-3">
              How It <span className="italic text-[#D4A574]">Started</span>
            </h2>
          </div>

          <div className="relative">
            {/* Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#D4A574]/20 md:-translate-x-px" />

            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex items-start gap-8 mb-12 last:mb-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-[#D4A574] rounded-full -translate-x-1.5 mt-1.5 z-10" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                  <span className="text-[#D4A574] text-sm font-medium">{item.year}</span>
                  <h3 className="text-white text-xl font-medium mt-1 mb-2">{item.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team photo strip — hidden until team profiles are ready */}
      {false && <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <span className="text-[#D4A574] uppercase tracking-[0.25em] text-xs font-medium">
            The Team
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-[#1A0F0A] mt-3 mb-6">
            Faces Behind the <span className="italic">Brew</span>
          </h2>
          <p className="text-[#1A0F0A]/40 max-w-lg mx-auto mb-12 leading-relaxed">
            We're a small team of passionate coffee lovers, roasters, and dreamers — 
            united by the belief that coffee should be real, delicious, and true.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", name: "Alex", role: "Head Roaster" },
              { img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80", name: "Maya", role: "Founder" },
              { img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80", name: "Jordan", role: "Lead Barista" },
              { img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80", name: "Sam", role: "Pastry Chef" },
            ].map((person) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="aspect-square rounded-2xl overflow-hidden mb-3">
                  <img
                    src={person.img}
                    alt={person.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-[#1A0F0A] font-medium">{person.name}</p>
                <p className="text-[#1A0F0A]/40 text-sm">{person.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>}
    </div>
  );
}