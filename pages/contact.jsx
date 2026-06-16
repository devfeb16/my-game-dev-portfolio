import { FaLinkedinIn, FaGithub, FaWhatsapp } from "react-icons/fa";
import { FiGlobe, FiMail, FiMapPin, FiExternalLink } from "react-icons/fi";
import { SiFiverr, SiUpwork } from "react-icons/si";
import ContactForm from "@/components/ContactForm";

const contactInfo = [
  { icon: FiMail, label: "Email", value: "adeelmuhammad413@gmail.com", href: "mailto:adeelmuhammad413@gmail.com" },
  { icon: FiMapPin, label: "Location", value: "Pakistan", href: null },
];

const socialLinks = [
  { icon: FaLinkedinIn, label: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-adeel-3836b8274" },
  { icon: FaGithub, label: "GitHub", href: "https://github.com/adeelfeb" },
  { icon: FaWhatsapp, label: "WhatsApp", href: "https://wa.me/923099670475" },
  { icon: FiGlobe, label: "Design & Dev", href: "https://designndev.com/" },
  { icon: SiFiverr, label: "Fiverr", href: "https://www.fiverr.com/" },
  { icon: SiUpwork, label: "Upwork", href: "https://www.upwork.com/" },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="font-[var(--font-orbitron)] text-4xl tracking-tight text-zinc-100 sm:text-5xl">
          Get in <span className="text-neon-cyan">Touch</span>
        </h1>
        <p className="mt-3 text-sm text-zinc-500 sm:text-base">
          Let&apos;s build the next immersive experience together.
        </p>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta" />
      </div>

      {/* Grid */}
      <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
        {/* Left — Contact info & socials */}
        <div className="space-y-8 lg:col-span-2">
          {/* Contact details */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-400">
              Contact Info
            </h2>
            <div className="space-y-3">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-center gap-3 rounded-xl border border-zinc-800/60 bg-[#0e1218]/80 px-4 py-3 transition-colors duration-200 hover:border-zinc-700/60">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neon-cyan/10 text-neon-cyan">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">{item.label}</p>
                      <p className="text-sm text-zinc-200">{item.value}</p>
                    </div>
                  </div>
                );
                return item.href ? (
                  <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                );
              })}
            </div>
          </div>

          {/* Social links */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-400">
              Find Me On
            </h2>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-lg border border-zinc-800/60 bg-[#0e1218]/80 px-3 py-2 text-xs text-zinc-400 transition-all duration-200 hover:border-neon-cyan/30 hover:text-neon-cyan hover:shadow-[0_0_20px_-8px_#22d3ee]"
                  >
                    <Icon size={15} />
                    <span>{link.label}</span>
                    <FiExternalLink size={11} className="opacity-0 transition-opacity duration-200 group-hover:opacity-60" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right — Contact form */}
        <div className="lg:col-span-3">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
