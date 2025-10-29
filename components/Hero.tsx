"use client";
import HeroBackground from "./HeroBackground";
import HeroIntro from "./HeroIntro";
import HeroCubes from "./HeroCubes";
import HeroStats from "./HeroStats";
import FloatingCodeSnippets from "./FloatingCodeSnippets";
import PlaceholderSection from "./PlaceholderSection";

type HeroProps = {
  className?: string;
  headline?: string;
  subtitle?: string;
};

export default function Hero({ className, headline, subtitle }: HeroProps) {
  return (
    <section
      className={`relative isolate min-h-[92vh] w-full overflow-hidden bg-[#0b0f12] ${className || ""}`}
      aria-label="Hero"
    >
      <HeroBackground />

      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#0b0f12] via-[#0b0f12]/85 to-transparent pointer-events-none"></div>

      <div className="relative z-10 mx-0 grid max-w-none lg:max-w-none grid-cols-1 items-start gap-10 px-2 md:px-4 lg:px-6 pt-16 md:pt-20 lg:pt-24 pb-12 md:grid-cols-12">
        <div className="md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3">
          <HeroIntro headline={headline} subtitle={subtitle} />
          <FloatingCodeSnippets />
          <div className="mt-8 hidden md:block">
            <HeroStats />
          </div>
        </div>

        <div className="md:hidden">
          <div className="mt-6 md:hidden">
            <HeroStats />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <PlaceholderSection />
      </div>
    </section>
  );
}


