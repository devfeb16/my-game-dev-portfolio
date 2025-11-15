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
      <div className="relative mx-auto max-w-7xl px-3 md:px-6 py-14 md:py-16 flex flex-col items-center justify-center">
        <div className="relative w-fit max-w-4xl overflow-hidden rounded-2xl bg-[#08131f]/94 p-8 md:p-12 shadow-[0_0_30px_rgba(255,255,255,0.2),0_0_60px_rgba(255,255,255,0.1),inset_0_0_30px_rgba(255,255,255,0.05)] backdrop-blur-sm border border-white/10">
          <div className="text-center">
            <h2 className="relative font-[var(--font-orbitron)] text-[clamp(1.65rem,4.2vw,2.85rem)] leading-tight text-white">
              <span>
                {title}
              </span>
            </h2>
            <p className="mt-4 text-[clamp(1.05rem,2.3vw,1.3rem)] text-white leading-relaxed tracking-[0.02em]">
              {description}
            </p>
            <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-[13px] font-semibold uppercase tracking-[0.3em] text-white shadow-[0_0_20px_rgba(255,255,255,0.3),0_0_40px_rgba(255,255,255,0.15),inset_0_0_20px_rgba(255,255,255,0.1)] backdrop-blur-sm">
              {label}
            </div>
          </div>
        </div>
        <div className="mt-8 w-full max-w-5xl flex justify-center">
          <HeroCubes variant="bright" />
        </div>
      </div>
    </section>
  );
}


