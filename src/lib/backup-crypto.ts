/**
 * Client-side encryption for progress backups.
 *
 * The exported JSON is wrapped in an encrypted envelope: the plaintext backup
 * (solved / attempted / submissions / email) is AES-256-GCM encrypted with a
 * key derived from the user's account password via PBKDF2-SHA256. A random
 * salt + IV are stored alongside the ciphertext, so the same password unlocks
 * the file on any machine — no server, no stored secrets.
 *
 * Uses the browser's built-in Web Crypto API — zero dependencies.
 */

export const BACKUP_ENCRYPTED_VERSION = 2;
const PBKDF2_ITERATIONS = 250_000;
const SALT_BYTES = 16;
const IV_BYTES = 12;

function toBase64(bytes: Uint8Array<ArrayBuffer>): string {
  // Chunk to avoid call-stack limits with large payloads (submissions carry code).
  let out = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    out += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(out);
}

function fromBase64(b64: string): Uint8Array<ArrayBuffer> {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function deriveKey(password: string, salt: Uint8Array<ArrayBuffer>): Promise<CryptoKey> {
  const material = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, [
    "deriveKey",
  ]);
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export interface EncryptedBackupEnvelope {
  app: "algo-arena";
  version: number;
  encrypted: true;
  kdf: "pbkdf2-sha256";
  iterations: number;
  cipher: "aes-256-gcm";
  salt: string;
  iv: string;
  data: string;
}

export function isEncryptedBackup(parsed: unknown): parsed is EncryptedBackupEnvelope {
  return !!parsed && typeof parsed === "object" && (parsed as Record<string, unknown>).encrypted === true;
}

/** Encrypt a backup's plaintext JSON into an envelope string. */
export async function encryptBackup(plaintext: string, password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
  const iv = crypto.getRandomValues(new Uint8Array(IV_BYTES));
  const key = await deriveKey(password, salt);
  const ciphertext = new Uint8Array(
    await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(plaintext))
  );
  const envelope: EncryptedBackupEnvelope = {
    app: "algo-arena",
    version: BACKUP_ENCRYPTED_VERSION,
    encrypted: true,
    kdf: "pbkdf2-sha256",
    iterations: PBKDF2_ITERATIONS,
    cipher: "aes-256-gcm",
    salt: toBase64(salt),
    iv: toBase64(iv),
    data: toBase64(ciphertext), // ciphertext + GCM auth tag
  };
  return JSON.stringify(envelope);
}

/** Decrypt an envelope back into the backup's plaintext JSON. */
export async function decryptBackup(envelope: EncryptedBackupEnvelope, password: string): Promise<string> {
  let salt: Uint8Array<ArrayBuffer>;
  let iv: Uint8Array<ArrayBuffer>;
  let data: Uint8Array<ArrayBuffer>;
  try {
    salt = fromBase64(envelope.salt);
    iv = fromBase64(envelope.iv);
    data = fromBase64(envelope.data);
  } catch {
    throw new Error("This backup file is corrupted.");
  }
  const key = await deriveKey(password, salt);
  try {
    const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, data);
    return new TextDecoder().decode(plain);
  } catch {
    throw new Error("Incorrect password — could not unlock this backup.");
  }
}
