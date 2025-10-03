import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/PageComponent.module.css";

import { DataRowProps } from "./types";

export default function DataRow({
  item,
  routeStyles,
  layout = "list",
  showTags = false,
  showNew = false,
}: DataRowProps) {
  const rowClass = `${styles.dataRow} ${styles[`layout-${layout}`]}`;
  const imageSizes =
    layout === "list"
      ? "(max-width: 800px) 100vw, 300px"
      : layout === "grid"
        ? "(max-width: 875px) 100vw, (max-width: 1050px) 50vw, 33vw"
        : "100vw";

  return (
    <div className={rowClass} style={routeStyles}>
      <div className={styles.imageContainer}>
        <Image
          width={300}
          height={200}
          src={item.image}
          alt={item.alt}
          className={styles.image}
          sizes={imageSizes}
        />
        {showNew && item.new && <span className={styles.newBadge}>New</span>}
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
          Learn more <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </div>
  );
}
