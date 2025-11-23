import { NextResponse } from "next/server";
import { z } from "zod";

import { getCommentsCacheTag } from "@/services/comments/constants";
import { commentService } from "@/services/comments/service";

export const runtime = "nodejs";

const paramsSchema = z.object({
  slug: z.string().min(1).max(160),
});

export async function GET(
  _request: Request,
  context: { params: Record<string, string> },
) {
  try {
    const { slug } = paramsSchema.parse(await context.params);
    const thread = await commentService.fetchThread(slug);

    return NextResponse.json(
      { ok: true, thread },
      {
        headers: {
          "Cache-Control": "s-maxage=30",
          "x-next-cache-tags": getCommentsCacheTag(slug),
        },
      },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, error: "invalid_slug" },
        {
          status: 400,
          headers: {
            "Cache-Control": "no-store",
          },
        },
      );
    }

    console.error("Failed to load comments", error);
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
