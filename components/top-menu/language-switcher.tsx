"use client";

import { Locale } from "i18n/config";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { setUserLocale } from "services/locale";

import styles from "@/styles/LanguageSwitcher.module.css";

const LanguageSwitcher = () => {
  const t = useTranslations("LanguageSwitcher");
  const { theme } = useTheme();

  const [appTheme, setAppTheme] = useState<string>();

  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setAppTheme(theme);
  }, [theme]);

  const locale = useLocale() as Locale;

  const languages = {
    en: t("en"),
    fi: t("fi"),
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

  const getTextStyle = () => {
    return {
      background: `url(/icons/${locale}.svg)`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundClip: "text",
    };
  };

  const optionIsActive = (option: string) => {
    return locale === option;
  };

  return (
    <div
      className={`${styles.languageSwitcher} ${mounted ? styles.mounted : ""}`}
    >
      <button
        data-theme={appTheme}
        onClick={handleToggleLanguage}
        onKeyDown={handleKeyDown}
        aria-label={`${t("switchLanguage")} ${optionIsActive("en") ? t("fi") : t("en")}`}
        className={styles.languageToggleButton}
      >
        <span
          className={styles.toggleOption}
          data-active={optionIsActive("en")}
          style={optionIsActive("en") ? getTextStyle() : undefined}
        >
          EN
        </span>
        <span className={styles.toggleDivider}>/</span>
        <span
          className={styles.toggleOption}
          data-active={optionIsActive("fi")}
          style={optionIsActive("fi") ? getTextStyle() : undefined}
        >
          FI
        </span>
      </button>

      <span className={styles.srOnly}>
        {`${t("currentLanguage")} ${languages[locale]}`}
      </span>
    </div>
  );
};

export default LanguageSwitcher;
