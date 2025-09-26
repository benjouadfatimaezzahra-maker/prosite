import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

const KEY_LENGTH = 64;

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = scryptSync(password, salt, KEY_LENGTH);
  return `${salt}:${derivedKey.toString("hex")}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const [salt, key] = storedHash.split(":");
  if (!salt || !key) {
    return false;
  }
  const hashedBuffer = Buffer.from(key, "hex");
  const derivedKey = scryptSync(password, salt, KEY_LENGTH);

  if (hashedBuffer.length !== derivedKey.length) {
    return false;
  }

  return timingSafeEqual(hashedBuffer, derivedKey);
}
