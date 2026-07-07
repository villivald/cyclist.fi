"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { S_MOBILE_MEDIA_QUERY, useMediaQuery } from "@/hooks/use-media-query";
import styles from "@/styles/Menu.module.css";
import { getGridRouteColor, GRID_ROUTE_SLUGS } from "@/utils/route-manifest";

export default function DropdownMenu() {
  const t = useTranslations("Pages");
  const tMenu = useTranslations("Menu");

  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);

  const isMobile = useMediaQuery(S_MOBILE_MEDIA_QUERY);

  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleMenuToggle = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const handleMenuButtonKeyDown = (e: React.KeyboardEvent) => {
    if (menuOpen && e.key === "Tab" && e.shiftKey) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        menuButtonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }

      if (event.key === "Tab") {
        const menuLinks = Array.from(
          menuRef.current?.querySelectorAll("a") || [],
        );
        if (!menuLinks.length) return;

        const first = menuLinks[0];
        const last = menuLinks[menuLinks.length - 1];
        const active = document.activeElement;

        if (!event.shiftKey && active === last) {
          setMenuOpen(false);
        } else if (
          event.shiftKey &&
          (active === first || active === menuButtonRef.current)
        ) {
          setMenuOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  // Lock background scrolling while the full-screen sheet is open on phones.
  useEffect(() => {
    if (!menuOpen || !isMobile) return;

    const { overflow } = document.documentElement.style;
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = overflow;
    };
  }, [menuOpen, isMobile]);

  if (!mounted) {
    return (
      <div className={styles.dropdownMenu}>
        <button className={styles.dropdownButton}>
          <span className={styles.burger}>
            <span></span>
            <span></span>
            <span></span>
          </span>
          <p>{tMenu("dropdown")}</p>
        </button>
      </div>
    );
  }

  return (
    <div className={`${styles.dropdownMenu} ${mounted ? styles.mounted : ""}`}>
      <button
        type="button"
        ref={menuButtonRef}
        className={styles.dropdownButton}
        aria-controls="main-menu"
        aria-haspopup="true"
        aria-expanded={menuOpen}
        onClick={handleMenuToggle}
        onKeyDown={handleMenuButtonKeyDown}
      >
        <span className={styles.burger} data-open={menuOpen}>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <p>{tMenu("dropdown")}</p>
      </button>

      {menuOpen &&
        isMobile &&
        createPortal(
          <div className={styles.backdrop} aria-hidden="true" />,
          document.body,
        )}

      {menuOpen &&
        (() => {
          const menuList = (
            <div ref={menuRef} className={styles.sheet} data-open={menuOpen}>
              <div className={styles.sheetHeader}>
                <p className={styles.sheetTitle}>{tMenu("navigate")}</p>
                <button
                  type="button"
                  className={styles.sheetClose}
                  onClick={() => {
                    setMenuOpen(false);
                    menuButtonRef.current?.focus();
                  }}
                  aria-label={tMenu("close")}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <ul
                className={styles.menu}
                data-open={menuOpen}
                id="main-menu"
                role="menu"
              >
                {[...GRID_ROUTE_SLUGS]
                  .map((item: string) => ({
                    item,
                    translatedItem: t(item).toLowerCase(),
                  }))
                  .map(({ item, translatedItem }) => (
                    <li
                      key={item}
                      role="none"
                      style={
                        {
                          "--routeColor": `var(--color-${getGridRouteColor(item)})`,
                        } as React.CSSProperties
                      }
                    >
                      <Link
                        href={`/${item}`}
                        role="menuitem"
                        onClick={() => setMenuOpen(false)}
                      >
                        {translatedItem}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          );

          return isMobile ? createPortal(menuList, document.body) : menuList;
        })()}
    </div>
  );
}
