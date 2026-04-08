import { NextResponse } from "next/server";
import { z } from "zod";

import {
  isValidModeratorKey,
  MODERATION_UNAVAILABLE_ERROR,
} from "@/services/comments/moderation";
import { commentService } from "@/services/comments/service";

export const runtime = "nodejs";

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
    const params = await context.params;
    const { slug, commentId } = paramsSchema.parse(params);

    const moderatorKey = request.headers.get("x-cyclist-moderator-key");
    const authorized = isValidModeratorKey(moderatorKey);

    if (!authorized) {
      return NextResponse.json(
        { ok: false, error: "unauthorized" },
        {
          status: 401,
          headers: {
            "Cache-Control": "no-store",
          },
        },
      );
    }

    const deleted = await commentService.delete(slug, commentId);

    if (!deleted) {
      return NextResponse.json(
        { ok: false, error: "not_found" },
        {
          status: 404,
          headers: {
            "Cache-Control": "no-store",
          },
        },
      );
    }

    return NextResponse.json(
      {
        ok: true,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, error: "invalid_params" },
        {
          status: 400,
          headers: {
            "Cache-Control": "no-store",
          },
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
          headers: {
            "Cache-Control": "no-store",
          },
        },
      );
    }

    console.error("Failed to delete comment", error);
    return NextResponse.json(
      { ok: false, error: "internal_error" },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }
}
