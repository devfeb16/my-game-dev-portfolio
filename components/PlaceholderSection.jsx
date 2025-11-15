import HeroCubes from "./HeroCubes";

export default function PlaceholderSection({
  className,
  label = "I don't just code, I build worlds to play.",
  title = "Crafting Playable Worlds",
  description = "I design and build mobile-first game experiences with tight feel, stylish UI, and systems that scale. I love turning ideas into something you can’t put down.",
  minHeightClassName = "min-h-[50vh] md-h-[60vh]",
}) {
  return (
    <section
      aria-label="Reserved Placeholder"
      className={`relative isolate z-10 w-full ${minHeightClassName} ${className || ""}`}
    >
      <div className="relative mx-0 lg-auto max-w-none lg-w-7xl px-3 md-6 py-14 md-16">
        <div className="relative overflow-hidden rounded-2xl bg-[#08131f]/94 p-8 md:p-12">
          <div className="mx-auto max-w-4xl text-left">
            <h2 className="relative font-[var(--font-orbitron)] text-[clamp(1.65rem,4.2vw,2.85rem)] leading-tight text-white">
              <span>
                {title}
              </span>
            </h2>
            <p className="mt-4 text-[clamp(1.05rem,2.3vw,1.3rem)] text-white leading-relaxed tracking-[0.02em]">
              {description}
            </p>
            <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-cyan-200/35 bg-white/14 px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.3em] text-white">
              {label}
            </div>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-5xl">
          <HeroCubes variant="bright" />
        </div>
      </div>
    </section>
  );
}


