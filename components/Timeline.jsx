import { FaBriefcase, FaRocket, FaRobot } from "react-icons/fa";

const items = [
  { 
    year: "Now", 
    text: "Mobile Game Dev Specialist at UnityDev",
    icon: "text-neon-cyan",
    bgColor: "bg-neon-cyan/20",
    borderColor: "border-neon-cyan/40"
  },
  { 
    year: "2023", 
    text: "Published multiple standalone Unity games",
    icon: "text-neon-blue",
    bgColor: "bg-neon-blue/20",
    borderColor: "border-neon-blue/40"
  },
  { 
    year: "2022", 
    text: "Prototyped LLM-driven NPC dialogue systems",
    icon: "text-neon-magenta",
    bgColor: "bg-neon-magenta/20",
    borderColor: "border-neon-magenta/40"
  },
];

export default function Timeline() {
  return (
    <section className="mx-auto mt-10 max-w-6xl px-6">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="font-[var(--font-orbitron)] text-2xl text-zinc-100">Timeline</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-neon-cyan/50 to-transparent"></div>
      </div>
      <ol className="relative mt-6 space-y-6">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-cyan/40 via-neon-blue/40 to-neon-magenta/40"></div>
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <li key={item.year} className="relative pl-12">
              <div className={`absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border-2 ${item.borderColor} ${item.bgColor} backdrop-blur-sm`}>
                <Icon className={`${item.color} text-sm`} />
              </div>
              <div className={`rounded-lg border ${item.borderColor} bg-gradient-to-br from-[#0c0e14] to-[#0a0f14] p-4 transition-all duration-300 hover-[0_0_20px_rgba(34,211,238,0.15)] hover-[1.01]`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`${item.color} font-semibold text-sm`}>{item.year}</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-[var(--color-border)]/40 to-transparent"></div>
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed">{item.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}




