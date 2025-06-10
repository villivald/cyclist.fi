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

  return (
    <footer className={styles.footerContainer}>
      <section>
        <span>{t("description")}</span>
        <span>© 2025</span>
      </section>
      <section>
        <div>
          {links.map((link: LinkItem, index: number) => (
            <a key={index} href={link.link}>
              {link.title}
            </a>
          ))}
        </div>
      </section>
    </footer>
  );
}
