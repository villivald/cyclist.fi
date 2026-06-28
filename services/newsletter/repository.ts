import postgres from "postgres";

let sql: ReturnType<typeof postgres> | null = null;

const getPostgresClient = () => {
  if (sql) return sql;

  const connectionString = process.env.POSTGRES_URL;
  if (!connectionString) {
    throw new Error("POSTGRES_URL environment variable is not set");
  }

  sql = postgres(connectionString, {
    max: 1,
    idle_timeout: 20,
    connect_timeout: 10,
    onnotice: () => {},
    debug: false,
  });

  return sql;
};

let tableReady: Promise<void> | null = null;

const ensureSubscribersTable = async () => {
  if (!tableReady) {
    tableReady = (async () => {
      const client = getPostgresClient();
      await client`
        CREATE TABLE IF NOT EXISTS newsletter_subscribers (
          id TEXT PRIMARY KEY,
          email TEXT NOT NULL UNIQUE,
          locale TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;
    })().catch((error) => {
      tableReady = null;
      throw error;
    });
  }

  return tableReady;
};

export const newsletterRepository = {
  ensureTable: ensureSubscribersTable,

  async subscribe(payload: { email: string; locale?: string }) {
    await ensureSubscribersTable();

    const client = getPostgresClient();
    const id = crypto.randomUUID().replace(/-/g, "");
    const normalizedEmail = payload.email.trim().toLowerCase();

    const result = await client`
      INSERT INTO newsletter_subscribers (id, email, locale)
      VALUES (${id}, ${normalizedEmail}, ${payload.locale ?? null})
      ON CONFLICT (email) DO NOTHING
      RETURNING id;
    `;

    return { subscribed: result.length > 0 };
  },
};
