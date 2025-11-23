import { NextResponse } from "next/server";
import { z } from "zod";

import { commentService } from "@/services/comments/service";
import { commentPayloadSchema } from "@/services/comments/validation";

export const runtime = "nodejs";

const requestSchema = commentPayloadSchema.extend({
  deviceId: z.string().min(16).max(64),
});

const sanitizeDeviceId = (value?: string | null) => {
  const sanitized = value?.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 64);
  return sanitized && sanitized.length >= 16 ? sanitized : null;
};

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = requestSchema.parse(json);

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "0.0.0.0";

    const deviceId =
      sanitizeDeviceId(parsed.deviceId) ??
      sanitizeDeviceId(request.headers.get("x-cyclist-device-id"));

    if (!deviceId) {
      return NextResponse.json(
        { ok: false, error: "missing-device-id" },
        {
          status: 422,
          headers: {
            "Cache-Control": "no-store",
          },
        },
      );
    }

    const { deviceId: _parsedDeviceId, ...payload } = parsed;
    void _parsedDeviceId;

    const result = await commentService.submit(payload, {
      ip,
      deviceId,
      userAgent: request.headers.get("user-agent") ?? undefined,
    });

    if (!result.ok) {
      const now = Date.now();
      const retryAfterSeconds = Math.max(
        Math.ceil(((result.retryAfter ?? now) - now) / 1000),
        1,
      );

      return NextResponse.json(
        {
          ok: false,
          error: "rate-limit",
          retryAfter: result.retryAfter,
          rate: result.rate,
        },
        {
          status: 429,
          headers: {
            "Cache-Control": "no-store",
            "Retry-After": retryAfterSeconds.toString(),
          },
        },
      );
    }

    return NextResponse.json(
      {
        ok: true,
        comment: result.comment,
      },
      {
        status: 201,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, error: "validation_error", issues: error.flatten() },
        {
          status: 422,
          headers: {
            "Cache-Control": "no-store",
          },
        },
      );
    }

    console.error("Failed to submit comment", error);
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
