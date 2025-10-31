const items = [
  { year: "Now", text: "Mobile Game Dev Specialist at Pixls" },
  { year: "2023", text: "Published multiple standalone Unity games" },
  { year: "2022", text: "Prototyped LLM-driven NPC dialogue systems" },
];

export default function Timeline() {
  return (
    <section className="mx-auto mt-10 max-w-6xl px-6">
      <h2 className="font-[var(--font-orbitron)] text-2xl text-zinc-100">Timeline</h2>
      <ol className="mt-6 space-y-4 border-l border-[var(--color-border)]/40 pl-6">
        {items.map((i) => (
          <li key={i.year} className="relative">
            <span className="absolute -left-[9px] top-1 h-2.5 w-2.5 rounded-full bg-neon-cyan"></span>
            <div className="text-sm text-zinc-400"><span className="text-zinc-200 mr-2">{i.year}</span>{i.text}</div>
          </li>
        ))}
      </ol>
    </section>
  );
}




