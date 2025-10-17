"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

import styles from "@/styles/Menu.module.css";

const MENU_ITEMS = [
  "apparel",
  "bikes",
  "books",
  "community",
  "retailers",
  "events",
  "indoor",
  "magazines",
  "maintenance",
  "nutrition",
  "places",
  "podcasts",
  "social",
  "technology",
  "tour",
  "training",
  "tv",
  "youtube",
];

export default function DropdownMenu() {
  const t = useTranslations("Pages");
  const tMenu = useTranslations("Menu");

  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);

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

      {menuOpen && (
        <div ref={menuRef}>
          <ul
            className={styles.menu}
            data-open={menuOpen}
            id="main-menu"
            role="menu"
          >
            {[...MENU_ITEMS]
              .map((item: string) => ({
                item,
                translatedItem: t(item).toLowerCase(),
              }))
              .sort((a, b) => a.translatedItem.localeCompare(b.translatedItem))
              .map(({ item, translatedItem }) => (
                <li key={item} role="none">
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
      )}
    </div>
  );
}
