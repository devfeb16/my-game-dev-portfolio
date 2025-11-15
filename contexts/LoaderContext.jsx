import { createContext, useContext, useState } from "react";

const LoaderContext = createContext(undefined);

export function LoaderProvider({ children }) {
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

