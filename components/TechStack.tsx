const items = [
  { label: "Unity", accent: "text-neon-cyan" },
  { label: "C#", accent: "text-neon-magenta" },
  { label: "Python", accent: "text-neon-green" },
  { label: "LLMs", accent: "text-neon-blue" },
  { label: "ML Fine-tuning", accent: "text-neon-cyan" },
  { label: "Shaders", accent: "text-neon-magenta" },
];

export default function TechStack() {
  return (
    <section className="mx-auto mt-14 max-w-6xl px-6">
      <h2 className="font-[var(--font-orbitron)] text-2xl text-zinc-100">Tech Stack</h2>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {items.map((i) => (
          <div
            key={i.label}
            className="rounded-md border border-[var(--color-border)]/40 bg-[#0c0e14]/60 px-3 py-2 text-center text-sm text-zinc-300"
          >
            <span className={i.accent}>{i.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}




