import { GiGamepad, GiAchievement, GiArtificialIntelligence } from "react-icons/gi";
import { SiUnity, SiNodedotjs, SiPython } from "react-icons/si";
import Link from "next/link";

const stickers = [
  { label: "Unity", href: "/projects", Icon: SiUnity, color: "#00d8ff" },
  { label: "C#", href: "/projects", Icon: GiGamepad, color: "#ff4dff" },
  { label: "LLM", href: "/projects", Icon: GiArtificialIntelligence, color: "#88ff00" },
  { label: "Next.js", href: "/projects", Icon: SiNodedotjs, color: "#60a5fa" },
  { label: "Python", href: "/projects", Icon: SiPython, color: "#22c55e" },
  { label: "Gameplay", href: "/projects", Icon: GiAchievement, color: "#f59e0b" },
];

export default function GamingStickerBar() {
  return (
    <section className="mx-auto max-w-7xl px-6">
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {stickers.map(({ label, href, Icon, color }) => (
          <Link
            key={label}
            href={href}
            className="group relative overflow-hidden rounded-xl border border-[var(--color-border)]/40 bg-[#0c1117] p-4 text-center"
          >
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg" style={{ boxShadow: `0 0 0 1px ${color}55, 0 8px 24px ${color}33` }}>
              <Icon size={24} color={color} />
            </div>
            <div className="mt-2 text-sm text-zinc-300">{label}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
