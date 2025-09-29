import { useTranslations } from "next-intl";

import styles from "@/styles/GridContainer.module.css";

import GridBlock from "./grid-block";

export default function GridContainer() {
  const t = useTranslations("Pages");

  const upperLinks = [
    { title: t("apparel"), link: "/apparel" },
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
    { title: t("community"), link: "/community" },
    { title: t("maintenance"), link: "/maintenance" },
    { title: t("social"), link: "/social" },
    { title: t("bikes"), link: "/bikes" },
    { title: t("events"), link: "/events" },
    { title: t("nutrition"), link: "/nutrition" },
    { title: t("training"), link: "/training" },
    { title: t("technology"), link: "/technology" },
  ];

  return (
    <section className={styles.gridContainer}>
      <GridBlock links={upperLinks} label={t("upperGrid")} />
      <GridBlock links={lowerLinks} label={t("lowerGrid")} />
    </section>
  );
}
