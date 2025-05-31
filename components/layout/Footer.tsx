import { useTranslations } from "next-intl";

import styles from "@/styles/Footer.module.css";

export default function Footer() {
  const t = useTranslations("Footer");

  const links = [
    { title: t("contact"), link: "/contact" },
    { title: t("design"), link: "/design" },
    { title: t("coffee"), link: "/coffee" },
    { title: t("newsletter"), link: "/newsletter" },
    { title: t("instagram"), link: "/instagram" },
    { title: t("facebook"), link: "/facebook" },
  ];

  return (
    <footer className={styles.footerContainer}>
      <section>
        <span>{t("description")}</span>
        <span>© 2025</span>
      </section>
      <section>
        <div>
          {links.map((link, index) => (
            <a key={index} href={link.link}>
              {link.title}
            </a>
          ))}
        </div>
      </section>
    </footer>
  );
}
