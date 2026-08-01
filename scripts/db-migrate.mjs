import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadEnv } from "dotenv";
import pg from "pg";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
loadEnv({ path: path.join(root, ".env.local") });
loadEnv({ path: path.join(root, ".env") });

const migrationsDir = path.join(root, "supabase", "migrations");

function projectRefFromUrl(url) {
  try {
    const host = new URL(url).hostname;
    const match = host.match(/^([a-z0-9-]+)\.supabase\.co$/i);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}

function resolveDbUrl() {
  if (process.env.SUPABASE_DB_URL?.trim()) {
    return process.env.SUPABASE_DB_URL.trim();
  }

  const password = process.env.SUPABASE_DB_PASSWORD?.trim();
  const apiUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const ref = projectRefFromUrl(apiUrl ?? "");

  if (!password || !ref) {
    return null;
  }

  const encoded = encodeURIComponent(password);
  return `postgresql://postgres:${encoded}@db.${ref}.supabase.co:5432/postgres`;
}

async function ensureMigrationTable(client) {
  await client.query(`
    create schema if not exists thirteenstack;
    create table if not exists thirteenstack.schema_migrations (
      filename text primary key,
      applied_at timestamptz not null default now()
    );
  `);
}

async function alreadyApplied(client, filename) {
  const { rows } = await client.query(
    `select 1 from thirteenstack.schema_migrations where filename = $1`,
    [filename],
  );
  return rows.length > 0;
}

async function markApplied(client, filename) {
  await client.query(
    `insert into thirteenstack.schema_migrations (filename) values ($1)
     on conflict (filename) do nothing`,
    [filename],
  );
}

async function main() {
  const dbUrl = resolveDbUrl();
  if (!dbUrl) {
    console.error(`
Missing database connection.

Add one of these to .env.local:

  SUPABASE_DB_URL=postgresql://postgres:YOUR_PASSWORD@db.YOUR_REF.supabase.co:5432/postgres

or:

  NEXT_PUBLIC_SUPABASE_URL=https://YOUR_REF.supabase.co
  SUPABASE_DB_PASSWORD=YOUR_DB_PASSWORD

Password: Supabase Dashboard → Project Settings → Database.
`);
    process.exit(1);
  }

  const files = (await readdir(migrationsDir))
    .filter((f) => f.endsWith(".sql"))
    .sort();

  if (files.length === 0) {
    console.error(`No .sql files in ${migrationsDir}`);
    process.exit(1);
  }

  const client = new pg.Client({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false },
  });

  console.log("Connecting to Supabase Postgres…");
  await client.connect();

  try {
    await ensureMigrationTable(client);

    for (const file of files) {
      if (await alreadyApplied(client, file)) {
        console.log(`skip  ${file} (already applied)`);
        continue;
      }

      const sql = await readFile(path.join(migrationsDir, file), "utf8");
      console.log(`apply ${file}`);
      await client.query("begin");
      try {
        await client.query(sql);
        await markApplied(client, file);
        await client.query("commit");
        console.log(`ok    ${file}`);
      } catch (err) {
        await client.query("rollback");
        throw err;
      }
    }

    console.log("\nMigrations complete.");
    console.log(
      "Reminder: Dashboard → Settings → API → Exposed schemas → add `thirteenstack`.",
    );
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error("\nMigration failed:");
  console.error(err.message || err);
  process.exit(1);
});
