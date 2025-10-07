"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";

import styles from "@/styles/Menu.module.css";

const ThemeSwitcher = () => {
  const t = useTranslations("Menu");
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);

  const handleChangeTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  if (!mounted) {
    return (
      <button type="button" className={styles.themeButton}>
        <Image
          src="/icons/sun_color.svg"
          alt={t("themeToggle")}
          width={44}
          height={44}
        />
        <p>{t("theme")}</p>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`${styles.themeButton} ${mounted ? styles.mounted : ""}`}
      onClick={handleChangeTheme}
      data-testid="theme-toggle-button"
    >
      <Image
        src={
          theme === "light" ? "/icons/sun_color.svg" : "/icons/moon_color.svg"
        }
        alt={t("themeToggle")}
        width={44}
        height={44}
      />
      <p>{t("theme")}</p>
    </button>
  );
};

export default ThemeSwitcher;
