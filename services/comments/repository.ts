import postgres from "postgres";

import type { PublishedComment } from "./types";

// Initialize Postgres client - works with both Vercel Postgres and Supabase
let sql: ReturnType<typeof postgres> | null = null;

const getPostgresClient = () => {
  if (sql) return sql;

  const connectionString = process.env.POSTGRES_URL;
  if (!connectionString) {
    throw new Error("POSTGRES_URL environment variable is not set");
  }

  sql = postgres(connectionString, {
    max: 1, // Use single connection for serverless
    idle_timeout: 20,
    connect_timeout: 10,
    onnotice: () => {
      // Suppress NOTICE messages (e.g., "relation already exists")
    },
    debug: false,
  });

  return sql;
};

let tableReady: Promise<void> | null = null;
const ensureCommentsTable = async () => {
  if (!tableReady) {
    tableReady = (async () => {
      const client = getPostgresClient();
      await client`
      CREATE TABLE IF NOT EXISTS comments (
        id TEXT PRIMARY KEY,
        slug TEXT NOT NULL,
        content TEXT NOT NULL,
        author_name TEXT,
        author_url TEXT,
        device_id TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      `;

      await client`
        CREATE INDEX IF NOT EXISTS comments_slug_created_at_idx
        ON comments (slug, created_at DESC);
      `;
    })().catch((error) => {
      tableReady = null;
      throw error;
    });
  }

  return tableReady;
};

export const commentRepository = {
  ensureTable: ensureCommentsTable,

  async upsert(comment: PublishedComment) {
    const client = getPostgresClient();
    await client`
      INSERT INTO comments (
        id,
        slug,
        content,
        author_name,
        author_url,
        device_id,
        created_at,
        updated_at
      )
      VALUES (
        ${comment.id},
        ${comment.slug},
        ${comment.content},
        ${comment.authorName ?? null},
        ${comment.authorUrl ?? null},
        ${comment.deviceId},
        ${comment.createdAt},
        ${comment.updatedAt}
      )
      ON CONFLICT (id) DO UPDATE SET
        content = EXCLUDED.content,
        author_name = EXCLUDED.author_name,
        author_url = EXCLUDED.author_url,
        updated_at = EXCLUDED.updated_at;
    `;
  },

  async listPublished(slug: string): Promise<PublishedComment[]> {
    const client = getPostgresClient();
    const result = await client`
      SELECT
        id,
        slug,
        content,
        author_name as "authorName",
        author_url as "authorUrl",
        device_id as "deviceId",
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM comments
      WHERE slug = ${slug}
      ORDER BY created_at ASC;
    `;

    // Normalize Date objects to ISO strings to match our type definition
    return result.map((row) => ({
      ...row,
      createdAt:
        row.createdAt instanceof Date
          ? row.createdAt.toISOString()
          : String(row.createdAt),
      updatedAt:
        row.updatedAt instanceof Date
          ? row.updatedAt.toISOString()
          : String(row.updatedAt),
    })) as PublishedComment[];
  },
};
