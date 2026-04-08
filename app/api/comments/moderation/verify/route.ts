import { NextResponse } from "next/server";

import {
  isValidModeratorKey,
  MODERATION_UNAVAILABLE_ERROR,
} from "@/services/comments/moderation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
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

    return NextResponse.json(
      { ok: true },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === MODERATION_UNAVAILABLE_ERROR
    ) {
      return NextResponse.json(
        { ok: false, error: MODERATION_UNAVAILABLE_ERROR },
        {
          status: 503,
          headers: {
            "Cache-Control": "no-store",
          },
        },
      );
    }

    console.error("Failed to verify moderator key", error);
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
