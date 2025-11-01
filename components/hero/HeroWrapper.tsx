"use client";
import { useState, useEffect } from "react";
import HeroBackground from "./HeroBackground";
import HeroText from "./HeroText";
import HeroNavbar from "./HeroNavbar";
import HeroStats from "../HeroStats";
import FloatingCodeSnippets from "../FloatingCodeSnippets";
import PlaceholderSection from "../PlaceholderSection";

type HeroWrapperProps = {
  className?: string;
  headline?: string;
  subtitle?: string;
  primaryCta?: { href: string; label: string; ariaLabel?: string };
  secondaryCta?: { href: string; label: string; ariaLabel?: string };
};

export default function HeroWrapper({
  className,
  headline,
  subtitle,
  primaryCta,
  secondaryCta,
}: HeroWrapperProps) {
  const [loaderComplete, setLoaderComplete] = useState(false);
  const [textAnimationStarted, setTextAnimationStarted] = useState(false);
  const [textAnimationComplete, setTextAnimationComplete] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  // Start text animation after loader completes (loader runs for 4 seconds, then 1 second delay = 5 seconds total)
  useEffect(() => {
    if (loaderComplete) {
      const timer = setTimeout(() => {
        setTextAnimationStarted(true);
      }, 1000); // 1 second delay after loader completes (total ~5 seconds from page load)
      return () => clearTimeout(timer);
    }
  }, [loaderComplete]);

  // Show navbar after text animation completes
  useEffect(() => {
    if (textAnimationComplete) {
      const timer = setTimeout(() => {
        setShowNavbar(true);
      }, 300); // Small delay after text completes
      return () => clearTimeout(timer);
    }
  }, [textAnimationComplete]);

  return (
    <>
      <HeroNavbar visible={showNavbar} />
      
      <section
        className={`relative isolate min-h-[92vh] w-full overflow-hidden bg-[#0b0f12] ${className || ""}`}
        aria-label="Hero"
      >
        <HeroBackground onLoaderComplete={() => setLoaderComplete(true)} />

        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#0b0f12]/80 via-[#0b0f12]/55 to-transparent pointer-events-none"></div>

        {/* Only show content after loader completes */}
        {loaderComplete && (
          <div className="relative z-10 mx-0 grid max-w-none lg:max-w-none grid-cols-1 items-start gap-10 px-2 md:px-4 lg:px-6 pt-16 md:pt-20 lg:pt-24 pb-12 md:grid-cols-12">
            <div className="md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3">
              {textAnimationStarted && (
                <HeroText
                  headline={headline}
                  subtitle={subtitle}
                  primaryCta={primaryCta}
                  secondaryCta={secondaryCta}
                  onAnimationComplete={() => setTextAnimationComplete(true)}
                  startDelay={0}
                />
              )}
              {textAnimationComplete && (
                <>
                  <FloatingCodeSnippets />
                  <div className="mt-8 hidden md:block">
                    <HeroStats />
                  </div>
                </>
              )}
            </div>

            {textAnimationComplete && (
              <div className="md:hidden">
                <div className="mt-6 md:hidden">
                  <HeroStats />
                </div>
              </div>
            )}
          </div>
        )}
        
        {textAnimationComplete && (
          <div className="mt-6">
            <PlaceholderSection />
          </div>
        )}
      </section>
    </>
  );
}

