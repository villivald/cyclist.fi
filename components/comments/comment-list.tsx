import Link from "next/link";
import { useLocale } from "next-intl";

import styles from "@/styles/Comments.module.css";

import type { CommentListProps } from "./types";

export function CommentList({ comments }: CommentListProps) {
  const locale = useLocale();

  if (comments.length === 0) {
    return null;
  }

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    dateStyle: "short",
    timeStyle: "short",
  });

  const formatDate = (input: string) => {
    try {
      return dateFormatter.format(new Date(input));
    } catch {
      return input;
    }
  };

  return (
    <ol className={styles.commentList}>
      {comments.map((comment) => (
        <li
          key={comment.id}
          className={`${styles.commentItem} ${comment.shouldAnimate ? styles.animateIn : ""}`}
        >
          <div className={styles.commentHeader}>
            <div className={styles.authorGroup}>
              <span className={styles.author}>
                {comment.author.name ?? "Anonymous"}
              </span>
              {comment.author.url && (
                <Link
                  href={comment.author.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.authorLink}
                >
                  ↗<span className={styles.srOnly}>{comment.author.url}</span>
                </Link>
              )}
            </div>
            <time dateTime={comment.createdAt} className={styles.timestamp}>
              {formatDate(comment.createdAt)}
            </time>
          </div>
          <p className={styles.commentContent}>{comment.content}</p>
        </li>
      ))}
    </ol>
  );
}
