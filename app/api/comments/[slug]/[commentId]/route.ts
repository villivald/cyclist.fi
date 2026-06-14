import { NextResponse } from "next/server";
import { z } from "zod";

import {
  isValidModeratorKey,
  MODERATION_UNAVAILABLE_ERROR,
} from "@/services/comments/moderation";
import {
  getClientIp,
  getModerationRetryAfterSeconds,
  moderationThrottle,
} from "@/services/comments/moderation-throttle";
import { commentService } from "@/services/comments/service";

export const runtime = "nodejs";

const noStoreHeaders = {
  "Cache-Control": "no-store",
};

const paramsSchema = z.object({
  slug: z.string().min(1).max(160),
  commentId: z
    .string()
    .min(8)
    .max(64)
    .regex(/^[a-zA-Z0-9_-]+$/),
});

export async function DELETE(
  request: Request,
  context: { params: Promise<{ slug: string; commentId: string }> },
) {
  try {
    const ip = getClientIp(request);
    const throttle = await moderationThrottle.check(ip, "delete");

    if (!throttle.allowed) {
      const retryAfterSeconds = getModerationRetryAfterSeconds(throttle.reset);

      return NextResponse.json(
        {
          ok: false,
          error: throttle.reason,
          retryAfter: throttle.reset,
        },
        {
          status: 429,
          headers: {
            ...noStoreHeaders,
            "Retry-After": retryAfterSeconds.toString(),
          },
        },
      );
    }

    const params = await context.params;
    const { slug, commentId } = paramsSchema.parse(params);

    const moderatorKey = request.headers.get("x-cyclist-moderator-key");
    const authorized = isValidModeratorKey(moderatorKey);

    if (!authorized) {
      await moderationThrottle.recordFailure(ip);

      return NextResponse.json(
        { ok: false, error: "unauthorized" },
        {
          status: 401,
          headers: noStoreHeaders,
        },
      );
    }

    await moderationThrottle.clearFailures(ip);

    const deleted = await commentService.delete(slug, commentId);

    if (!deleted) {
      return NextResponse.json(
        { ok: false, error: "not_found" },
        {
          status: 404,
          headers: noStoreHeaders,
        },
      );
    }

    return NextResponse.json(
      {
        ok: true,
      },
      {
        status: 200,
        headers: noStoreHeaders,
      },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, error: "invalid_params" },
        {
          status: 400,
          headers: noStoreHeaders,
        },
      );
    }

    if (
      error instanceof Error &&
      error.message === MODERATION_UNAVAILABLE_ERROR
    ) {
      return NextResponse.json(
        { ok: false, error: "moderation_unavailable" },
        {
          status: 503,
          headers: noStoreHeaders,
        },
      );
    }

    console.error("Failed to delete comment", error);
    return NextResponse.json(
      { ok: false, error: "internal_error" },
      {
        status: 500,
        headers: noStoreHeaders,
      },
    );
  }
}
