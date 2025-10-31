import Image from "next/image";

export default function FeaturedProject() {
  return (
    <section className="mx-auto mt-14 max-w-6xl px-6">
      <h2 className="font-[var(--font-orbitron)] text-2xl text-zinc-100">Featured Project</h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 rounded-xl border border-[var(--color-border)]/40 bg-[#0c0e14]/60 p-4">
        <div className="relative h-64 w-full overflow-hidden rounded-lg">
          <Image src="/images/featured.svg" alt="Featured" fill className="object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-xl text-neon-cyan">Neon Drift</h3>
          <p className="mt-2 text-zinc-400">
            Procedurally generated tracks, dynamic difficulty, and optimized GPU particles designed for mobile performance at Pixls.
          </p>
          <div className="mt-4 text-sm text-zinc-400">Unity • C# • URP • Addressables</div>
          <div className="mt-6">
            <a href="/projects" className="text-neon-magenta hover:underline">See details</a>
          </div>
        </div>
      </div>
    </section>
  );
}




