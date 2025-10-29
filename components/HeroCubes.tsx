"use client";
import { useRef } from "react";

type Cube = { label: string; href: string; color: string };
type HeroCubesProps = { className?: string; cubes?: Cube[] };

const defaultCubes: Cube[] = [
  { label: "Unity", href: "/projects", color: "#00d8ff" },
  { label: "C#", href: "/projects", color: "#ff4dff" },
  { label: "LLM", href: "/projects", color: "#88ff00" },
  { label: "Pinecone", href: "/projects", color: "#00d8ff" },
  { label: "FastAPI", href: "/projects", color: "#ff4dff" },
  { label: "Next.js", href: "/projects", color: "#88ff00" },
];

export default function HeroCubes({ className, cubes = defaultCubes }: HeroCubesProps) {
  const container = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={container} className={`grid grid-cols-2 sm:grid-cols-3 gap-3 ${className || ""}`}>
      {cubes.map((c) => (
        <a
          key={c.label}
          href={c.href}
          aria-label={c.label}
          className="group relative overflow-hidden rounded-lg border border-[var(--color-border)]/40 bg-[#0c1117]/80 backdrop-blur-sm p-4 perspective hover:border-[rgba(0,216,255,0.6)] hover:scale-105 hover:shadow-[0_0_30px_rgba(0,216,255,0.4)] transition-all duration-300"
          onMouseMove={(e) => {
            const target = e.currentTarget as HTMLAnchorElement;
            const rect = target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rx = (y / rect.height - 0.5) * -8;
            const ry = (x / rect.width - 0.5) * 8;
            target.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.05)`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
          }}
          style={{ transition: "transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease" }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(600px circle at var(--mx,50%) var(--my,50%), ${c.color}33, transparent 50%)`,
            }}
            onMouseMove={(e) => {
              const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
              const mx = ((e.clientX - rect.left) / rect.width) * 100;
              const my = ((e.clientY - rect.top) / rect.height) * 100;
              (e.currentTarget as HTMLDivElement).style.setProperty("--mx", `${mx}%`);
              (e.currentTarget as HTMLDivElement).style.setProperty("--my", `${my}%`);
            }}
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 animate-pulse"
            style={{
              background: `linear-gradient(45deg, ${c.color}08, ${c.color}15)`,
            }}
          />
          <div className="relative z-10 text-zinc-200 font-medium group-hover:text-white transition-colors">
            {c.label}
          </div>
          <div
            className="absolute -inset-1 opacity-0 group-hover:opacity-50 blur-xl transition-opacity"
            style={{ backgroundColor: c.color }}
          />
        </a>
      ))}
    </div>
  );
}


