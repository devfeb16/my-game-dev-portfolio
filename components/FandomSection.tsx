export default function FandomSection() {
  return (
    <section className="mx-auto max-w-6xl px-6">
      <h2 className="font-[var(--font-orbitron)] text-2xl text-zinc-100">Fandom</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-[var(--color-border)]/40 bg-[#0c0e14]/60 p-5">
          <h3 className="text-neon-blue font-semibold">Anime</h3>
          <p className="mt-2 text-zinc-300">
            Shonen power systems, slice-of-life pacing, and anything with smart fight choreography. If your NPC behavior trees can quote
            an opening monologue, we’ll get along.
          </p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)]/40 bg-[#0c0e14]/60 p-5">
          <h3 className="text-neon-magenta font-semibold">A Song of Ice and Fire</h3>
          <p className="mt-2 text-zinc-300">
            I read the novels end-to-end. Court intrigue, economy loops, and faction balance are basically game design with better cloaks.
            If your feature pitch has a Red Keep flowchart, I’m already nodding.
          </p>
        </div>
      </div>
    </section>
  );
}




