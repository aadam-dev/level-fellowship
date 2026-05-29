import { describe, it, expect } from "vitest";
import { formatQrScanToken, parseQrScanToken } from "@/lib/qr";

describe("event scan tokens", () => {
  it("round-trips registration id", () => {
    const token = formatQrScanToken(991);
    expect(parseQrScanToken(token)).toBe(991);
  });
});
