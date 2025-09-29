import Link from "next/link";
import { useTranslations } from "next-intl";

import styles from "@/styles/SkipLinks.module.css";

export default function SkipLinks() {
  const t = useTranslations("Common");

  return (
    <nav
      className={styles.skipLinksContainer}
      aria-label={t("skipLinks_label")}
      tabIndex={-1}
    >
      <Link href="#main-content">{t("skipLinks_mainContent")}</Link>
      <Link href="#contact-links">{t("skipLinks_contacts")}</Link>
    </nav>
  );
}
