import { NextResponse } from "next/server";

import {
  isValidModeratorKey,
  MODERATION_UNAVAILABLE_ERROR,
} from "@/services/comments/moderation";
import {
  getClientIp,
  getModerationRetryAfterSeconds,
  moderationThrottle,
} from "@/services/comments/moderation-throttle";

export const runtime = "nodejs";

const noStoreHeaders = {
  "Cache-Control": "no-store",
};

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const throttle = await moderationThrottle.check(ip, "verify");

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

    return NextResponse.json(
      { ok: true },
      {
        status: 200,
        headers: noStoreHeaders,
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
          headers: noStoreHeaders,
        },
      );
    }

    console.error("Failed to verify moderator key", error);
    return NextResponse.json(
      { ok: false, error: "internal_error" },
      {
        status: 500,
        headers: noStoreHeaders,
      },
    );
  }
}
