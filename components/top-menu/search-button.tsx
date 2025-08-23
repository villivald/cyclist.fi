"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import styles from "@/styles/SearchButton.module.css";

const SearchButton = () => {
  const t = useTranslations("Search");
  const { theme } = useTheme();

  const [appTheme, setAppTheme] = useState<string>();

  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setAppTheme(theme);
  }, [theme]);

  const handleOpenSearch = () => {
    window.dispatchEvent(new CustomEvent("open-search"));
  };

  if (!mounted) {
    return (
      <button
        type="button"
        data-theme={appTheme}
        className={styles.searchButton}
        onClick={() => {}}
      >
        <Image
          src="/icons/search.svg"
          alt={t("search")}
          width={44}
          height={44}
        />
        <p>{t("search")}</p>
      </button>
    );
  }

  return (
    <button
      type="button"
      data-theme={appTheme}
      className={`${styles.searchButton} ${mounted ? styles.mounted : ""}`}
      onClick={handleOpenSearch}
    >
      <Image src="/icons/search.svg" alt={t("search")} width={44} height={44} />
      <p>{t("search")}</p>
    </button>
  );
};

export default SearchButton;
