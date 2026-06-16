import { useState } from "react";
import { FiUser, FiMail, FiMessageSquare, FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

export default function ContactForm() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = "Invalid email address";
    if (!formData.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    // Simulate submission — replace with actual handler
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
    setLoading(false);
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const inputClass = (field) =>
    `w-full rounded-lg border bg-[#0b0f15] px-10 py-3 text-sm text-zinc-100 placeholder-zinc-500 transition-all duration-200 focus:outline-none focus:ring-2 ${
      errors[field]
        ? "border-red-500/60 focus:ring-red-500/40"
        : "border-[var(--color-border)]/30 focus:border-neon-cyan/50 focus:ring-neon-cyan/30"
    }`;

  return (
    <form onSubmit={handleSubmit} className="relative">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -inset-4 rounded-2xl bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-magenta/5 opacity-60 blur-xl" />

      <div className="relative space-y-5 rounded-2xl border border-zinc-800/60 bg-[#0e1218]/90 p-6 shadow-2xl shadow-black/40 backdrop-blur-sm sm:p-8">
        {/* Header */}
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-zinc-100">Send a Message</h3>
          <p className="text-xs text-zinc-500">Fill in the form and I&apos;ll get back to you soon.</p>
        </div>

        {/* Name */}
        <div className="relative">
          <FiUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
          <input
            value={formData.name}
            onChange={handleChange("name")}
            placeholder="Your Name"
            className={inputClass("name")}
          />
          {errors.name && (
            <span className="mt-1 flex items-center gap-1 text-xs text-red-400">
              <FiAlertCircle size={12} /> {errors.name}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="relative">
          <FiMail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
          <input
            type="email"
            value={formData.email}
            onChange={handleChange("email")}
            placeholder="Your Email"
            className={inputClass("email")}
          />
          {errors.email && (
            <span className="mt-1 flex items-center gap-1 text-xs text-red-400">
              <FiAlertCircle size={12} /> {errors.email}
            </span>
          )}
        </div>

        {/* Message */}
        <div className="relative">
          <FiMessageSquare className="pointer-events-none absolute left-3 top-3 text-zinc-500" size={16} />
          <textarea
            rows={5}
            value={formData.message}
            onChange={handleChange("message")}
            placeholder="Your Message"
            className={inputClass("message") + " resize-none"}
          />
          {errors.message && (
            <span className="mt-1 flex items-center gap-1 text-xs text-red-400">
              <FiAlertCircle size={12} /> {errors.message}
            </span>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg border border-neon-cyan/40 bg-neon-cyan/10 px-6 py-3 text-sm font-medium text-neon-cyan transition-all duration-300 hover:bg-neon-cyan/20 hover:shadow-[0_0_30px_-8px_#22d3ee] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Sending...
            </span>
          ) : (
            <>
              <FiSend size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              Send Message
            </>
          )}
        </button>

        {/* Status */}
        {status === "success" && (
          <div className="flex items-center gap-2 rounded-lg border border-neon-green/30 bg-neon-green/10 px-4 py-3 text-sm text-neon-green">
            <FiCheckCircle size={18} />
            Message sent successfully! I&apos;ll get back to you soon.
          </div>
        )}
      </div>
    </form>
  );
}
