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
  label = "Reserved for future large visual",
  title = "Crafting Playable Worlds",
  description = "I design and build mobile-first game experiences with tight feel, stylish UI, and systems that scale. From Unity gameplay loops to LLM-driven NPCs and persistent progression, I love turning ideas into something you can’t put down.",
  minHeightClassName = "min-h-[50vh] md:min-h-[60vh]",
}: PlaceholderSectionProps) {
  return (
    <section
      aria-label="Reserved Placeholder"
      className={`relative isolate w-full border-t border-[var(--color-border)]/40 ${minHeightClassName} ${className || ""}`}
    >
      <div className="relative mx-0 lg:mx-auto max-w-none lg:max-w-7xl px-3 md:px-6 py-14 md:py-16">
        <div className="rounded-2xl border border-[var(--color-border)]/30 bg-[#0c1117]/20 backdrop-blur-sm p-8 md:p-12">
          <div className="mx-auto max-w-4xl text-left">
            <h2 className="font-[var(--font-orbitron)] text-[clamp(1.5rem,4vw,2.5rem)] leading-tight text-zinc-100 drop-shadow-[0_0_28px_rgba(0,216,255,0.35)]">
              {title}
            </h2>
            <p className="mt-3 text-[clamp(0.95rem,2vw,1.125rem)] text-zinc-200 drop-shadow-[0_0_10px_rgba(0,216,255,0.18)]">
              {description}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-dashed border-[var(--color-border)]/60 px-3 py-1 text-[12px] text-zinc-300 shadow-[0_0_20px_rgba(0,216,255,0.2)]">
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


