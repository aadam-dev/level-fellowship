import { describe, it, expect } from "vitest";
import { createQrToken, verifyQrToken, formatQrScanToken, parseQrScanToken } from "@/lib/qr";

describe("qr tokens", () => {
  it("creates and verifies JWT qr payload", async () => {
    process.env.QR_SIGNING_SECRET = "test-secret-32-characters-minimum!";
    const token = await createQrToken({
      registrationId: 42,
      eventId: 1,
      email: "test@example.com",
    });
    const payload = await verifyQrToken(token);
    expect(payload.registrationId).toBe(42);
    expect(payload.eventId).toBe(1);
    expect(payload.email).toBe("test@example.com");
  });

  it("formats and parses scan tokens", () => {
    expect(formatQrScanToken(4092)).toBe("qr_scan_token_4092A");
    expect(parseQrScanToken("qr_scan_token_4092A")).toBe(4092);
    expect(parseQrScanToken("invalid")).toBeNull();
  });
});
