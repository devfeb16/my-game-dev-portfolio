import GameButton from "./GameButton";

type HeroIntroProps = {
  headline?: string;
  subtitle?: string;
  primaryCta?: { href: string; label: string; ariaLabel?: string };
  secondaryCta?: { href: string; label: string; ariaLabel?: string };
  className?: string;
};

export default function HeroIntro({
  headline = "I Build Mobile Worlds — Unity, LLMs, & Persistent Play",
  subtitle = "Let’s make something that’s hard to put down.",
  primaryCta = { href: "/projects", label: "See My Work" },
  secondaryCta = { href: "/contact", label: "Hire Me" },
  className,
}: HeroIntroProps) {
  return (
    <div className={`relative z-10 mx-auto max-w-6xl px-6 pt-24 pb-10 ${className || ""}`}>
      <div className="relative">
        <div className="absolute -inset-4 bg-[#0b0f12]/60 blur-xl"></div>
        <h1 className="relative font-[var(--font-orbitron)] text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] tracking-wide text-zinc-100 drop-shadow-[0_0_20px_rgba(0,216,255,0.3)]">
          {headline}
        </h1>
      </div>
      <div className="relative mt-5">
        <div className="absolute -inset-3 bg-[#0b0f12]/40 blur-lg"></div>
        <p className="relative text-[clamp(1rem,2.2vw,1.375rem)] font-medium text-zinc-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          {subtitle}
          <span className="ml-2 text-zinc-500 text-sm align-baseline">anime fan • dark humor • will roast your bugs (gently).</span>
        </p>
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <GameButton href={primaryCta.href} label={primaryCta.label} />
        <GameButton href={secondaryCta.href} label={secondaryCta.label} variant="secondary" />
      </div>
    </div>
  );
}


