import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import styles from "@/styles/Comments.module.css";

import { CommentForm } from "./comment-form";
import { CommentList } from "./comment-list";
import type {
  ClientComment,
  CommentFormValues,
  CommentSubmitOutcome,
  CommentThreadProps,
} from "./types";
import { useComments } from "./use-comments";

export function CommentThread({ slug, enabled, deviceId }: CommentThreadProps) {
  const t = useTranslations("Comments");
  const [rateLimitMessage, setRateLimitMessage] = useState<string | null>(null);
  const [moderatorKey, setModeratorKey] = useState<string | null>(null);
  const [moderationMessage, setModerationMessage] = useState<string | null>(
    null,
  );
  const [moderationMessageTone, setModerationMessageTone] = useState<
    "status" | "error"
  >("status");
  const moderationTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const showModerationMessage = useCallback(
    (message: string, tone: "status" | "error" = "status") => {
      clearTimeout(moderationTimerRef.current);
      setModerationMessage(message);
      setModerationMessageTone(tone);
      moderationTimerRef.current = setTimeout(
        () => setModerationMessage(null),
        4000,
      );
    },
    [],
  );

  useEffect(() => () => clearTimeout(moderationTimerRef.current), []);

  const {
    comments,
    isLoading,
    isSubmitting,
    isValidatingModerator,
    deletingCommentId,
    error,
    submit,
    validateModeratorKey,
    deleteComment,
    refresh,
  } = useComments(slug, {
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

  const translateDeleteError = useCallback(
    (errorCode: string) => {
      switch (errorCode) {
        case "unauthorized":
          return t("moderationUnauthorized");
        case "not_found":
          return t("deleteNotFound");
        case "moderation_unavailable":
          return t("moderationUnavailable");
        default:
          return t("error");
      }
    },
    [t],
  );

  const handleModeratorModeToggle = async () => {
    if (moderatorKey) {
      setModeratorKey(null);
      showModerationMessage(t("moderationDisabled"));
      return;
    }

    const keyInput = window.prompt(t("moderationPrompt"))?.trim();
    if (!keyInput) return;

    const validation = await validateModeratorKey(keyInput);
    if (!validation.success) {
      showModerationMessage(
        translateDeleteError(validation.error ?? "error"),
        "error",
      );
      return;
    }

    setModeratorKey(keyInput);
    showModerationMessage(t("moderationEnabled"));
  };

  const handleDelete = async (comment: ClientComment) => {
    if (!moderatorKey) return;

    const shouldDelete = window.confirm(
      t("deleteConfirm", { author: comment.author.name ?? t("anonymous") }),
    );
    if (!shouldDelete) return;

    setModerationMessage(null);
    const result = await deleteComment(comment.id, moderatorKey);

    if (!result.success) {
      if (result.error === "unauthorized") {
        setModeratorKey(null);
      }
      showModerationMessage(
        translateDeleteError(result.error ?? "error"),
        "error",
      );
      return;
    }

    showModerationMessage(t("deleteSuccess"));
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
        <div className={styles.threadActions}>
          <button
            type="button"
            onClick={refresh}
            className={styles.refreshButton}
          >
            {t("refresh")}
          </button>
          <button
            type="button"
            onClick={handleModeratorModeToggle}
            className={styles.refreshButton}
            disabled={isValidatingModerator}
          >
            {isValidatingModerator
              ? t("moderationVerifying")
              : moderatorKey
                ? t("moderationDisable")
                : t("moderationEnable")}
          </button>
        </div>
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

        {moderationMessage && (
          <p
            className={
              moderationMessageTone === "error"
                ? styles.errorMessage
                : styles.statusMessage
            }
          >
            {moderationMessage}
          </p>
        )}

        <CommentList
          comments={comments}
          canModerate={Boolean(moderatorKey)}
          deletingCommentId={deletingCommentId}
          onDelete={handleDelete}
          deleteLabel={t("delete")}
          deletingLabel={t("deleting")}
        />

        <CommentForm isSubmitting={isSubmitting} onSubmit={handleSubmit} />
      </div>
    </section>
  );
}
