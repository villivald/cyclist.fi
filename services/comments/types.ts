export interface CommentRecord {
  id: string;
  slug: string;
  content: string;
  authorName?: string;
  authorUrl?: string;
  deviceId: string;
  createdAt: string;
  updatedAt: string;
}

export type PublishedComment = CommentRecord;

export type CommentPayload = Pick<
  CommentRecord,
  "slug" | "content" | "authorName" | "authorUrl"
>;

export interface CommentThread {
  slug: string;
  comments: CommentRecord[];
}

export interface RatelimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

export interface SubmitContext {
  ip: string;
  deviceId: string;
  userAgent?: string;
}

export interface BuildOptions {
  perHour: number;
  perDay: number;
  minIntervalSeconds: number;
}
