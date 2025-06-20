import { useTranslations } from "next-intl";

import styles from "@/styles/GridContainer.module.css";

import GridBlock from "./grid-block";

export default function GridContainer() {
  const t = useTranslations("Pages");

  const upperLinks = [
    { title: t("brands"), link: "/brands" },
    { title: t("youtube"), link: "/youtube" },
    { title: t("magazines"), link: "/magazines" },
    { title: t("discounts"), link: "/discounts" },
    { title: t("podcasts"), link: "/podcasts" },
    { title: t("tv"), link: "/tv" },
    { title: t("indoor"), link: "/indoor" },
    { title: t("places"), link: "/places" },
    { title: t("tour"), link: "/tour" },
  ];

  const lowerLinks = [
    { title: t("books"), link: "/books" },
    { title: t("sharing"), link: "/sharing" },
    { title: t("caring"), link: "/caring" },
    { title: t("social"), link: "/social" },
    { title: "Test", link: "/test" },
    { title: "Test", link: "/test" },
    { title: "Test", link: "/test" },
    { title: "Test", link: "/test" },
    { title: "Test", link: "/test" },
  ];

  return (
    <section className={styles.gridContainer}>
      <GridBlock links={upperLinks} />
      <GridBlock links={lowerLinks} />
    </section>
  );
}
