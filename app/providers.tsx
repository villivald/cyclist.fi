"use client";

import { ThemeProvider as BaseThemeProvider } from "next-themes";
import { useEffect } from "react";

type ThemeProviderProps = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !("serviceWorker" in navigator) ||
      process.env.NODE_ENV !== "production"
    )
      return;

    const onControllerChange = () => {
      window.location.reload();
    };
    navigator.serviceWorker.addEventListener(
      "controllerchange",
      onControllerChange,
    );

    const register = async () => {
      try {
        await navigator.serviceWorker.register("/sw.js", { scope: "/" });
      } catch (error) {
        console.error("Service worker registration failed:", error);
      }
    };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(register);
    } else {
      setTimeout(register, 1500);
    }

    return () => {
      navigator.serviceWorker.removeEventListener(
        "controllerchange",
        onControllerChange,
      );
    };
  }, []);

  return (
    <BaseThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
    >
      {children}
    </BaseThemeProvider>
  );
};

export default ThemeProvider;
