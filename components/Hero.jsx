import { useEffect, useState } from "react";
import HeroBackground from "./HeroBackground";
import HeroIntro, { DEFAULT_HEADLINE } from "./HeroIntro";
import HeroCubes from "./HeroCubes";
import HeroStats from "./HeroStats";
import FloatingCodeSnippets from "./FloatingCodeSnippets";
import PlaceholderSection from "./PlaceholderSection";
import { useHeroAnimation } from "@/contexts/HeroAnimationContext";
import { useLoader } from "@/contexts/LoaderContext";

export default function Hero({ className, headline, subtitle }) {
  const [stage, setStage] = useState("background");
  const [displayHeadline, setDisplayHeadline] = useState("");
  const [reduceMotion, setReduceMotion] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const { setIsAnimating } = useHeroAnimation();
  const { isLoaderComplete } = useLoader();

  const effectiveHeadline = headline ?? DEFAULT_HEADLINE;

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion)");
    const handleChange = (event) => {
      const matches = typeof event === "object" && "matches" in event 
        ? event.matches 
        : (event.matches !== undefined ? event.matches : false);
      setReduceMotion(matches);
    };

    // Set initial value - with mobile compatibility check
    setReduceMotion(mediaQuery.matches);

    // Use modern API with fallback for older mobile browsers
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else if (typeof mediaQuery.addListener === "function") {
      // Fallback for older browsers (iOS Safari < 14)
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  useEffect(() => {
    // Wait for loader to complete before starting hero animation
    if (!isLoaderComplete) {
      return;
    }

    if (reduceMotion) {
      setStage("rest");
      setDisplayHeadline(effectiveHeadline);
      setDetailsVisible(true);
      setIsAnimating(false);
      return;
    }

    setStage("background");
    setDisplayHeadline("");
    setDetailsVisible(false);
    setIsAnimating(true);

    // Add a small delay to ensure DOM is ready, especially on mobile
    // This helps with mobile browsers that may throttle timers during initial load
    const showHeadlineTimer = window.setTimeout(() => {
      // Double-check that we're still in background stage (component not unmounted)
      setStage((prevStage) => prevStage === "background" ? "headline" : prevStage);
    }, 1000);

    return () => window.clearTimeout(showHeadlineTimer);
  }, [reduceMotion, effectiveHeadline, setIsAnimating, isLoaderComplete]);

  useEffect(() => {
    if (reduceMotion || stage !== "headline") {
      return;
    }

    let index = 0;
    const characters = Array.from(effectiveHeadline);
    let finishTimer;
    let animationFrameId;
    const frameDelay = 55; // ms per character
    let startTime = null;

    setDisplayHeadline("");

    const animate = (currentTime) => {
      if (startTime === null) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;
      const targetIndex = Math.min(
        Math.floor(elapsed / frameDelay) + 1,
        characters.length
      );

      if (targetIndex > index) {
        index = targetIndex;
        setDisplayHeadline(characters.slice(0, index).join(""));

        if (index >= characters.length) {
          if (animationFrameId !== undefined) {
            cancelAnimationFrame(animationFrameId);
          }
          finishTimer = window.setTimeout(() => {
            setStage("rest");
            setIsAnimating(false);
          }, 220);
          return;
        }
      }

      // Continue animation if not complete
      if (index < characters.length) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    // Use requestAnimationFrame for better mobile compatibility
    // Add a small delay to ensure the page is ready on mobile devices
    // This delay helps mobile browsers that may throttle during initial page load
    const startDelay = window.setTimeout(() => {
      // Start animation - we're already in headline stage (checked in useEffect condition)
      animationFrameId = requestAnimationFrame(animate);
    }, 50);

    return () => {
      if (startDelay !== undefined) {
        window.clearTimeout(startDelay);
      }
      if (animationFrameId !== undefined) {
        cancelAnimationFrame(animationFrameId);
      }
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
            style={showDetails ? { transitionDelay: "160ms" } : {}}
            aria-hidden={!showDetails}
          >
            <FloatingCodeSnippets />
            <div className="mt-8 hidden md:block">
              <HeroStats />
            </div>
          </div>
        </div>

        <div
          className={`md:transition-all duration-700 ease-out ${showDetails ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
          style={showDetails ? { transitionDelay: "260ms" } : {}}
          aria-hidden={!showDetails}
        >
          <div className="mt-6 md:block">
            <HeroStats />
          </div>
        </div>
      </div>
      <div
        className={`mt-6 transition-all duration-700 ease-out ${showDetails ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
        style={showDetails ? { transitionDelay: "320ms" } : {}}
        aria-hidden={!showDetails}
      >
        <PlaceholderSection />
      </div>
    </section>
  );
}


