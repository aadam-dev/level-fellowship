import { SignJWT, jwtVerify } from "jose";

function getSecret() {
  const secret = process.env.QR_SIGNING_SECRET ?? "dev-qr-secret-change-in-production";
  return new TextEncoder().encode(secret);
}

export async function createQrToken(payload: {
  registrationId: number;
  eventId: number;
  email: string;
}): Promise<string> {
  return new SignJWT({
    rid: payload.registrationId,
    eid: payload.eventId,
    email: payload.email,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(getSecret());
}

export async function verifyQrToken(token: string) {
  const { payload } = await jwtVerify(token, getSecret());
  return {
    registrationId: Number(payload.rid),
    eventId: Number(payload.eid),
    email: String(payload.email),
  };
}

export function formatQrScanToken(registrationId: number): string {
  return `qr_scan_token_${registrationId.toString().padStart(4, "0")}A`;
}

export function parseQrScanToken(scanToken: string): number | null {
  const match = scanToken.match(/^qr_scan_token_(\d+)A$/);
  if (!match) return null;
  return parseInt(match[1], 10);
}
