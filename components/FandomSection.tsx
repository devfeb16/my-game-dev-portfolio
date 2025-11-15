import { FaFilm, FaBook } from "react-icons/fa";

const fandoms = [
  {
    title: "Anime",
    icon: FaFilm,
    color: "text-neon-blue",
    bgColor: "bg-neon-blue/10",
    borderColor: "border-neon-blue/30",
    description: "Shonen power systems, slice-of-life pacing, and anything with smart fight choreography. If your NPC behavior trees can quote an opening monologue, we'll get along.",
    tags: ["Shonen", "Fight Choreography", "Worldbuilding"]
  },
  {
    title: "A Song of Ice and Fire",
    icon: FaBook,
    color: "text-neon-magenta",
    bgColor: "bg-neon-magenta/10",
    borderColor: "border-neon-magenta/30",
    description: "I read the novels end-to-end. Court intrigue, economy loops, and faction balance are basically game design with better cloaks. If your feature pitch has a Red Keep flowchart, I'm already nodding.",
    tags: ["Court Intrigue", "Economy Loops", "Faction Balance"]
  },
];

export default function FandomSection() {
  return (
    <section className="mx-auto max-w-6xl px-6">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="font-[var(--font-orbitron)] text-2xl text-zinc-100">Fandom</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-neon-magenta/50 to-transparent"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fandoms.map((fandom, idx) => {
          const Icon = fandom.icon;
          return (
            <div 
              key={idx}
              className={`group relative rounded-xl border-2 ${fandom.borderColor} bg-gradient-to-br from-[#0c0e14] to-[#0a0f14] p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(244,63,94,0.2)] hover:scale-[1.02] overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`inline-flex p-3 rounded-lg ${fandom.bgColor} border ${fandom.borderColor}`}>
                    <Icon className={`${fandom.color} text-2xl`} />
                  </div>
                  <h3 className={`${fandom.color} font-semibold text-xl`}>{fandom.title}</h3>
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                  {fandom.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {fandom.tags.map((tag, tagIdx) => (
                    <span 
                      key={tagIdx}
                      className="text-xs px-3 py-1 rounded-full bg-[#0a0f14] border border-[var(--color-border)]/20 text-zinc-400"
                    >
                      {tag}
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




