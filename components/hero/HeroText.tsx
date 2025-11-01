"use client";
import { useEffect, useState } from "react";
import GameButton from "../GameButton";

type HeroTextProps = {
  headline?: string;
  subtitle?: string;
  primaryCta?: { href: string; label: string; ariaLabel?: string };
  secondaryCta?: { href: string; label: string; ariaLabel?: string };
  className?: string;
  onAnimationComplete?: () => void;
  startDelay?: number;
};

export default function HeroText({
  headline = "I Build Mobile Worlds — Unity, LLMs, & Persistent Play",
  subtitle = "Let's make something that's hard to put down.",
  primaryCta = { href: "/projects", label: "See Me Cook!" },
  secondaryCta = { href: "/contact", label: "Game On!" },
  className,
  onAnimationComplete,
  startDelay = 0,
}: HeroTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [subtitleText, setSubtitleText] = useState("");
  const [showButtons, setShowButtons] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (startDelay > 0) {
      const delayTimer = setTimeout(() => {
        setIsTyping(true);
        startTyping();
      }, startDelay);
      return () => clearTimeout(delayTimer);
    } else {
      setIsTyping(true);
      startTyping();
    }
  }, [startDelay]);

  const startTyping = () => {
    // Type headline character by character
    let headlineIndex = 0;
    const headlineInterval = setInterval(() => {
      if (headlineIndex < headline.length) {
        setDisplayText(headline.slice(0, headlineIndex + 1));
        headlineIndex++;
      } else {
        clearInterval(headlineInterval);
        
        // Start subtitle after a brief pause
        setTimeout(() => {
          let subtitleIndex = 0;
          const subtitleInterval = setInterval(() => {
            if (subtitleIndex < subtitle.length) {
              setSubtitleText(subtitle.slice(0, subtitleIndex + 1));
              subtitleIndex++;
            } else {
              clearInterval(subtitleInterval);
              
              // Show buttons after subtitle completes
              setTimeout(() => {
                setShowButtons(true);
                setIsTyping(false);
                onAnimationComplete?.();
              }, 500);
            }
          }, 30); // Typing speed for subtitle
        }, 300);
      }
    }, 50); // Typing speed for headline
  };

  return (
    <div className={`relative z-10 mx-0 lg:mx-auto max-w-none lg:max-w-6xl px-0 md:px-2 pt-6 md:pt-8 pb-8 ${className || ""}`}>
      <div className="relative">
        <div className="absolute -inset-4 bg-[#0b0f12]/60 blur-xl"></div>
        <h1 className="relative font-[var(--font-orbitron)] text-[clamp(1.85rem,5.5vw,4rem)] md:text-[clamp(2rem,5vw,4.25rem)] leading-[1.05] md:leading-[1] tracking-wide text-zinc-100 drop-shadow-[0_0_20px_rgba(0,216,255,0.3)]">
          {displayText}
          {isTyping && displayText.length < headline.length && (
            <span className="inline-block w-1 h-[1em] bg-neon-cyan ml-1 animate-pulse">|</span>
          )}
        </h1>
      </div>
      <div className="relative mt-5">
        <div className="absolute -inset-3 bg-[#0b0f12]/40 blur-lg"></div>
        <p className="relative text-[clamp(0.95rem,2vw,1.25rem)] md:text-[clamp(1rem,1.8vw,1.375rem)] font-medium text-zinc-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          {subtitleText}
          {isTyping && subtitleText.length > 0 && subtitleText.length < subtitle.length && (
            <span className="inline-block w-1 h-[1em] bg-neon-cyan ml-1 animate-pulse">|</span>
          )}
          {subtitleText.length === subtitle.length && (
            <span className="ml-2 block sm:inline text-zinc-500 text-[0.85rem] md:text-sm align-baseline">anime fan • dark humor • will roast your bugs (gently).</span>
          )}
        </p>
      </div>
      <div className={`mt-8 flex flex-wrap items-center gap-4 transition-opacity duration-500 ${showButtons ? 'opacity-100' : 'opacity-0'}`}>
        {showButtons && (
          <>
            <GameButton href={primaryCta.href} label={primaryCta.label} />
            <GameButton href={secondaryCta.href} label={secondaryCta.label} variant="secondary" />
          </>
        )}
      </div>
    </div>
  );
}

