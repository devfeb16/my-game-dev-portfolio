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
      <h1 className="font-[var(--font-orbitron)] text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] tracking-wide text-zinc-100">
        {headline}
      </h1>
      <p className="mt-5 text-[clamp(1rem,2.2vw,1.375rem)] font-medium text-zinc-300">
        {subtitle}
        <span className="ml-2 text-zinc-500 text-sm align-baseline">anime fan • dark humor • will roast your bugs (gently).</span>
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <GameButton href={primaryCta.href} label={primaryCta.label} />
        <GameButton href={secondaryCta.href} label={secondaryCta.label} variant="secondary" />
      </div>
    </div>
  );
}


