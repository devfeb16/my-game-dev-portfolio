export default function ContactCTA() {
  return (
    <section className="mx-auto my-16 max-w-6xl px-6 text-center">
      <div className="rounded-xl border border-neon-blue/40 bg-neon-blue/10 p-10">
        <h3 className="font-[var(--font-orbitron)] text-2xl text-zinc-100">
          Let’s build the next immersive experience together.
        </h3>
        <a
          href="/contact"
          className="mt-6 inline-block rounded-md border border-neon-blue/60 bg-neon-blue/20 px-6 py-3 text-neon-blue hover:bg-neon-blue/30 transition-colors"
        >
          Get in touch
        </a>
      </div>
    </section>
  );
}


