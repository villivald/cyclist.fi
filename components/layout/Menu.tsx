"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";

import styles from "@/styles/Menu.module.css";

import LanguageSwitcher from "./LanguageSwitcher";

const MENU_ITEMS = [
  "books",
  "brands",
  "caring",
  "discounts",
  "indoor",
  "magazines",
  "places",
  "podcasts",
  "sharing",
  "social",
  "tour",
  "tv",
  "youtube",
];

export default function Menu() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleChangeTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

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

  if (!mounted) return null;

  return (
    <div>
      <button onClick={handleChangeTheme}>
        <Image
          src={
            theme === "light" ? "/icons/sun_color.svg" : "/icons/moon_color.svg"
          }
          alt="Theme toggle icon"
          width={46}
          height={46}
        />
        <p>Theme</p>
      </button>

      <LanguageSwitcher />

      <div>
        <button
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
          <p>Menu</p>
        </button>

        {menuOpen && (
          <div ref={menuRef}>
            <ul
              className={styles.menu}
              data-open={menuOpen}
              id="main-menu"
              role="menu"
            >
              {MENU_ITEMS.map((item) => (
                <li key={item} role="none">
                  <a href={`/${item}`} role="menuitem">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
