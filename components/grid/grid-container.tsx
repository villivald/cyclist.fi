import { useTranslations } from "next-intl";

import styles from "@/styles/GridContainer.module.css";
import { getRoutesByGroup } from "@/utils/route-manifest";

import GridBlock from "./grid-block";

const upperRoutes = getRoutesByGroup("upper");
const lowerRoutes = getRoutesByGroup("lower");

export default function GridContainer() {
  const t = useTranslations("Pages");

  const upperLinks = upperRoutes.map((r) => ({
    title: t(r.slug),
    link: `/${r.slug}`,
  }));

  const lowerLinks = lowerRoutes.map((r) => ({
    title: t(r.slug),
    link: `/${r.slug}`,
  }));

  return (
    <section className={styles.gridContainer}>
      <GridBlock links={upperLinks} label={t("upperGrid")} />
      <GridBlock links={lowerLinks} label={t("lowerGrid")} />
    </section>
  );
}
