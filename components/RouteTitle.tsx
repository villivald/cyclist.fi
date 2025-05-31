"use client";

import { usePathname } from "next/navigation";

import styles from "@/styles/Routes.module.css";

export default function RouteTitle() {
  const title = usePathname().substring(1).toUpperCase();

  const colors = [
    { green: ["brands", "tv", "indoor", "sharing", "social"] },
    { teal: ["youtube", "discounts", "places", "caring"] },
    { wine: ["magazines", "podcasts", "tour", "books"] },
  ];

  const pageColor = Object.keys(
    colors.filter((color) =>
      Object.values(color)[0].includes(title.toLowerCase()),
    )[0],
  )[0];

  return (
    <h1
      className={styles.title}
      style={
        {
          "--stringLength": title.length,
          "--pageColor": `var(--color-${pageColor})`,
        } as React.CSSProperties
      }
    >
      {title}
    </h1>
  );
}
