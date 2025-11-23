import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import type { BuildOptions, RatelimitResult } from "./types";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_KV_REST_API_URL ?? "",
  token: process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN ?? "",
});

export const buildRatelimiter = (options: BuildOptions) => {
  const hourlyLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.fixedWindow(options.perHour, "3600 s"),
    prefix: "ratelimit:comments:hour",
  });

  const dailyLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(options.perDay, "86400 s"),
    prefix: "ratelimit:comments:day",
  });

  const buildResult = (res: RatelimitResult) => ({
    success: res.success,
    limit: res.limit,
    remaining: res.remaining,
    reset: res.reset,
  });

  return {
    async limit(identifier: string): Promise<RatelimitResult> {
      const hourly = await hourlyLimiter.limit(identifier);
      if (!hourly.success) {
        return buildResult(hourly);
      }

      const daily = await dailyLimiter.limit(identifier);
      if (!daily.success) {
        return buildResult(daily);
      }

      const lastKey = `ratelimit:comments:last:${identifier}`;
      const alreadySet = await redis.set(lastKey, Date.now(), {
        nx: true,
        ex: options.minIntervalSeconds,
      });

      if (alreadySet === null) {
        const ttl = (await redis.ttl(lastKey)) ?? options.minIntervalSeconds;
        return {
          success: false,
          limit: 1,
          remaining: 0,
          reset: Math.max(Date.now() + ttl * 1000, Date.now()),
        };
      }

      return buildResult(daily);
    },
  };
};
