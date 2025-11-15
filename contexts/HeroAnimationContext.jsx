import { createContext, useContext, useState } from "react";

const HeroAnimationContext = createContext(undefined);

export function HeroAnimationProvider({ children }) {
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

