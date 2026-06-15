import { beforeEach, describe, expect, it } from "vitest";

import { env } from "../env";

describe("env", () => {
  beforeEach(() => {
    process.env.KV_REST_API_URL = "https://example.upstash.io";
    process.env.KV_REST_API_TOKEN = "test-token";
    process.env.POSTGRES_URL = "postgres://example";
  });

  it("does not throw when required kv variables are present", () => {
    expect(() => env.ensure("kv")).not.toThrow();
  });

  it("throws when kv variables are missing", () => {
    delete process.env.KV_REST_API_TOKEN;

    expect(() => env.ensure("kv")).toThrow(
      "Missing required environment variables for kv: KV_REST_API_TOKEN",
    );
  });

  it("reports missing postgres variables", () => {
    delete process.env.POSTGRES_URL;

    expect(env.missing("postgres")).toEqual(["POSTGRES_URL"]);
  });
});
