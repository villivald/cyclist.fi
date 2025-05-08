"use client";

import { Locale } from "i18n/config";
import { useLocale } from "next-intl";
import { setUserLocale } from "services/locale";

import styles from "@/styles/LanguageSwitcher.module.css";

const LanguageSwitcher = () => {
  const locale = useLocale() as Locale;

  const languages = {
    en: "English",
    fi: "Finnish",
  };

  const handleToggleLanguage = () => {
    const newLocale = locale === "en" ? "fi" : "en";
    setUserLocale(newLocale as Locale);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggleLanguage();
    }
  };

  return (
    <div className={styles.languageSwitcherContainer}>
      <button
        onClick={handleToggleLanguage}
        onKeyDown={handleKeyDown}
        aria-label={`Switch language to ${locale === "en" ? "Finnish" : "English"}`}
        className={styles.languageToggleButton}
      >
        <span className={styles.toggleOption} data-active={locale === "en"}>
          EN
        </span>
        <span className={styles.toggleDivider}>/</span>
        <span className={styles.toggleOption} data-active={locale === "fi"}>
          FI
        </span>
      </button>

      <span className={styles.srOnly}>
        Currently selected language: {languages[locale]}
      </span>
    </div>
  );
};

export default LanguageSwitcher;
