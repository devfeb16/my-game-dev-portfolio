import { FaRobot } from "react-icons/fa";
import { SiUnity, SiNextdotjs } from "react-icons/si";

const services = [
  { 
    title: "Unity Mobile", 
    text: "Prototyping to live ops: gameplay systems, performance tuning, analytics.",
    icon: SiUnity,
    color: "text-neon-cyan",
    bgColor: "bg-neon-cyan/10",
    borderColor: "border-neon-cyan/30",
    features: ["Gameplay Systems", "Performance Tuning", "Live Ops"]
  },
  { 
    title: "AI/LLM", 
    text: "Dialogue systems, memory, RAG, fine-tuning workflows for NPCs and tools.",
    icon: FaRobot,
    color: "text-neon-magenta",
    bgColor: "bg-neon-magenta/10",
    borderColor: "border-neon-magenta/30",
    features: ["Dialogue Systems", "RAG", "Fine-tuning"]
  },
  { 
    title: "Web Services", 
    text: "Next.js backends, dashboards, and pipelines that ship content fast.",
    icon: SiNextdotjs,
    color: "text-neon-blue",
    bgColor: "bg-neon-blue/10",
    borderColor: "border-neon-blue/30",
    features: ["Next.js Backends", "Dashboards", "Fast Pipelines"]
  },
];

export default function InterestsServices() {
  return (
    <section className="mx-auto max-w-6xl px-6">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="font-[var(--font-orbitron)] text-2xl text-zinc-100">Interests & Services</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-neon-cyan/50 to-transparent"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((s) => {
          const Icon = s.icon;
          return (
            <div 
              key={s.title} 
              className={`group relative rounded-xl border-2 ${s.borderColor} bg-gradient-to-br from-[#0c0e14] to-[#0a0f14] p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:scale-[1.02] overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className={`inline-flex p-3 rounded-lg ${s.bgColor} border ${s.borderColor} mb-4`}>
                  <Icon className={`${s.color} text-2xl`} />
                </div>
                <h3 className={`${s.color} font-semibold text-lg mb-2`}>{s.title}</h3>
                <p className="text-zinc-300 text-sm leading-relaxed mb-4">{s.text}</p>
                <div className="flex flex-wrap gap-2">
                  {s.features.map((feature, idx) => (
                    <span 
                      key={idx} 
                      className="text-xs px-2 py-1 rounded bg-[#0a0f14] border border-[var(--color-border)]/20 text-zinc-400"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}




