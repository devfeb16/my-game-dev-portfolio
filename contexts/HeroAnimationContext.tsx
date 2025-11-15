import { createContext, useContext, useState, ReactNode } from "react";

type HeroAnimationContextType = {
  isAnimating: boolean;
  setIsAnimating: (isAnimating: boolean) => void;
};

const HeroAnimationContext = createContext<HeroAnimationContextType | undefined>(undefined);

export function HeroAnimationProvider({ children }: { children: ReactNode }) {
  const [isAnimating, setIsAnimating] = useState(true);

  return (
    <HeroAnimationContext.Provider value={{ isAnimating, setIsAnimating }}>
      {children}
    </HeroAnimationContext.Provider>
  );
}

export function useHeroAnimation() {
  const context = useContext(HeroAnimationContext);
  if (context === undefined) {
    throw new Error("useHeroAnimation must be used within a HeroAnimationProvider");
  }
  return context;
}

