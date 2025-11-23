import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import styles from "@/styles/Comments.module.css";

import { CommentForm } from "./comment-form";
import { CommentList } from "./comment-list";
import type {
  CommentFormValues,
  CommentSubmitOutcome,
  CommentThreadProps,
} from "./types";
import { useComments } from "./use-comments";

export function CommentThread({ slug, enabled, deviceId }: CommentThreadProps) {
  const t = useTranslations("Comments");
  const [rateLimitMessage, setRateLimitMessage] = useState<string | null>(null);

  const { comments, isLoading, isSubmitting, error, submit, refresh } =
    useComments(slug, {
      enabled,
      deviceId,
    });

  const translatedError = useMemo(() => {
    if (!error) return null;
    switch (error) {
      case "load_failed":
        return t("loadError");
      case "missing_device":
        return t("missingDevice");
      default:
        return t("error");
    }
  }, [error, t]);

  const handleSubmit = async (
    values: CommentFormValues,
  ): Promise<CommentSubmitOutcome> => {
    setRateLimitMessage(null);
    const result = await submit(values);

    if (result.success) {
      return { status: "success" };
    }

    if (result.rateLimited) {
      const seconds = result.retryAfterSeconds ?? 60;
      const message = t("rateLimited", {
        seconds,
      });
      setRateLimitMessage(message);
      return { status: "error", message };
    }

    return { status: "error", message: t("error") };
  };

  const publishedCount = comments.length;

  const showEmptyState = !isLoading && comments.length === 0;

  return (
    <section className={styles.thread} aria-live="polite">
      <header className={styles.threadHeader}>
        <div className={styles.threadHeading}>
          <p className={styles.threadTitle}>{t("title")}</p>
          <span
            className={styles.threadCount}
            aria-label={`${publishedCount} ${t("title").toLowerCase()}`}
          >
            {isLoading && publishedCount === 0 ? (
              <span className={styles.spinner} aria-hidden="true" />
            ) : (
              publishedCount
            )}
          </span>
        </div>
        <button
          type="button"
          onClick={refresh}
          className={styles.refreshButton}
        >
          {t("refresh")}
        </button>
      </header>

      <div className={styles.threadBody}>
        {isLoading && publishedCount === 0 && (
          <div className={styles.helper}>
            <div className={styles.spinner} />
          </div>
        )}

        {showEmptyState && <p className={styles.helper}>{t("empty")}</p>}

        {translatedError && (
          <p className={styles.errorMessage}>{translatedError}</p>
        )}

        {rateLimitMessage && (
          <p className={styles.errorMessage}>{rateLimitMessage}</p>
        )}

        <CommentList comments={comments} />

        <CommentForm isSubmitting={isSubmitting} onSubmit={handleSubmit} />
      </div>
    </section>
  );
}
