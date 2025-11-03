"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import styles from "@/styles/PageComponent.module.css";
import { createBrandfetchLoader } from "@/utils/brandfetch-loader";
import { linkToDisplay } from "@/utils/link-to-display";

import ShareButton from "./share-button";
import { DataRowProps } from "./types";

export default function DataRow({
  item,
  routeStyles,
  layout = "list",
  showTags = false,
  showNew = false,
  localImage,
}: DataRowProps) {
  const locale = useLocale();
  const t = useTranslations("Common");

  const rowClass = `${styles.dataRow} ${styles[`layout-${layout}`]}`;
  const imageSizes =
    layout === "list"
      ? "(max-width: 800px) 100vw, 300px"
      : layout === "grid"
        ? "(max-width: 875px) 100vw, (max-width: 1050px) 50vw, 33vw"
        : "100vw";

  const brandfetchLoader = createBrandfetchLoader({
    overrideSrc: localImage ?? undefined,
  });

  return (
    <div className={rowClass} style={routeStyles} id={item.id}>
      <div className={styles.imageContainer}>
        <Image
          loader={brandfetchLoader}
          width={300}
          height={200}
          src={linkToDisplay(item.link)}
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

        <p className={styles.description}>
          {locale === "fi" ? item.description_fi : item.description_en}
        </p>

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
          data-testid="content-link"
        >
          <span>{linkToDisplay(item.link)}</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>

      <ShareButton title={item.title} />
    </div>
  );
}
