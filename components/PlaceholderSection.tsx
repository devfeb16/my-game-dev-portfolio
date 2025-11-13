import HeroCubes from "./HeroCubes";

type PlaceholderSectionProps = {
  className?: string;
  label?: string;
  title?: string;
  description?: string;
  minHeightClassName?: string;
};

export default function PlaceholderSection({
  className,
  label = "I don't just code, I build worlds to play.",
  title = "Crafting Playable Worlds",
  description = "I design and build mobile-first game experiences with tight feel, stylish UI, and systems that scale. From Unity gameplay loops to LLM-driven NPCs and persistent progression, I love turning ideas into something you can’t put down.",
  minHeightClassName = "min-h-[50vh] md:min-h-[60vh]",
}: PlaceholderSectionProps) {
  return (
    <section
      aria-label="Reserved Placeholder"
      className={`relative isolate z-10 w-full ${minHeightClassName} ${className || ""}`}
    >
      <div className="relative mx-0 lg:mx-auto max-w-none lg:max-w-7xl px-3 md:px-6 py-14 md:py-16">
        <div className="relative overflow-hidden rounded-2xl bg-[#07101a]/92 p-8 md:p-12 shadow-[0_45px_160px_rgba(4,12,24,0.75)] ring-1 ring-cyan-400/15">
          <div className="pointer-events-none absolute -inset-10 bg-gradient-to-br from-cyan-400/30 via-transparent to-transparent blur-[140px]"></div>
          <div className="mx-auto max-w-4xl text-left">
            <h2 className="relative font-[var(--font-orbitron)] text-[clamp(1.65rem,4.2vw,2.85rem)] leading-tight text-transparent bg-clip-text bg-gradient-to-tr from-[#f4fbff] via-[#7de8ff] to-[#fbd7ff] drop-shadow-[0_0_38px_rgba(0,210,255,0.58)]">
              <span className="before:absolute before:-inset-1 before:-z-10 before:rounded-xl before:bg-white/6 before:blur-lg before:content-[''] after:absolute after:inset-x-0 after:-bottom-2 after:h-px after:bg-gradient-to-r after:from-transparent after:via-[#6be7ff]/60 after:to-transparent after:opacity-80 after:content-['']">
                {title}
              </span>
            </h2>
            <p className="mt-4 text-[clamp(1.05rem,2.3vw,1.3rem)] text-white/95 drop-shadow-[0_22px_48px_rgba(0,0,0,0.78)] leading-relaxed tracking-wide">
              {description}
            </p>
            <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-white/12 px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.3em] text-white shadow-[0_25px_55px_rgba(45,210,255,0.28)] backdrop-blur-md">
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


