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
          className="group relative overflow-hidden rounded-lg border border-[var(--color-border)]/40 bg-[#0c1117] p-4 perspective hover:border-[rgba(0,216,255,0.4)]"
          onMouseMove={(e) => {
            const target = e.currentTarget as HTMLAnchorElement;
            const rect = target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rx = (y / rect.height - 0.5) * -8;
            const ry = (x / rect.width - 0.5) * 8;
            target.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.transform = "rotateX(0) rotateY(0)";
          }}
          style={{ transition: "transform 150ms ease" }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              background: `radial-gradient(600px circle at var(--mx,50%) var(--my,50%), ${c.color}22, transparent 40%)`,
            }}
            onMouseMove={(e) => {
              const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
              const mx = ((e.clientX - rect.left) / rect.width) * 100;
              const my = ((e.clientY - rect.top) / rect.height) * 100;
              (e.currentTarget as HTMLDivElement).style.setProperty("--mx", `${mx}%`);
              (e.currentTarget as HTMLDivElement).style.setProperty("--my", `${my}%`);
            }}
          />
          <div className="relative z-10 text-zinc-200 font-medium">{c.label}</div>
        </a>
      ))}
    </div>
  );
}


