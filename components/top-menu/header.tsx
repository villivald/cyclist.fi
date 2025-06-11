import styles from "@/styles/Header.module.css";

import Logo from "./logo";
import Menu from "./menu-container";

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <Logo />
      <h1>CYCLIST</h1>
      <Menu />
    </header>
  );
}
