import GameButton from "./GameButton";
import { SiFiverr, SiUpwork, SiLinkedin } from "react-icons/si";

export const DEFAULT_HEADLINE = "Your Next Mobile Game Hit. Built in Unity.";
export const DEFAULT_SUBTITLE = "I build games that are hard to put down.";

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
}) {
  const headlineToRender = displayHeadline ?? headline;
  const caretClass = caretActive ? "hero-typewriter--active" : "hero-typewriter--inactive";

  return (
    <div
      className={`relative z-10 mx-0 lg:mx-auto max-w-none lg:max-w-6xl px-0 md:px-2 pt-2 md:pt-3 pb-3 transition-opacity duration-700 ease-out ${
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
        className={`relative mt-3 transform transition-all duration-700 ease-out ${
          showDetails ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
        }`}
        style={showDetails ? { transitionDelay: "140ms" } : {}}
        aria-hidden={!showDetails}
      >
        <div className="absolute -inset-3 bg-[#0b0f12]/45 blur-xl"></div>
        <p className="relative text-[clamp(0.95rem,2vw,1.25rem)] md:text-[clamp(1rem,1.8vw,1.375rem)] font-medium text-zinc-100/90 drop-shadow-[0_20px_45px_rgba(0,0,0,0.65)]">
          {subtitle}
          <span className="ml-2 block sm:text-zinc-100/70 text-[0.85rem] md:text-sm align-baseline">anime fan • dark humor • will roast your bugs (gently).</span>
        </p>
      </div>
      <div
        className={`mt-4 flex flex-wrap items-center gap-4 transition-all duration-700 ease-out ${
          showDetails ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
        }`}
        style={showDetails ? { transitionDelay: "220ms" } : {}}
        aria-hidden={!showDetails}
      >
        <GameButton href={primaryCta.href} label={primaryCta.label} />
        <GameButton href={secondaryCta.href} label={secondaryCta.label} variant="secondary" />
      </div>
      <div
        className={`mt-3 flex items-center gap-5 text-zinc-100/80 transition-all duration-700 ease-out ${
          showDetails ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
        }`}
        style={showDetails ? { transitionDelay: "300ms" } : {}}
        aria-hidden={!showDetails}
      >
        <a
          href="https://www.fiverr.com/s/EgQz3ey"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Fiverr profile"
          className="transform transition duration-200 hover:-translate-y-0.5 hover:text-[#1dbf73]"
        >
          <SiFiverr className="h-7 w-7" />
          <span className="sr-only">Fiverr profile</span>
        </a>
        <a
          href="https://www.upwork.com/freelancers/~015f09e4ce1f66527f?p=1804023285153173504"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Upwork profile"
          className="transform transition duration-200 hover:-translate-y-0.5 hover:text-[#14a800]"
        >
          <SiUpwork className="h-7 w-7" />
          <span className="sr-only">Upwork profile</span>
        </a>
        <a
          href="https://www.linkedin.com/in/muhammad-adeel-3836b8274"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
          className="transform transition duration-200 hover:-translate-y-0.5 hover:text-[#0a66c2]"
        >
          <SiLinkedin className="h-7 w-7" />
          <span className="sr-only">LinkedIn profile</span>
        </a>
      </div>
    </div>
  );
}


