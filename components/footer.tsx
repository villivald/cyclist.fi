import Link from "next/link";
import { useTranslations } from "next-intl";

import styles from "@/styles/Footer.module.css";

interface LinkItem {
  title: string;
  link: string;
  type: "internal" | "external";
}

export default function Footer() {
  const t = useTranslations("Footer");

  const links = [
    { title: t("contact"), link: "/contact", type: "internal" },
    { title: t("design"), link: "/design", type: "internal" },
    {
      title: t("coffee"),
      link: "https://buymeacoffee.com/cyclist",
      type: "external",
    },
    { title: t("newsletter"), link: "/newsletter", type: "internal" },
    {
      title: t("instagram"),
      link: "https://www.instagram.com/cyclist.fi",
      type: "external",
    },
    { title: t("facebook"), link: "/facebook", type: "internal" },
  ] as LinkItem[];

  const year = new Date().getFullYear();

  return (
    <footer className={styles.footerContainer} id="contact-links">
      <section>
        <span>{t("description")}</span>
        <span>© {year}</span>
      </section>
      <nav className={styles.footerNav}>
        <ul>
          {links.map((link: LinkItem) => (
            <li key={link.link}>
              <Link
                href={link.link}
                target={link.type === "external" ? "_blank" : "_self"}
                rel={
                  link.type === "external" ? "noopener noreferrer" : undefined
                }
              >
                {link.title}
              </Link>
              {link.type === "external" && <span aria-hidden="true">↗</span>}
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
