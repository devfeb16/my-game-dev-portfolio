import Image from "next/image";

export default function HeroHighlight() {
  return (
    <section className="relative mx-auto mt-8 max-w-6xl px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 rounded-xl border border-[var(--color-border)]/40 bg-[#0c0e14]/60 p-4 shadow-[0_0_40px_-10px_rgba(34,211,238,0.15)]">
          <div className="relative h-64 w-full overflow-hidden rounded-lg">
            <Image src="/images/featured.svg" alt="Featured Game" fill className="object-cover" priority />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <h3 className="font-[var(--font-orbitron)] text-xl text-zinc-100">Featured: Neon Drift</h3>
            <span className="text-neon-cyan text-sm">Unity • Mobile</span>
          </div>
          <p className="mt-2 text-zinc-400 text-sm">
            High-speed arcade racer with procedural tracks and GPU-driven VFX.
          </p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)]/40 bg-[#0c0e14]/60 p-6 flex flex-col justify-center">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-neon-cyan">12+</div>
              <div className="text-zinc-400 text-xs">Shipped titles</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-neon-magenta">3M+</div>
              <div className="text-zinc-400 text-xs">Mobile downloads</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-neon-green">6</div>
              <div className="text-zinc-400 text-xs">Years experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-neon-blue">4</div>
              <div className="text-zinc-400 text-xs">LLM/ML prototypes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


