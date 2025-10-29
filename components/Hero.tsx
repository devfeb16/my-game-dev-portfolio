"use client";
import HeroBackground from "./HeroBackground";
import HeroIntro from "./HeroIntro";
import HeroCubes from "./HeroCubes";
import HeroStats from "./HeroStats";
import FloatingCodeSnippets from "./FloatingCodeSnippets";

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

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-6 pt-28 pb-16 md:grid-cols-12">
        <div className="md:col-span-2"></div>
        <div className="md:col-span-6">
          <HeroIntro headline={headline} subtitle={subtitle} />
          <FloatingCodeSnippets />
          <div className="mt-8 hidden md:block">
            <HeroStats />
          </div>
        </div>

        <div className="md:col-span-4 md:pl-8">
          <HeroCubes />
          <div className="mt-6 md:hidden">
            <HeroStats />
          </div>
        </div>
      </div>
    </section>
  );
}


