const skills = [
  { group: "Game", items: ["Unity", "C#", "URP", "Addressables", "Profiling"] },
  { group: "AI/ML", items: ["Python", "PyTorch", "LoRA", "RAG", "LangChain"] },
  { group: "Tools", items: ["Git", "CI/CD", "Jira", "Figma"] },
];

export default function TechStackDetails() {
  return (
    <section className="mx-auto mt-10 max-w-6xl px-6">
      <h2 className="font-[var(--font-orbitron)] text-2xl text-zinc-100">Tech Stack Details</h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {skills.map((s) => (
          <div key={s.group} className="rounded-xl border border-[var(--color-border)]/40 bg-[#0c0e14]/60 p-5">
            <div className="text-neon-blue font-semibold">{s.group}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {s.items.map((i) => (
                <span key={i} className="text-xs text-zinc-300 border border-[var(--color-border)]/30 px-2 py-1 rounded">
                  {i}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


