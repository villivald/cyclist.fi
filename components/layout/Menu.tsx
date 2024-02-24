"use client";

import Image from "next/image";
import { useState, useContext } from "react";

import { ThemeContext } from "app/providers";

import styles from "@/styles/Menu.module.css";

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { theme, setTheme } = useContext(ThemeContext);

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (e.relatedTarget === null) {
      setMenuOpen(false);
    }
  };

  const handleChangeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const menuItems = [
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

  return (
    <div>
      <button onClick={handleChangeTheme}>
        <Image
          src={
            theme === "light"
              ? "./icons/sun_color.svg"
              : "./icons/moon_color.svg"
          }
          alt="Theme toggle icon"
          width={46}
          height={46}
        />
        Theme
      </button>
      <div onClick={() => setMenuOpen(!menuOpen)} onBlur={handleBlur}>
        <button
          className={styles.dropdownButton}
          aria-haspopup="true"
          data-open={menuOpen}
        >
          <span className={styles.burger} data-open={menuOpen}>
            <span></span>
            <span></span>
            <span></span>
          </span>
          Menu
        </button>
        <ul className={styles.menu} data-open={menuOpen}>
          {menuItems.map((item) => (
            <li key={item}>
              <a href={`/${item}`}>{item}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
