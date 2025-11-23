import { useCallback, useEffect, useRef, useState } from "react";

import type {
  ApiSubmitResponse,
  ApiThreadResponse,
  ClientComment,
  CommentFormValues,
  CommentThreadState,
  ServerCommentDTO,
  SubmitResult,
  UseCommentsOptions,
} from "./types";

const mapToClientComment = (
  data: ServerCommentDTO,
  animate = false,
): ClientComment => ({
  id: data.id,
  slug: data.slug,
  content: data.content,
  createdAt: data.createdAt,
  updatedAt: data.updatedAt ?? undefined,
  deviceId: data.deviceId,
  author: {
    name: data.authorName ?? undefined,
    url: data.authorUrl ?? undefined,
  },
  shouldAnimate: animate,
});

const sortByCreatedAt = (list: ClientComment[]) =>
  list.slice().sort((a, b) => a.createdAt.localeCompare(b.createdAt));

export const useComments = (slug: string, options: UseCommentsOptions = {}) => {
  const [thread, setThread] = useState<CommentThreadState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortController = useRef<AbortController | null>(null);

  const enabled = options.enabled ?? true;

  const fetchThread = useCallback(
    async (signal?: AbortSignal) => {
      if (!enabled || !slug) return;
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/comments/${encodeURIComponent(slug)}`,
          {
            method: "GET",
            signal,
          },
        );

        if (!response.ok) {
          throw new Error("request_failed");
        }

        const json = (await response.json()) as ApiThreadResponse;

        if (!json.ok || !json.thread) {
          throw new Error("invalid_response");
        }

        const comments = sortByCreatedAt(
          json.thread.comments.map((item) => mapToClientComment(item)),
        );

        setThread({
          slug: json.thread.slug,
          comments,
        });
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        console.error("Failed to fetch comments", err);
        setError("load_failed");
      } finally {
        setIsLoading(false);
      }
    },
    [enabled, slug],
  );

  useEffect(() => {
    if (!enabled) return;
    abortController.current?.abort();
    const controller = new AbortController();
    abortController.current = controller;

    void fetchThread(controller.signal);

    return () => {
      controller.abort();
    };
  }, [enabled, fetchThread]);

  const submit = useCallback(
    async (values: CommentFormValues): Promise<SubmitResult> => {
      if (!options.deviceId) {
        setError("missing_device");
        return { success: false, error: "missing_device" };
      }

      setIsSubmitting(true);
      setError(null);

      const optimisticComment: ClientComment = {
        id: `optimistic-${Date.now()}`,
        slug,
        content: values.content,
        createdAt: new Date().toISOString(),
        deviceId: options.deviceId,
        author: {
          name: values.authorName,
          url: values.authorUrl,
        },
        shouldAnimate: true,
      };

      setThread((current) => {
        const base: CommentThreadState = current ?? { slug, comments: [] };

        return {
          ...base,
          comments: sortByCreatedAt([...base.comments, optimisticComment]),
        };
      });

      try {
        const response = await fetch("/api/comments/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            slug,
            content: values.content,
            authorName: values.authorName,
            authorUrl: values.authorUrl,
            deviceId: options.deviceId,
          }),
        });

        const json = (await response.json()) as ApiSubmitResponse;

        if (!response.ok || !json.ok || !json.comment) {
          if (json.error === "rate-limit") {
            const retryAfterSeconds = json.rate
              ? Math.max(Math.ceil((json.rate.reset - Date.now()) / 1000), 1)
              : undefined;

            throw Object.assign(new Error("rate_limit"), {
              rateLimited: true,
              retryAfterSeconds,
            });
          }

          throw new Error(json.error ?? "submit_failed");
        }

        // Map the returned raw comment to ClientComment
        const submitted = mapToClientComment(json.comment, true);

        setThread((current) => {
          const base: CommentThreadState = current ?? { slug, comments: [] };

          const filtered = base.comments.filter(
            (item) => item.id !== optimisticComment.id,
          );

          return {
            ...base,
            comments: sortByCreatedAt([...filtered, submitted]),
          };
        });

        return { success: true };
      } catch (err) {
        setThread((current) => {
          if (!current) return current;
          return {
            ...current,
            comments: current.comments.filter(
              (item) => item.id !== optimisticComment.id,
            ),
          };
        });

        if (
          err instanceof Error &&
          (err as { rateLimited?: boolean }).rateLimited
        ) {
          return {
            success: false,
            rateLimited: true,
            retryAfterSeconds: (err as { retryAfterSeconds?: number })
              .retryAfterSeconds,
            error: err.message,
          };
        }

        console.error("Failed to submit comment", err);
        setError("submit_failed");
        return { success: false, error: "submit_failed" };
      } finally {
        setIsSubmitting(false);
      }
    },
    [options.deviceId, slug],
  );

  const refresh = useCallback(() => {
    if (!enabled) return;
    abortController.current?.abort();
    const controller = new AbortController();
    abortController.current = controller;
    void fetchThread(controller.signal);
  }, [enabled, fetchThread]);

  return {
    comments: thread?.comments ?? [],
    thread,
    isLoading,
    isSubmitting,
    error,
    submit,
    refresh,
  };
};
