"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import styles from "@/styles/Routes.module.css";
import { getRouteColor } from "@/utils/get-route-color";

export default function RouteTitle() {
  const t = useTranslations("Pages");

  const title = usePathname().substring(1);
  const translatedTitle = t(usePathname().substring(1)).toUpperCase();

  const pageColor = getRouteColor(title);

  const titleStyles = {
    "--stringLength": title.length,
    "--pageColor": `var(--color-${pageColor})`,
  } as React.CSSProperties;

  return (
    <h1 className={styles.title} style={titleStyles}>
      {translatedTitle}
    </h1>
  );
}
