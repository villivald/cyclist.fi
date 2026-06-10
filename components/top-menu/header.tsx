import styles from "@/styles/Header.module.css";

import SearchComponent from "../search/search-component";
import Logo from "./logo";
import Menu from "./menu-container";

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <Logo />
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
