"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

type HeroNavbarProps = {
  visible?: boolean;
  className?: string;
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function HeroNavbar({ visible = false, className }: HeroNavbarProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (visible) {
      // Small delay for smoother animation
      setTimeout(() => setIsMounted(true), 100);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <header 
      className={`fixed inset-x-0 top-0 z-50 border-b border-[var(--color-border)]/30 bg-[#0a0b0f]/80 backdrop-blur transition-all duration-700 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'} ${className || ""}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="group font-bold tracking-wide text-neon-cyan">
          <span className="font-[var(--font-orbitron)] text-xl">
            Unity<span className="text-white">Devs</span>
          </span>
          <span className="ml-2 inline-block h-1 w-6 rounded-full bg-neon-cyan/80 group-hover:w-10 transition-all"></span>
        </Link>
        <nav className="hidden gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm uppercase tracking-wider text-zinc-300 hover:text-neon-cyan transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-zinc-300 hover:text-neon-cyan"
        >
          <span className="block h-0.5 w-6 bg-current mb-1"></span>
          <span className="block h-0.5 w-6 bg-current mb-1"></span>
          <span className="block h-0.5 w-6 bg-current"></span>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-[var(--color-border)]/30 bg-[#0a0b10]">
          <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-wider text-zinc-300 hover:text-neon-cyan"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent"></div>
    </header>
  );
}

