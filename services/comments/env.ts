type EnvGroup = "kv" | "postgres";

const REQUIRED_ENV: Record<EnvGroup, readonly string[]> = {
  kv: [
    "UPSTASH_REDIS_REST_KV_REST_API_URL",
    "UPSTASH_REDIS_REST_KV_REST_API_TOKEN",
  ],
  postgres: ["POSTGRES_URL"],
};

export const env = {
  ensure(group: EnvGroup) {
    const missing = REQUIRED_ENV[group].filter(
      (key) => !process.env[key] || process.env[key]?.length === 0,
    );

    if (missing.length > 0) {
      throw new Error(
        `Missing required environment variables for ${group}: ${missing.join(", ")}`,
      );
    }
  },
  missing(group: EnvGroup) {
    return REQUIRED_ENV[group].filter(
      (key) => !process.env[key] || process.env[key]?.length === 0,
    );
  },
};
