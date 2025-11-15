import { FaGamepad, FaBrain, FaTools, FaCode, FaLink } from "react-icons/fa";
import { SiUnity, SiPython, SiPytorch, SiGit, SiJira, SiFigma } from "react-icons/si";

const skills = [
  { 
    group: "Game", 
    icon: FaGamepad,
    color: "text-neon-cyan",
    bgColor: "bg-neon-cyan/10",
    borderColor: "border-neon-cyan/30",
    items: [
      { name: "Unity", icon: SiUnity },
      { name: "C#", icon: FaCode },
      { name: "URP", icon: FaGamepad },
      { name: "Addressables", icon: FaLink },
      { name: "Profiling", icon: FaTools },
      { name: "AI/ML", icon: FaBrain },
    ]
  },
  {
    group: "ML/AI",
    icon: FaBrain,
    color: "text-neon-magenta",
    bgColor: "bg-neon-magenta/10",
    borderColor: "border-neon-magenta/30",
    items: [
      { name: "Python", icon: SiPython },
      { name: "PyTorch", icon: SiPytorch },
      { name: "LoRA", icon: FaBrain },
      { name: "RAG", icon: FaBrain },
      { name: "LangChain", icon: FaBrain },
      { name: "Tools", icon: FaTools },
    ]
  },
  {
    group: "Tools",
    icon: FaTools,
    color: "text-neon-blue",
    bgColor: "bg-neon-blue/10",
    borderColor: "border-neon-blue/30",
    items: [
      { name: "Git", icon: SiGit },
      { name: "CI/CD", icon: FaTools },
      { name: "Jira", icon: SiJira },
      { name: "Figma", icon: SiFigma },
    ]
  },
];

export default function TechStackDetails() {
  return (
    <section className="mx-auto mt-10 max-w-6xl px-6">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="font-[var(--font-orbitron)] text-2xl text-zinc-100">Tech Stack Details</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-neon-blue/50 to-transparent"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skills.map((s) => {
          const GroupIcon = s.icon;
          return (
            <div 
              key={s.group} 
              className={`group relative rounded-xl border-2 ${s.borderColor} bg-gradient-to-br from-[#0c0e14] to-[#0a0f14] p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] hover:scale-102 overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`inline-flex p-2.5 rounded-lg ${s.bgColor} border ${s.borderColor}`}>
                    <GroupIcon className={`${s.color} text-xl`} />
                  </div>
                  <h3 className={`${s.color} font-semibold text-lg`}>{s.group}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((item, idx) => {
                    const ItemIcon = item.icon;
                    return (
                      <span 
                        key={idx} 
                        className="group/item inline-flex items-center gap-1.5 text-xs text-zinc-300 border border-[var(--color-border)]/30 px-3 py-1.5 rounded-lg bg-[#0a0f14]/60 hover:border-[var(--color-border)]/50 hover:bg-[#0c0e14] transition-all duration-200"
                      >
                        {ItemIcon && <ItemIcon className="text-sm" />}
                        <span>{item.name}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
