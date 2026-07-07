"use client";

import { usePathname } from "next/navigation";

import styles from "@/styles/Header.module.css";

import SearchComponent from "../search/search-component";
import Logo from "./logo";
import Menu from "./menu-container";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header
      className={`${styles.headerContainer} ${isHome ? styles.home : styles.compact}`}
      data-variant={isHome ? "home" : "compact"}
    >
      <Logo compact={!isHome} />
      <p
        className={styles.brandTitle}
        data-testid="brand-title"
        aria-hidden="true"
      >
        CYCLIST
      </p>
      <SearchComponent />
      <Menu />
    </header>
  );
}
