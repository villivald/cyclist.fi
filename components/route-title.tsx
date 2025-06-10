"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import styles from "@/styles/Routes.module.css";

export default function RouteTitle() {
  const t = useTranslations("Pages");

  const title = usePathname().substring(1);
  const translatedTitle = t(usePathname().substring(1)).toUpperCase();

  const colors = [
    { green: ["brands", "tv", "indoor", "sharing", "social"] },
    { teal: ["youtube", "discounts", "places", "caring", "design"] },
    { wine: ["magazines", "podcasts", "tour", "books"] },
  ];

  const pageColor = Object.keys(
    colors.filter((color) => Object.values(color)[0].includes(title))[0],
  )[0];

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
