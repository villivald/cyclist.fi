import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

import ContactEmailTemplate from "@/components/emails/contact-email-template";

export const runtime = "nodejs";

const contentTypeJson = { "Content-Type": "application/json" };
const noStoreHeaders = {
  ...contentTypeJson,
  "Cache-Control": "no-store",
};

const MAX_CONTENT_LENGTH_BYTES = 8 * 1024;
const contactRequestSchema = z
  .object({
    message: z.string().trim().min(1).max(2000),
    fromEmail: z.string().trim().email().max(254),
    name: z.string().trim().max(60).optional().default(""),
    subject: z.string().trim().max(120).optional().default("General"),
  })
  .strict();

const redis = new Redis({
  url: process.env.KV_REST_API_URL ?? "",
  token: process.env.KV_REST_API_TOKEN ?? "",
});

const rateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, "1 h"),
  prefix: "ratelimit:contact:hour",
});

const getClientIp = (request: Request) =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
  request.headers.get("x-real-ip") ??
  "0.0.0.0";

const createContactEmailTemplate = (payload: {
  message: string;
  fromEmail: string;
  name: string;
}) => (
  <ContactEmailTemplate
    message={payload.message}
    fromEmail={payload.fromEmail}
    name={payload.name}
  />
);

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

    const parsed = contactRequestSchema.parse(await request.json());
    const { fromEmail, message, name, subject } = parsed;

    const apiKey = process.env.RESEND_API_KEY;
    const fromAddress = process.env.RESEND_FROM_EMAIL;

    if (!apiKey || !fromAddress) {
      console.error("Contact endpoint is missing Resend configuration");
      return NextResponse.json(
        { ok: false, error: "internal_error" },
        { status: 500, headers: noStoreHeaders },
      );
    }

    const resend = new Resend(apiKey);

    const result = await resend.emails.send({
      from: fromAddress,
      to: "maxim@villivald.com",
      subject: `Cyclist.fi - ${subject}`,
      react: createContactEmailTemplate({ message, fromEmail, name }),
      replyTo: fromEmail,
    });

    if (result.error) {
      console.error("Failed to send contact email", result.error);
      return NextResponse.json(
        { ok: false, error: "internal_error" },
        { status: 500, headers: noStoreHeaders },
      );
    }

    return NextResponse.json(
      { ok: true },
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

    console.error("Unexpected contact endpoint error", error);
    return NextResponse.json(
      { ok: false, error: "internal_error" },
      { status: 500, headers: noStoreHeaders },
    );
  }
}
