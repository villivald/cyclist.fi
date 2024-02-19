import Logo from "./Logo";
import Menu from "./Menu";

import styles from "@/styles/Header.module.css";

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <Logo />
      <h1>CYCLIST</h1>
      <Menu />
    </header>
  );
}
