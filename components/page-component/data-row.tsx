"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import styles from "@/styles/PageComponent.module.css";

import { DataRowProps } from "./types";

export default function DataRow({
  item,
  routeStyles,
  layout = "list",
  showTags = false,
  showNew = false,
  localImage,
}: DataRowProps) {
  const t = useTranslations("Common");

  const rowClass = `${styles.dataRow} ${styles[`layout-${layout}`]}`;
  const imageSizes =
    layout === "list"
      ? "(max-width: 800px) 100vw, 300px"
      : layout === "grid"
        ? "(max-width: 875px) 100vw, (max-width: 1050px) 50vw, 33vw"
        : "100vw";

  const linkToDisplay = item.link
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0];

  // Use a custom loader so Next.js <Image> generates Brandfetch URLs directly
  // and bypasses the Next Image Optimization route (avoids 400s).
  const brandfetchLoader = ({
    src,
    width,
    quality,
  }: {
    src: string;
    width: number;
    quality?: number;
  }) => {
    // Special cases where the image is not found on Brandfetch.
    if (localImage) return localImage;

    const clientId = process.env.NEXT_PUBLIC_LOGO_API_KEY ?? "";
    const base = "https://cdn.brandfetch.io";
    const q = typeof quality === "number" ? quality : 75;
    const tokenParam = clientId ? `?c=${clientId}&q=${q}` : `?q=${q}`;

    return `${base}/${src}/w/${width}${tokenParam}`;
  };

  return (
    <div className={rowClass} style={routeStyles}>
      <div className={styles.imageContainer}>
        <Image
          loader={brandfetchLoader}
          width={300}
          height={200}
          src={linkToDisplay}
          alt={item.alt}
          className={styles.image}
          sizes={imageSizes}
        />
        {showNew && item.new && (
          <span className={styles.newBadge}>{t("new")}</span>
        )}
      </div>

      <div className={styles.content}>
        <h2>{item.title}</h2>

        <p className={styles.description}>{item.description}</p>

        {showTags && item.tags && item.tags.length > 0 && (
          <div className={styles.tags}>
            {item.tags.map((tag, index) => (
              <span key={index}>{tag}</span>
            ))}
          </div>
        )}

        <Link
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          <span>{linkToDisplay}</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </div>
  );
}
