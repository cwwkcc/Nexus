// packages/database/src/lib/totp.ts
//
// TOTP (RFC 6238) and single-use backup codes for the break-glass account
// only (F-080). No other admin account uses this at all — every other
// admin's second factor is the school's own Google Workspace enforcement,
// a setting controlled entirely outside Nexus.
//
// Lives alongside password.ts for the same reason: the setup-totp page (that
// generates and verifies secrets/codes) and anything else that ever needs to
// check a TOTP code must use one shared implementation, not two that could
// drift.
//
// Uses otplib's newer "functional" API (v13+) — `generateSecret`,
// `generateURI`, `verify` — not the older `authenticator` namespace object
// from otplib v11/v12, which this version of the package no longer exports.

import bcrypt from 'bcryptjs';
import { generateSecret as otpGenerateSecret, generateURI, verify as otpVerify } from 'otplib';
import QRCode from 'qrcode';

const ISSUER = 'Nexus Admin (CWWKCC)';
const BACKUP_CODE_COUNT = 10;
const BACKUP_CODE_BCRYPT_COST = 10; // lower than password.ts's 12: these codes
// are already high-entropy random values, not user-chosen secrets, so the
// hash only needs to resist an offline dump of the table, not a dictionary
// attack — a lower cost keeps verifying a login attempt fast.

export function generateTotpSecret(): string {
  return otpGenerateSecret();
}

/** otpauth:// URI a standard authenticator app (Google Authenticator, Authy,
 *  1Password) scans to enroll the break-glass account. */
export function totpKeyUri(email: string, secret: string): string {
  return generateURI({ issuer: ISSUER, label: email, secret });
}

/** Data URL (`data:image/png;base64,...`) of a QR code encoding the key URI
 *  above — rendered directly in an `<img>` on the setup-totp page. */
export async function totpQrCodeDataUrl(keyUri: string): Promise<string> {
  return QRCode.toDataURL(keyUri, { errorCorrectionLevel: 'M', margin: 2 });
}

export async function verifyTotpToken(token: string, secret: string): Promise<boolean> {
  // otplib's `verify()` expects a well-formed numeric code; guard malformed
  // input ourselves so a caller never has to wrap this in its own
  // try/catch for something as ordinary as a mistyped code.
  if (!/^\d{6,8}$/.test(token)) return false;

  try {
    const result = await otpVerify({ secret, token });
    return result.valid;
  } catch {
    return false;
  }
}

export interface GeneratedBackupCodes {
  /** Shown to the user exactly once, at setup time. Never persisted. */
  plaintextCodes: string[];
  /** Persisted as `BackupCode.codeHash` rows, one per code. */
  hashedCodes: string[];
}

function randomBackupCode(): string {
  // "XXXX-XXXX" (8 alphanumeric chars, excluding visually ambiguous
  // characters: 0/O, 1/I/L) — readable enough to type back in by hand if
  // the authenticator device is unavailable.
  const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    if (i === 4) code += '-';
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return code;
}

export async function generateBackupCodes(): Promise<GeneratedBackupCodes> {
  const plaintextCodes = Array.from({ length: BACKUP_CODE_COUNT }, randomBackupCode);
  const hashedCodes = await Promise.all(plaintextCodes.map((code) => bcrypt.hash(code, BACKUP_CODE_BCRYPT_COST)));
  return { plaintextCodes, hashedCodes };
}

export async function verifyBackupCode(plaintext: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plaintext.trim().toUpperCase(), hash);
}
