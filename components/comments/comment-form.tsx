import { useTranslations } from "next-intl";
import { FormEvent, useEffect, useState } from "react";

import styles from "@/styles/Comments.module.css";

import type { CommentFormProps } from "./types";

export function CommentForm({ isSubmitting, onSubmit }: CommentFormProps) {
  const t = useTranslations("Comments");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorUrl, setAuthorUrl] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!statusMessage) {
      return;
    }

    const timeout = setTimeout(() => {
      setStatusMessage(null);
    }, 4000);

    return () => {
      clearTimeout(timeout);
    };
  }, [statusMessage]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!content.trim()) {
      setStatusMessage(t("error"));
      return;
    }

    try {
      setStatusMessage(null);
      const outcome = await onSubmit({
        content: content.trim(),
        authorName: authorName.trim() || undefined,
        authorUrl: authorUrl.trim() || undefined,
      });

      if (outcome.status === "success") {
        setContent("");
        setStatusMessage(t("posted"));
      } else if (outcome.message) {
        setStatusMessage(outcome.message);
      }
    } catch (submitError) {
      console.error("Comment submission failed", submitError);
      setStatusMessage(t("error"));
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      aria-busy={isSubmitting}
    >
      <label htmlFor="comment-content" className={styles.srOnly}>
        {t("placeholder")}
      </label>
      <textarea
        id="comment-content"
        className={styles.textarea}
        placeholder={t("placeholder")}
        value={content}
        onChange={(event) => setContent(event.target.value)}
        rows={4}
        required
      />

      <div className={styles.formRow}>
        <label htmlFor="comment-author" className={styles.label}>
          {t("nameLabel")}
        </label>
        <input
          id="comment-author"
          className={styles.input}
          value={authorName}
          onChange={(event) => setAuthorName(event.target.value)}
          maxLength={60}
        />
      </div>

      <div className={styles.formRow}>
        <label htmlFor="comment-url" className={styles.label}>
          {t("urlLabel")}
        </label>
        <input
          id="comment-url"
          className={styles.input}
          type="url"
          value={authorUrl}
          onChange={(event) => setAuthorUrl(event.target.value)}
          maxLength={200}
          inputMode="url"
        />
      </div>

      <div className={styles.formActions}>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting || !content.trim()}
        >
          {isSubmitting ? t("submitting") : t("submit")}
        </button>
        {statusMessage && (
          <p className={styles.statusMessage} role="status" aria-live="polite">
            {statusMessage}
          </p>
        )}
      </div>
    </form>
  );
}
