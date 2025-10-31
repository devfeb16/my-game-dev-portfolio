const services = [
  { title: "Unity Mobile", text: "Prototyping to live ops: gameplay systems, performance tuning, analytics." },
  { title: "AI/LLM", text: "Dialogue systems, memory, RAG, fine-tuning workflows for NPCs and tools." },
  { title: "Web Services", text: "Next.js backends, dashboards, and pipelines that ship content fast." },
];

export default function InterestsServices() {
  return (
    <section className="mx-auto max-w-6xl px-6">
      <h2 className="font-[var(--font-orbitron)] text-2xl text-zinc-100">Interests & Services</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((s) => (
          <div key={s.title} className="rounded-xl border border-[var(--color-border)]/40 bg-[#0c0e14]/60 p-5">
            <div className="text-neon-cyan font-semibold">{s.title}</div>
            <p className="mt-2 text-zinc-300">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}




