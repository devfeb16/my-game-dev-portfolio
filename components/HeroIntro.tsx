import GameButton from "./GameButton";

export const DEFAULT_HEADLINE = "Your Next Mobile Game Hit. Built in Unity.";
export const DEFAULT_SUBTITLE = "I build games that are hard to put down.";

type HeroIntroProps = {
  headline?: string;
  subtitle?: string;
  primaryCta?: { href: string; label: string; ariaLabel?: string };
  secondaryCta?: { href: string; label: string; ariaLabel?: string };
  className?: string;
  displayHeadline?: string;
  showHeadline?: boolean;
  showDetails?: boolean;
  caretActive?: boolean;
};

export default function HeroIntro({
  headline = DEFAULT_HEADLINE,
  subtitle = DEFAULT_SUBTITLE,
  primaryCta = { href: "/projects", label: "See Me Cook!" },
  secondaryCta = { href: "/contact", label: "Game On!" },
  className,
  displayHeadline,
  showHeadline = true,
  showDetails = true,
  caretActive = false,
}: HeroIntroProps) {
  const headlineToRender = displayHeadline ?? headline;
  const caretClass = caretActive ? "hero-typewriter--active" : "hero-typewriter--inactive";

  return (
    <div
      className={`relative z-10 mx-0 lg:mx-auto max-w-none lg:max-w-6xl px-0 md:px-2 pt-6 md:pt-8 pb-8 transition-opacity duration-700 ease-out ${
        showHeadline ? "opacity-100" : "opacity-0"
      } ${className || ""}`}
      aria-hidden={!showHeadline}
    >
      <div className="relative">
        <div className="absolute -inset-4 bg-[#0b0f12]/55 blur-2xl"></div>
        <h1 className="relative font-[var(--font-orbitron)] text-[clamp(1.85rem,5.5vw,4rem)] md:text-[clamp(2rem,5vw,4.25rem)] leading-[1.05] md:leading-[1] tracking-wide text-[#f8fbff] drop-shadow-[0_0_28px_rgba(0,210,255,0.45)]">
          <span className={`hero-typewriter ${caretClass}`}>{headlineToRender}</span>
        </h1>
      </div>
      <div
        className={`relative mt-5 transform transition-all duration-700 ease-out ${
          showDetails ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
        }`}
        style={showDetails ? { transitionDelay: "140ms" } : undefined}
        aria-hidden={!showDetails}
      >
        <div className="absolute -inset-3 bg-[#0b0f12]/45 blur-xl"></div>
        <p className="relative text-[clamp(0.95rem,2vw,1.25rem)] md:text-[clamp(1rem,1.8vw,1.375rem)] font-medium text-zinc-100/90 drop-shadow-[0_20px_45px_rgba(0,0,0,0.65)]">
          {subtitle}
          <span className="ml-2 block sm:inline text-zinc-100/70 text-[0.85rem] md:text-sm align-baseline">anime fan • dark humor • will roast your bugs (gently).</span>
        </p>
      </div>
      <div
        className={`mt-8 flex flex-wrap items-center gap-4 transition-all duration-700 ease-out ${
          showDetails ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
        }`}
        style={showDetails ? { transitionDelay: "220ms" } : undefined}
        aria-hidden={!showDetails}
      >
        <GameButton href={primaryCta.href} label={primaryCta.label} />
        <GameButton href={secondaryCta.href} label={secondaryCta.label} variant="secondary" />
      </div>
    </div>
  );
}


