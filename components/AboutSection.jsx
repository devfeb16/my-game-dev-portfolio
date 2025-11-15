import Image from "next/image";
import { FaCode, FaRobot, FaGamepad, FaChartLine } from "react-icons/fa";
import { SiUnity } from "react-icons/si";

export default function AboutSection() {
  const highlights = [
    { icon: FaChartLine, text: "Mobile Performance", color: "text-neon-cyan" },
    { icon: FaGamepad, text: "Gameplay Systems", color: "text-neon-blue" },
    { icon: FaChartLine, text: "Player Retention", color: "text-neon-green" },
    { icon: FaRobot, text: "LLM Integration", color: "text-neon-magenta" },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6">
      <div className="grid grid-cols-1 md-cols-[240px_1fr] gap-8 items-start">
        <div className="relative group">
          <div className="relative h-56 w-56 overflow-hidden rounded-xl border-2 border-neon-cyan/30 bg-[#0c0e14]/60 transition-all duration-300 group-hover-neon-cyan/60 group-hover-[0_0_30px_rgba(34,211,238,0.3)]">
            <Image src="/images/avatar.svg" alt="Avatar" fill className="object-cover transition-transform duration-300 group-hover-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-neon-cyan/10 to-transparent opacity-0 group-hover-100 transition-opacity duration-300"></div>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-[#0c0e14] border-2 border-neon-cyan/40 rounded-lg p-2 shadow-lg">
            <SiUnity className="text-2xl text-neon-cyan" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="font-[var(--font-orbitron)] text-3xl text-zinc-100">About</h1>
            <div className="h-px flex-1 bg-gradient-to-r from-neon-cyan/50 to-transparent"></div>
          </div>
          <div className="mt-6 space-y-4 text-zinc-300">
            <p className="leading-relaxed">
              Unity Game Developer at <span className="text-neon-cyan font-semibold inline-flex items-center gap-1">
                <SiUnity className="inline" /> UnityDev
              </span> focused on mobile performance, gameplay
              systems, and player retention. I prototype fast, measure constantly, and ship responsibly.
            </p>
            <p className="leading-relaxed">
              On the AI side, I explore LLM-driven behaviors-use, and tuning workflows that actually fit inside a
              production pipeline.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-6">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-center gap-2 p-3 rounded-lg bg-[#0c0e14]/40 border border-[var(--color-border)]/20 hover-[var(--color-border)]/40 transition-all duration-200">
                    <Icon className={`${item.color} text-lg flex-shrink-0`} />
                    <span className="text-sm text-zinc-300">{item.text}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 p-4 rounded-lg bg-[#0c0e14]/40 border border-neon-magenta/20">
              <p className="text-zinc-400 text-sm leading-relaxed">
                <span className="text-neon-magenta font-semibold">Note:</span> I enjoy anime and a bit of dark humor. If you're into long-form worldbuilding and spicy code reviews, we'll get along.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


