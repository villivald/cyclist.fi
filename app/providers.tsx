"use client";

import { createContext, useState } from "react";

export const ThemeContext = createContext(
  {} as {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
  },
);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("light");

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
