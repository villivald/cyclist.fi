"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { MouseEvent, useCallback } from "react";

import styles from "@/styles/SkipLinks.module.css";

export default function SkipLinks() {
  const t = useTranslations("Common");

  const createSkipHandler = useCallback(
    (targetId: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      const el = document.getElementById(targetId);
      if (!el) return;

      event.preventDefault();

      const previousTabIndex = el.getAttribute("tabindex");
      if (previousTabIndex === null) {
        el.setAttribute("tabindex", "-1");
      }
      el.focus({ preventScroll: true });

      // If focusing the container didn't stick, try the first focusable descendant
      if (document.activeElement !== el) {
        const focusable = el.querySelector<HTMLElement>(
          'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable) {
          focusable.focus({ preventScroll: true });
        }
      }

      el.scrollIntoView({ block: "start" });

      if (previousTabIndex === null) {
        el.removeAttribute("tabindex");
      }
    },
    [],
  );

  return (
    <nav
      className={styles.skipLinksContainer}
      aria-label={t("skipLinks_label")}
      tabIndex={-1}
    >
      <Link href="#main-content" onClick={createSkipHandler("main-content")}>
        {t("skipLinks_mainContent")}
      </Link>
      <Link href="#contact-links" onClick={createSkipHandler("contact-links")}>
        {t("skipLinks_contacts")}
      </Link>
    </nav>
  );
}
