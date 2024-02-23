"use client";

import Image from "next/image";
import { useEffect } from "react";

import styles from "@/styles/ScrollToTopButton.module.css";

export default function ScrollToTopButton() {
  useEffect(() => {
    const scrollToTopButton = document.getElementById("scrollToTop");
    const scrollFunction = () => {
      if (
        document.body.scrollTop > 1200 ||
        document.documentElement.scrollTop > 1200
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
      className={styles.button}
      aria-label="Scroll to top"
      id="scrollToTop"
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
