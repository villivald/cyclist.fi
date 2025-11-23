export interface CommentAuthor {
  name?: string;
  url?: string;
}

export interface ClientComment {
  id: string;
  slug: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  author: CommentAuthor;
  deviceId: string;
  shouldAnimate?: boolean;
}

export interface CommentListProps {
  comments: ClientComment[];
}

export interface CommentThreadState {
  slug: string;
  comments: ClientComment[];
}

export interface CommentFormValues {
  content: string;
  authorName?: string;
  authorUrl?: string;
}

export interface ServerCommentDTO {
  id: string;
  slug: string;
  content: string;
  authorName?: string | null;
  authorUrl?: string | null;
  deviceId: string;
  createdAt: string;
  updatedAt?: string | null;
}

export interface ApiThreadResponse {
  ok: boolean;
  thread?: {
    slug: string;
    comments: ServerCommentDTO[];
  };
  error?: string;
}

export interface ApiSubmitResponse {
  ok: boolean;
  comment?: ServerCommentDTO;
  error?: string;
  rate?: {
    reset: number;
  };
}

export interface CommentSubmitOutcome {
  status: "success" | "error";
  message?: string;
}

export interface CommentFormProps {
  isSubmitting: boolean;
  onSubmit: (values: CommentFormValues) => Promise<CommentSubmitOutcome>;
}

export interface CommentThreadProps {
  slug: string;
  enabled: boolean;
  deviceId?: string;
}

export interface UseCommentsOptions {
  enabled?: boolean;
  deviceId?: string;
}

export interface SubmitResult {
  success: boolean;
  error?: string;
  rateLimited?: boolean;
  retryAfterSeconds?: number;
}
