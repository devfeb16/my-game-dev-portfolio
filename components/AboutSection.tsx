import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="mx-auto max-w-6xl px-6">
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 items-start">
        <div className="relative h-56 w-56 overflow-hidden rounded-xl border border-[var(--color-border)]/40 bg-[#0c0e14]/60">
          <Image src="/images/avatar.svg" alt="Avatar" fill className="object-cover" />
        </div>
        <div>
          <h1 className="font-[var(--font-orbitron)] text-3xl text-zinc-100">About</h1>
          <div className="mt-4 space-y-3 text-zinc-300">
            <p>
              Unity Game Developer at <span className="text-neon-cyan font-semibold">Pixls</span> focused on mobile performance, gameplay
              systems, and player retention. I prototype fast, measure constantly, and ship responsibly.
            </p>
            <p>
              On the AI side, I explore LLM-driven behaviors: dialogue, memory, tool-use, and tuning workflows that actually fit inside a
              production pipeline.
            </p>
            <p className="text-zinc-400">
              Note: I enjoy anime and a bit of dark humor. If you’re into long-form worldbuilding and spicy code reviews, we’ll get along.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


