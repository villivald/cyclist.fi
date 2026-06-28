import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import { z } from "zod";

import { newsletterRepository } from "@/services/newsletter/repository";

export const runtime = "nodejs";

const contentTypeJson = { "Content-Type": "application/json" };
const noStoreHeaders = {
  ...contentTypeJson,
  "Cache-Control": "no-store",
};

const MAX_CONTENT_LENGTH_BYTES = 1024;

const subscribeRequestSchema = z
  .object({
    email: z.string().trim().email().max(254),
    locale: z.enum(["en", "fi"]).optional(),
  })
  .strict();

const redis = new Redis({
  url: process.env.KV_REST_API_URL ?? "",
  token: process.env.KV_REST_API_TOKEN ?? "",
});

const rateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, "1 h"),
  prefix: "ratelimit:newsletter:hour",
});

const getClientIp = (request: Request) =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
  request.headers.get("x-real-ip") ??
  "0.0.0.0";

export async function POST(request: Request) {
  try {
    const contentLengthHeader = request.headers.get("content-length");
    const contentLength = Number(contentLengthHeader ?? "0");
    if (contentLengthHeader && Number.isFinite(contentLength)) {
      if (contentLength > MAX_CONTENT_LENGTH_BYTES) {
        return NextResponse.json(
          { ok: false, error: "payload_too_large" },
          {
            status: 413,
            headers: noStoreHeaders,
          },
        );
      }
    }

    const ip = getClientIp(request);
    const rateResult = await rateLimiter.limit(ip);
    if (!rateResult.success) {
      return NextResponse.json(
        { ok: false, error: "rate_limit", retryAfter: rateResult.reset },
        {
          status: 429,
          headers: {
            ...noStoreHeaders,
            "Retry-After": "60",
          },
        },
      );
    }

    if (!process.env.POSTGRES_URL) {
      console.error("Newsletter endpoint is missing POSTGRES_URL");
      return NextResponse.json(
        { ok: false, error: "internal_error" },
        { status: 500, headers: noStoreHeaders },
      );
    }

    const parsed = subscribeRequestSchema.parse(await request.json());
    const result = await newsletterRepository.subscribe(parsed);

    return NextResponse.json(
      { ok: true, alreadySubscribed: !result.subscribed },
      {
        status: 200,
        headers: noStoreHeaders,
      },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          ok: false,
          error: "validation_error",
          issues: error.flatten(),
        },
        {
          status: 422,
          headers: noStoreHeaders,
        },
      );
    }

    console.error("Unexpected newsletter subscribe endpoint error", error);
    return NextResponse.json(
      { ok: false, error: "internal_error" },
      { status: 500, headers: noStoreHeaders },
    );
  }
}
