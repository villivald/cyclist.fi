"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { useMediaQuery, XS_MOBILE_MEDIA_QUERY } from "@/hooks/use-media-query";
import styles from "@/styles/FloatingActions.module.css";

import DropdownMenu from "./dropdown-menu";
import LanguageSwitcher from "./language-switcher";
import SavedButton from "./saved-button";
import SearchButton from "./search-button";
import ThemeSwitcher from "./theme-switcher";

export default function Menu() {
  const t = useTranslations("Menu");
  const isNarrowMobile = useMediaQuery(XS_MOBILE_MEDIA_QUERY);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const floatingActions =
    isNarrowMobile && mounted ? (
      <div
        className={styles.floatingActions}
        role="toolbar"
        aria-label={t("floatingActions")}
      >
        <SearchButton />
        <ThemeSwitcher />
      </div>
    ) : null;

  return (
    <>
      <nav aria-label={t("label")}>
        {!isNarrowMobile && <SearchButton />}
        <SavedButton />
        {!isNarrowMobile && <ThemeSwitcher />}
        <LanguageSwitcher />
        <DropdownMenu />
      </nav>

      {floatingActions && createPortal(floatingActions, document.body)}
    </>
  );
}
