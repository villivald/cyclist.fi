"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import styles from "@/styles/ProposeContent.module.css";

export default function ProposeContent() {
  const t = useTranslations("ContactForm");
  const [isNearBottom, setIsNearBottom] = useState<boolean>(false);

  useEffect(() => {
    // Only add scroll listener on large screens where button needs to raise
    if (window.innerWidth < 1000) {
      return; // No need to track scroll on small screens
    }

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;

      // Check if we're within 200px of the bottom
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
      setIsNearBottom(distanceFromBottom < 200);
    };

    handleScroll(); // Check initial position
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <Link
      href="/contact?subject=content_suggestion"
      className={`${styles.fab} ${isNearBottom ? styles.raised : ""}`}
      aria-label={t("suggest_content_fab")}
    >
      <svg
        className={styles.fabIcon}
        viewBox="0 0 72 72"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <polygon
          fill="currentColor"
          points="31,31 31,13 41,13 41,31 59,31 59,41 41,41 41,59 31,59 31,41 13,41 13,31"
        />
      </svg>
      <span className={styles.fabText}>{t("suggest_content_fab")}</span>
    </Link>
  );
}
