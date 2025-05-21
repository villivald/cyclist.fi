"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import styles from "@/styles/ScrollToTopButton.module.css";

export default function ScrollToTopButton() {
  const { theme } = useTheme();

  const [appTheme, setAppTheme] = useState<string>();

  useEffect(() => {
    setAppTheme(theme);
  }, [theme]);

  useEffect(() => {
    const scrollToTopButton = document.getElementById("scrollToTop");
    const scrollFunction = () => {
      if (
        (document.body.scrollTop > 1200 ||
          document.documentElement.scrollTop > 1200) &&
        window.innerWidth > 1000
      ) {
        scrollToTopButton!.style.display = "block";
      } else {
        scrollToTopButton!.style.display = "none";
      }
    };
    window.onscroll = () => {
      scrollFunction();
    };
  }, []);

  return (
    <button
      id="scrollToTop"
      aria-label="Scroll to top"
      className={styles.button}
      data-theme={appTheme}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <Image
        src="/icons/arrow_up.svg"
        alt="Scroll to top"
        width={32}
        height={32}
      />
    </button>
  );
}
