import { createContext, useContext, useState, ReactNode } from "react";

type LoaderContextType = {
  isLoaderComplete: boolean;
  setLoaderComplete: (complete: boolean) => void;
};

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [isLoaderComplete, setLoaderComplete] = useState(false);

  return (
    <LoaderContext.Provider value={{ isLoaderComplete, setLoaderComplete }}>
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoaderContext);
  if (context === undefined) {
    // Return default values if not in provider (for non-home pages)
    return { isLoaderComplete: true, setLoaderComplete: () => {} };
  }
  return context;
}

