"use client";

import { useTranslations } from "next-intl";

import type { PageComponentData } from "@/components/page-component/types";
import { S_MOBILE_MEDIA_QUERY, useMediaQuery } from "@/hooks/use-media-query";
import styles from "@/styles/GridContainer.module.css";
import { getRoutesByGroup, RouteEntry } from "@/utils/route-manifest";

import GridBlock from "./grid-block";

const upperRoutes = getRoutesByGroup("upper");
const lowerRoutes = getRoutesByGroup("lower");

interface GridContainerProps {
  previews: Record<string, PageComponentData[]>;
}

export default function GridContainer({ previews }: GridContainerProps) {
  const t = useTranslations("Pages");

  const isMobile = useMediaQuery(S_MOBILE_MEDIA_QUERY);

  const getLinkItems = (routes: readonly RouteEntry[]) => {
    return routes.map((r) => ({
      title: t(r.slug),
      link: `/${r.slug}`,
      preview: previews[r.slug] ?? [],
    }));
  };

  const upperLinks = getLinkItems(upperRoutes);
  const lowerLinks = getLinkItems(lowerRoutes);

  return (
    <section
      className={isMobile ? styles.phoneGridContainer : styles.gridContainer}
    >
      {isMobile ? (
        <>
          <GridBlock
            links={[...upperLinks, ...lowerLinks]}
            label={t("mainGrid")}
          />
        </>
      ) : (
        <>
          <GridBlock links={upperLinks} label={t("upperGrid")} />
          <GridBlock links={lowerLinks} label={t("lowerGrid")} />
        </>
      )}
    </section>
  );
}
