"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import styles from "@/styles/Routes.module.css";
import { getRouteColor } from "@/utils/get-route-color";
import { getRoute } from "@/utils/route-manifest";

const ROUTE_TITLE_SLUGS_WITHOUT_MANIFEST = ["saved"] as const;

const shouldShowRouteTitle = (slug: string) =>
  Boolean(getRoute(slug)) ||
  ROUTE_TITLE_SLUGS_WITHOUT_MANIFEST.includes(
    slug as (typeof ROUTE_TITLE_SLUGS_WITHOUT_MANIFEST)[number],
  );

export default function RouteTitle() {
  const pathname = usePathname();
  const slug = pathname.substring(1);
  const t = useTranslations("Pages");

  if (!shouldShowRouteTitle(slug)) {
    return null;
  }

  const translatedTitle = t(slug).toUpperCase();
  const pageColor = getRouteColor(slug);

  const titleStyles = {
    "--stringLength": translatedTitle.length,
    "--pageColor": `var(--color-${pageColor})`,
  } as React.CSSProperties;

  return (
    <h2 className={styles.title} style={titleStyles} data-testid="route-title">
      {translatedTitle}
    </h2>
  );
}
