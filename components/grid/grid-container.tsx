import { useTranslations } from "next-intl";

import type { PageComponentData } from "@/components/page-component/types";
import styles from "@/styles/GridContainer.module.css";
import { getRoutesByGroup } from "@/utils/route-manifest";

import GridBlock from "./grid-block";

const upperRoutes = getRoutesByGroup("upper");
const lowerRoutes = getRoutesByGroup("lower");

interface GridContainerProps {
  previews: Record<string, PageComponentData[]>;
}

export default function GridContainer({ previews }: GridContainerProps) {
  const t = useTranslations("Pages");

  const upperLinks = upperRoutes.map((r) => ({
    title: t(r.slug),
    link: `/${r.slug}`,
    preview: previews[r.slug] ?? [],
  }));

  const lowerLinks = lowerRoutes.map((r) => ({
    title: t(r.slug),
    link: `/${r.slug}`,
    preview: previews[r.slug] ?? [],
  }));

  return (
    <section className={styles.gridContainer}>
      <GridBlock links={upperLinks} label={t("upperGrid")} />
      <GridBlock links={lowerLinks} label={t("lowerGrid")} />
    </section>
  );
}
