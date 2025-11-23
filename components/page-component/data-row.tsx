"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { CommentThread } from "@/components/comments/comment-thread";
import { useCommentDeviceId } from "@/components/comments/use-comment-device-id";
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
  commentNamespace,
}: DataRowProps) {
  const locale = useLocale();
  const t = useTranslations("Common");
  const tComments = useTranslations("Comments");
  const deviceId = useCommentDeviceId();

  const [commentsOpen, setCommentsOpen] = useState(false);
  const [hasLoadedComments, setHasLoadedComments] = useState(false);

  useEffect(() => {
    if (commentsOpen) {
      setHasLoadedComments(true);
    }
  }, [commentsOpen]);

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
          placeholder="blur"
          // blur data generated from https://png-pixel.com/
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkaGioBwADCQGBFoVLOAAAAABJRU5ErkJggg=="
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

        <button
          type="button"
          className={styles.commentToggle}
          aria-expanded={commentsOpen}
          onClick={() => setCommentsOpen((prev) => !prev)}
        >
          {commentsOpen ? tComments("hide") : tComments("show")}
        </button>
      </div>

      <section aria-label={tComments("title")} className={styles.comments}>
        <div
          className={styles.threadWrapper}
          data-open={commentsOpen}
          aria-hidden={!commentsOpen}
        >
          <div className={styles.threadInner}>
            {(commentsOpen || hasLoadedComments) && (
              <CommentThread
                slug={`${commentNamespace ?? "content"}/${item.id}`}
                enabled={commentsOpen}
                deviceId={deviceId}
              />
            )}
          </div>
        </div>
      </section>

      <ShareButton title={item.title} />
    </div>
  );
}
