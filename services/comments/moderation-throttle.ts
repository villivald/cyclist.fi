import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import {
  MODERATION_DELETE_MAX_PER_HOUR,
  MODERATION_FAILURE_WINDOW_SECONDS,
  MODERATION_MAX_FAILED_ATTEMPTS,
  MODERATION_VERIFY_MAX_PER_DAY,
  MODERATION_VERIFY_MAX_PER_HOUR,
  MODERATION_VERIFY_MIN_INTERVAL_SECONDS,
} from "./constants";
import { buildRatelimiter } from "./throttle";
import type { RatelimitResult } from "./types";

const redis = new Redis({
  url: process.env.KV_REST_API_URL ?? "",
  token: process.env.KV_REST_API_TOKEN ?? "",
});

const verifyLimiter = buildRatelimiter({
  perHour: MODERATION_VERIFY_MAX_PER_HOUR,
  perDay: MODERATION_VERIFY_MAX_PER_DAY,
  minIntervalSeconds: MODERATION_VERIFY_MIN_INTERVAL_SECONDS,
});

const deleteLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(MODERATION_DELETE_MAX_PER_HOUR, "3600 s"),
  prefix: "ratelimit:moderation:delete",
});

const failuresKey = (ip: string) => `ratelimit:moderation:failures:${ip}`;

export const getClientIp = (request: Request) =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
  request.headers.get("x-real-ip") ??
  "0.0.0.0";

export type ModerationAction = "verify" | "delete";

export type ModerationThrottleResult =
  | { allowed: true }
  | { allowed: false; reason: "locked_out" | "rate_limit"; reset: number };

const toRateResult = (result: {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}): RatelimitResult => ({
  success: result.success,
  limit: result.limit,
  remaining: result.remaining,
  reset: result.reset,
});

export const moderationThrottle = {
  async check(
    ip: string,
    action: ModerationAction,
  ): Promise<ModerationThrottleResult> {
    const failures = (await redis.get<number>(failuresKey(ip))) ?? 0;

    if (failures >= MODERATION_MAX_FAILED_ATTEMPTS) {
      const ttl =
        (await redis.ttl(failuresKey(ip))) ?? MODERATION_FAILURE_WINDOW_SECONDS;

      return {
        allowed: false,
        reason: "locked_out",
        reset: Date.now() + ttl * 1000,
      };
    }

    const rateResult =
      action === "verify"
        ? await verifyLimiter.limit(`moderation:verify:${ip}`)
        : toRateResult(await deleteLimiter.limit(`moderation:delete:${ip}`));

    if (!rateResult.success) {
      return {
        allowed: false,
        reason: "rate_limit",
        reset: rateResult.reset,
      };
    }

    return { allowed: true };
  },

  async recordFailure(ip: string): Promise<void> {
    const key = failuresKey(ip);
    const count = await redis.incr(key);

    if (count === 1) {
      await redis.expire(key, MODERATION_FAILURE_WINDOW_SECONDS);
    }
  },

  async clearFailures(ip: string): Promise<void> {
    await redis.del(failuresKey(ip));
  },
};

export const getModerationRetryAfterSeconds = (reset: number) =>
  Math.max(Math.ceil((reset - Date.now()) / 1000), 1);
