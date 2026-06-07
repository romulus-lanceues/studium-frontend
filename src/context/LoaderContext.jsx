import { useState, useContext, createContext } from "react";

const LoaderContext = createContext();

export function useLoaderContext() {
  return useContext(LoaderContext);
}

export function LoaderContextProvider({ children }) {
  const [fullScreenLoading, setFullScreenLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ fullScreenLoading, setFullScreenLoading }}>
      {children}
    </LoaderContext.Provider>
  );
}
