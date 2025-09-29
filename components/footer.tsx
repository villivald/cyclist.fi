import Link from "next/link";
import { useTranslations } from "next-intl";

import styles from "@/styles/Footer.module.css";

interface LinkItem {
  title: string;
  link: string;
}

export default function Footer() {
  const t = useTranslations("Footer");

  const links = [
    { title: t("contact"), link: "/contact" },
    { title: t("design"), link: "/design" },
    { title: t("coffee"), link: "/coffee" },
    { title: t("newsletter"), link: "/newsletter" },
    { title: t("instagram"), link: "/instagram" },
    { title: t("facebook"), link: "/facebook" },
  ] as LinkItem[];

  const year = new Date().getFullYear();

  return (
    <footer className={styles.footerContainer} id="contact-links" tabIndex={-1}>
      <section>
        <span>{t("description")}</span>
        <span>© {year}</span>
      </section>
      <nav className={styles.footerNav}>
        <ul>
          {links.map((link: LinkItem) => (
            <li key={link.link}>
              <Link href={link.link}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
