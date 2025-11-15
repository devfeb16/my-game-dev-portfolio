import { FaLaugh, FaCode, FaFilm, FaLightbulb } from "react-icons/fa";
import { SiUnity } from "react-icons/si";

export default function PersonalityBanner() {
  const traits = [
    { icon: FaCode, label: "Clean Code", color: "text-neon-cyan" },
    { icon: FaFilm, label: "Anime Binger", color: "text-neon-magenta" },
    { icon: FaLightbulb, label: "Systems Thinker", color: "text-neon-blue" },
    { icon: FaLaugh, label: "Dark Humor", color: "text-neon-green" },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6">
      <div className="relative rounded-xl border border-[var(--color-border)]/40 bg-gradient-to-br from-[#0d1218] to-[#0a0f14] p-8 overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 via-transparent to-neon-magenta/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30">
              <SiUnity className="text-2xl text-neon-cyan" />
            </div>
            <div className="flex-1">
              <p className="text-zinc-300 leading-relaxed">
                I'm a Unity mobile game developer at <span className="text-neon-cyan font-semibold">UnityDev</span>, and when I'm not profiling
                frame times, I'm binging anime arcs and dissecting systems design. Expect clean code, shipped builds, and the occasional
                dark joke. Consider this your friendly heads-up: personality toggled on.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-[var(--color-border)]/20">
            {traits.map((trait, idx) => {
              const Icon = trait.icon;
              return (
                <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0c0e14]/60 border border-[var(--color-border)]/20 hover:border-[var(--color-border)]/40 transition-all duration-200">
                  <Icon className={`${trait.color} text-base`} />
                  <span className="text-sm text-zinc-300">{trait.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}




