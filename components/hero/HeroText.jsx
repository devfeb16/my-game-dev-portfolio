"use client";
import { useEffect, useState } from "react";
import GameButton from "../GameButton";

export default function HeroText({
  headline = "I Build Mobile Worlds — Unity, LLMs, & Persistent Play",
  subtitle = "Let's make something that's hard to put down.",
  primaryCta = { href: "/projects", label: "See Me Cook!" },
  secondaryCta = { href: "/contact", label: "Game On!" },
  className,
  onAnimationComplete,
  startDelay = 0,
}) {
  const [displayText, setDisplayText] = useState("");
  const [subtitleText, setSubtitleText] = useState("");
  const [showButtons, setShowButtons] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [headingRevealed, setHeadingRevealed] = useState(false);
  const [subtitleRevealed, setSubtitleRevealed] = useState(false);

  useEffect(() => {
    if (startDelay > 0) {
      const delayTimer = setTimeout(() => {
        setIsTyping(true);
        // reveal heading as we start typing so CSS transitions are visible
        setHeadingRevealed(true);
        startTyping();
      }, startDelay);
      return () => clearTimeout(delayTimer);
    } else {
      setIsTyping(true);
      setHeadingRevealed(true);
      startTyping();
    }
  }, [startDelay]);

  const startTyping = () => {
    // Use async per-character typing so timings are precise and easier to tune
    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

    const run = async () => {
      // reveal heading container immediately
      setHeadingRevealed(true);

      // headline typing: ~100ms per char (feel free to tweak)
      const headlineMs = 100; // ms per character => long/visible
      for (let i = 1; i <= headline.length; i++) {
        setDisplayText(headline.slice(0, i));
        await sleep(headlineMs);
      }

      // small pause after headline
      await sleep(500);

      // subtitle typing: ~60ms per char
      const subtitleMs = 60;
      for (let i = 1; i <= subtitle.length; i++) {
        setSubtitleText(subtitle.slice(0, i));
        await sleep(subtitleMs);
      }

      // reveal subtitle and then CTAs
      setSubtitleRevealed(true);
      await sleep(400);
      setShowButtons(true);
      setIsTyping(false);

      // allow buttons to animate in, then signal parent
      await sleep(350);
      onAnimationComplete?.();
    };

    run().catch(() => {
      // ensure we clear typing state on error
      setIsTyping(false);
      setShowButtons(true);
      onAnimationComplete?.();
    });
  };

  return (
    <div className={`relative z-10 mx-0 lg-auto max-w-none lg-w-6xl px-0 md-2 pt-6 md-8 pb-8 ${className || ""}`}>
      <div className="relative">
        <div className="absolute -inset-4 bg-[#0b0f12]/60 blur-xl"></div>
        <h1 className={`relative typewriter-heading text-[clamp(1.85rem,5.5vw,4rem)] md-[clamp(2rem,5vw,4.25rem)] leading-[1.05] md-[1] tracking-wide text-zinc-100 drop-shadow-[0_0_20px_rgba(0,216,255,0.3)] reveal reveal--slow ${headingRevealed ? 'show' : ''}`} aria-label={headline}>
          <span className="typewriter-caret">{displayText}</span>
        </h1>
      </div>
      <div className={`relative mt-5 reveal reveal--fast ${subtitleRevealed ? 'show' : ''}`}>
        <div className="absolute -inset-3 bg-[#0b0f12]/40 blur-lg"></div>
        <p className="relative text-[clamp(0.95rem,2vw,1.25rem)] md-[clamp(1rem,1.8vw,1.375rem)] font-medium text-zinc-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          {subtitleText}
          {isTyping && subtitleText.length > 0 && subtitleText.length < subtitle.length && (
            <span className="inline-block w-1 h-[1em] bg-neon-cyan ml-1 animate-pulse">|</span>
          )}
          {subtitleText.length === subtitle.length && (
            <span className="ml-2 block sm-zinc-500 text-[0.85rem] md-sm align-baseline">anime fan • dark humor • will roast your bugs (gently).</span>
          )}
        </p>
      </div>
      <div className={`mt-8 flex flex-wrap items-center gap-4 reveal reveal--fast ${showButtons ? 'show' : ''}`} style={showButtons ? { transitionDelay: '120ms' } : {}}>
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

