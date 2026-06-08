import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: [{ text: "Monte Vista" }, { text: "Cape Town" }],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: [{ text: "+27 21 555 BREW", href: "tel:+27215552739" }],
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: [{ text: "info@thebruistrue.com", href: "mailto:info@thebruistrue.com" }],
  },
  {
    icon: Clock,
    title: "Hours",
    lines: [{ text: "Mon–Fri: 6am – 7pm" }, { text: "Sat–Sun: 7am – 8pm" }],
  },
];

const inputStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(198,167,94,0.2)",
  color: "rgba(232,223,208,0.85)",
  borderRadius: 0,
  height: "48px",
  width: "100%",
  padding: "0 14px",
  fontSize: "14px",
  outline: "none",
  transition: "border-color 0.2s",
};

const textareaStyle = {
  ...inputStyle,
  height: "auto",
  padding: "12px 14px",
  resize: "none",
};

function Field({ label, children }) {
  return (
    <div className="space-y-2">
      <label className="block text-xs uppercase tracking-[0.18em]" style={{ color: "rgba(198,167,94,0.75)" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Send failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try emailing us directly at info@thebruistrue.com");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#0F0F0F" }}>

      {/* Header */}
      <div className="relative pt-32 pb-16 md:pt-40 md:pb-20 text-center px-6">
        <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "rgba(198,167,94,0.75)" }}>
          Get In Touch
        </p>
        <h1 className="text-4xl md:text-6xl font-light mb-4" style={{ color: "rgba(232,223,208,0.95)", letterSpacing: "-0.01em" }}>
          Say <span className="serif italic" style={{ color: "#C6A75E" }}>Hello</span>
        </h1>
        <p className="text-sm leading-relaxed mx-auto" style={{ color: "rgba(232,223,208,0.6)", maxWidth: "420px" }}>
          Whether you have a question, want to book an event, or just want to say hi — drop us a line.
        </p>
        <div className="mt-8 w-12 h-px mx-auto" style={{ background: "linear-gradient(to right, transparent, #C6A75E, transparent)" }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 pb-24">
        <div className="grid md:grid-cols-2 gap-16 md:gap-20">

          {/* Info side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              {contactInfo.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center shrink-0"
                    style={{ border: "1px solid rgba(198,167,94,0.25)", color: "#C6A75E" }}
                  >
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.18em] mb-2" style={{ color: "rgba(198,167,94,0.75)" }}>
                      {item.title}
                    </h4>
                    {item.lines.map((line, i) =>
                      line.href ? (
                        <a
                          key={i}
                          href={line.href}
                          className="block text-sm transition-colors duration-200"
                          style={{ color: "rgba(232,223,208,0.8)" }}
                          onMouseEnter={e => e.currentTarget.style.color = "#C6A75E"}
                          onMouseLeave={e => e.currentTarget.style.color = "rgba(232,223,208,0.8)"}
                        >
                          {line.text}
                        </a>
                      ) : (
                        <p key={i} className="text-sm" style={{ color: "rgba(232,223,208,0.8)" }}>
                          {line.text}
                        </p>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map image */}
            <div className="aspect-[16/9] overflow-hidden" style={{ border: "1px solid rgba(198,167,94,0.12)" }}>
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                alt="Map area"
                className="w-full h-full object-cover opacity-50"
              />
            </div>
          </motion.div>

          {/* Form side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {submitted ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div
                    className="w-16 h-16 flex items-center justify-center mx-auto mb-6"
                    style={{ border: "1px solid rgba(198,167,94,0.3)", color: "#C6A75E" }}
                  >
                    <CheckCircle className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-light mb-2" style={{ color: "rgba(232,223,208,0.95)" }}>
                    Message Sent
                  </h3>
                  <p className="text-sm mb-8" style={{ color: "rgba(232,223,208,0.6)" }}>
                    We'll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", message: "" }); }}
                    className="text-xs uppercase tracking-[0.2em] px-8 py-3 transition-all duration-300"
                    style={{ border: "1px solid rgba(198,167,94,0.3)", color: "rgba(232,223,208,0.8)" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#C6A75E"; e.currentTarget.style.color = "#C6A75E"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(198,167,94,0.3)"; e.currentTarget.style.color = "rgba(232,223,208,0.8)"; }}
                  >
                    Send Another
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 md:p-10" style={{ border: "1px solid rgba(198,167,94,0.12)", background: "rgba(255,255,255,0.02)" }}>
                <h3 className="text-2xl font-light mb-8" style={{ color: "rgba(232,223,208,0.95)" }}>
                  Send a <span className="serif italic" style={{ color: "#C6A75E" }}>Message</span>
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Field label="Your Name">
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Smith"
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "#C6A75E"}
                      onBlur={e => e.target.style.borderColor = "rgba(198,167,94,0.2)"}
                    />
                  </Field>
                  <Field label="Email Address">
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jane@example.com"
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "#C6A75E"}
                      onBlur={e => e.target.style.borderColor = "rgba(198,167,94,0.2)"}
                    />
                  </Field>
                  <Field label="Message">
                    <textarea
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us what's on your mind..."
                      rows={5}
                      style={textareaStyle}
                      onFocus={e => e.target.style.borderColor = "#C6A75E"}
                      onBlur={e => e.target.style.borderColor = "rgba(198,167,94,0.2)"}
                    />
                  </Field>
                  {error && (
                    <p className="text-sm" style={{ color: "#e57373" }}>{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full flex items-center justify-center gap-2 py-4 text-xs uppercase tracking-[0.25em] transition-all duration-300"
                    style={{ background: "#C6A75E", color: "#0F0F0F", opacity: sending ? 0.7 : 1 }}
                    onMouseEnter={e => { if (!sending) e.currentTarget.style.background = "#D4B870"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#C6A75E"; }}
                  >
                    <Send className="h-4 w-4" />
                    {sending ? "Sending…" : "Send Message"}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
