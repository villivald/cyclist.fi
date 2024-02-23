"use client";

import { createContext, useState } from "react";

export const ThemeContext = createContext(
  {} as {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
  }
);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("light");

  // Global state object (combination of all global state variables) to be passed to all components via context
  // Each of the state variables can be accessed across the app like so: const { state, action } = useContext(ThemeContext);
  const globalState = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={globalState}>
      {children}
    </ThemeContext.Provider>
  );
}
