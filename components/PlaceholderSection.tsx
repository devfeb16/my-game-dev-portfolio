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
        <div className="relative overflow-hidden rounded-2xl bg-[#0c141d]/85 p-8 md:p-12 shadow-[0_35px_120px_rgba(8,16,24,0.55)] ring-1 ring-white/5">
          <div className="pointer-events-none absolute -inset-8 bg-gradient-to-br from-white/8 via-transparent to-transparent blur-3xl"></div>
          <div className="mx-auto max-w-4xl text-left">
            <h2 className="font-[var(--font-orbitron)] text-[clamp(1.5rem,4vw,2.5rem)] leading-tight text-[#f4f8ff] drop-shadow-[0_0_30px_rgba(0,180,255,0.4)]">
              {title}
            </h2>
            <p className="mt-3 text-[clamp(0.95rem,2vw,1.125rem)] text-zinc-100/95 drop-shadow-[0_15px_35px_rgba(0,0,0,0.55)]">
              {description}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1 text-[12px] text-zinc-100/85 shadow-[0_12px_40px_rgba(0,200,255,0.25)] backdrop-blur">
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


