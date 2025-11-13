"use client";
import { useEffect, useState } from "react";
import HeroBackground from "./HeroBackground";
import HeroIntro, { DEFAULT_HEADLINE } from "./HeroIntro";
import HeroCubes from "./HeroCubes";
import HeroStats from "./HeroStats";
import FloatingCodeSnippets from "./FloatingCodeSnippets";
import PlaceholderSection from "./PlaceholderSection";

type HeroProps = {
  className?: string;
  headline?: string;
  subtitle?: string;
};

type HeroStage = "background" | "headline" | "rest";

export default function Hero({ className, headline, subtitle }: HeroProps) {
  const [stage, setStage] = useState<HeroStage>("background");
  const [displayHeadline, setDisplayHeadline] = useState("");
  const [reduceMotion, setReduceMotion] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);

  const effectiveHeadline = headline ?? DEFAULT_HEADLINE;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event: MediaQueryListEvent) => setReduceMotion(event.matches);

    setReduceMotion(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    if (typeof mediaQuery.addListener === "function") {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setStage("rest");
      setDisplayHeadline(effectiveHeadline);
      setDetailsVisible(true);
      return;
    }

    setStage("background");
    setDisplayHeadline("");
    setDetailsVisible(false);

    const showHeadlineTimer = window.setTimeout(() => setStage("headline"), 1000);

    return () => window.clearTimeout(showHeadlineTimer);
  }, [reduceMotion, effectiveHeadline]);

  useEffect(() => {
    if (reduceMotion || stage !== "headline") {
      return;
    }

    let index = 0;
    const characters = Array.from(effectiveHeadline);
    let finishTimer: number | undefined;

    setDisplayHeadline("");

    const intervalId = window.setInterval(() => {
      index += 1;
      setDisplayHeadline(characters.slice(0, index).join(""));

      if (index >= characters.length) {
        window.clearInterval(intervalId);
        finishTimer = window.setTimeout(() => setStage("rest"), 220);
      }
    }, 55);

    return () => {
      window.clearInterval(intervalId);
      if (typeof finishTimer !== "undefined") {
        window.clearTimeout(finishTimer);
      }
    };
  }, [reduceMotion, stage, effectiveHeadline]);

  useEffect(() => {
    if (stage === "rest") {
      setDisplayHeadline(effectiveHeadline);
    }
  }, [stage, effectiveHeadline]);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    if (stage === "background" || stage === "headline") {
      setDetailsVisible(false);
      return;
    }

    const revealTimer = window.setTimeout(() => setDetailsVisible(true), 260);

    return () => window.clearTimeout(revealTimer);
  }, [stage, reduceMotion]);

  const showHeadline = stage !== "background";
  const showDetails = reduceMotion ? true : detailsVisible;
  const caretActive = stage === "headline" && !reduceMotion;

  return (
    <section
      className={`relative isolate min-h-[92vh] w-full overflow-hidden bg-[#0b0f12] ${className || ""}`}
      aria-label="Hero"
    >
      <HeroBackground />

      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#0b0f12]/80 via-[#0b0f12]/55 to-transparent pointer-events-none"></div>

      <div className="relative z-10 mx-0 grid max-w-none lg:max-w-none grid-cols-1 items-start gap-10 px-2 md:px-4 lg:px-6 pt-16 md:pt-20 lg:pt-24 pb-12 md:grid-cols-12">
        <div className="md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3">
          <HeroIntro
            headline={headline}
            subtitle={subtitle}
            displayHeadline={displayHeadline}
            showHeadline={showHeadline}
            showDetails={showDetails}
            caretActive={caretActive}
          />
          <div
            className={`transition-all duration-700 ease-out ${showDetails ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
            style={showDetails ? { transitionDelay: "160ms" } : undefined}
            aria-hidden={!showDetails}
          >
            <FloatingCodeSnippets />
            <div className="mt-8 hidden md:block">
              <HeroStats />
            </div>
          </div>
        </div>

        <div
          className={`md:hidden transition-all duration-700 ease-out ${showDetails ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
          style={showDetails ? { transitionDelay: "260ms" } : undefined}
          aria-hidden={!showDetails}
        >
          <div className="mt-6 md:hidden">
            <HeroStats />
          </div>
        </div>
      </div>
      <div
        className={`mt-6 transition-all duration-700 ease-out ${showDetails ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
        style={showDetails ? { transitionDelay: "320ms" } : undefined}
        aria-hidden={!showDetails}
      >
        <PlaceholderSection />
      </div>
    </section>
  );
}


