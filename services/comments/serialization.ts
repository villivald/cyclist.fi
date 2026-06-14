import type {
  CommentRecord,
  CommentThread,
  PublicComment,
  PublicCommentThread,
} from "./types";

export const toPublicComment = ({
  id,
  slug,
  content,
  authorName,
  authorUrl,
  createdAt,
  updatedAt,
}: CommentRecord): PublicComment => ({
  id,
  slug,
  content,
  authorName,
  authorUrl,
  createdAt,
  updatedAt,
});

export const toPublicThread = (thread: CommentThread): PublicCommentThread => ({
  slug: thread.slug,
  comments: thread.comments.map(toPublicComment),
});
