import Link from "next/link";

import styles from "@/styles/Logo.module.css";

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`${styles.logoContainer} ${compact ? styles.compact : ""}`}>
      <Link className={styles.title} href="/" aria-label="Cyclist.fi home">
        C
      </Link>
    </div>
  );
}
