import Link from "next/link";

import styles from "@/styles/Logo.module.css";

export default function Logo() {
  return (
    <div className={styles.logoContainer}>
      <Link className={styles.title} href="/">
        C
      </Link>
    </div>
  );
}
