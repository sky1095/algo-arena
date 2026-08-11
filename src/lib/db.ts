import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { UserProfile } from "@/lib/types";

/**
 * Server-side SQLite store for accounts only: users + sessions.
 *
 * User *progress* deliberately lives elsewhere — in per-user JSON files
 * (`data/progress/<userId>.json`, see `@/lib/progress-store`) — so there is no
 * unified database holding everyone's progress.
 *
 * Uses the built-in `node:sqlite` module (stable since Node 24), so there are
 * no native dependencies. The database file lives at `data/app.db` by default
 * and can be moved with the `DB_PATH` env var (the Docker image sets it to a
 * mounted volume). This module touches the filesystem and must only be
 * imported from server code (API routes), never from client components.
 */

const DB_PATH = process.env.DB_PATH ?? path.join(process.cwd(), "data", "app.db");

let db: DatabaseSync | null = null;

export function getDb(): DatabaseSync {
  if (!db) {
    mkdirSync(path.dirname(DB_PATH), { recursive: true });
    db = new DatabaseSync(DB_PATH);
    db.exec(`
      PRAGMA journal_mode = WAL;
      PRAGMA foreign_keys = ON;

      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        joined_at INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS sessions (
        token TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        created_at INTEGER NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);

    `);
  }
  return db;
}

// --- Users ---------------------------------------------------------------

export interface UserRecord {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  joinedAt: number;
}

function rowToUser(row: Record<string, unknown> | undefined): UserRecord | null {
  if (!row) return null;
  return {
    id: String(row.id),
    email: String(row.email),
    name: String(row.name),
    passwordHash: String(row.password_hash),
    joinedAt: Number(row.joined_at),
  };
}

export function publicUser(u: UserRecord): UserProfile {
  return { id: u.id, email: u.email, name: u.name, joinedAt: u.joinedAt };
}

export function createUser(input: { email: string; name: string; passwordHash: string }): UserRecord {
  const id = randomUUID();
  getDb()
    .prepare("INSERT INTO users (id, email, name, password_hash, joined_at) VALUES (?, ?, ?, ?, ?)")
    .run(id, input.email, input.name, input.passwordHash, Date.now());
  return { id, email: input.email, name: input.name, passwordHash: input.passwordHash, joinedAt: Date.now() };
}

export function getUserByEmail(email: string): UserRecord | null {
  const stmt = getDb().prepare("SELECT * FROM users WHERE email = ?");
  return rowToUser(stmt.get(email) as Record<string, unknown> | undefined);
}

export function getUserById(id: string): UserRecord | null {
  const stmt = getDb().prepare("SELECT * FROM users WHERE id = ?");
  return rowToUser(stmt.get(id) as Record<string, unknown> | undefined);
}

// --- Sessions ------------------------------------------------------------

export function createSession(userId: string): string {
  const token = randomUUID().replace(/-/g, "") + randomUUID().replace(/-/g, "");
  getDb()
    .prepare("INSERT INTO sessions (token, user_id, created_at) VALUES (?, ?, ?)")
    .run(token, userId, Date.now());
  return token;
}

export function getUserBySessionToken(token: string): UserRecord | null {
  const stmt = getDb().prepare(
    "SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token = ?"
  );
  return rowToUser(stmt.get(token) as Record<string, unknown> | undefined);
}

export function deleteSession(token: string): void {
  getDb().prepare("DELETE FROM sessions WHERE token = ?").run(token);
}
