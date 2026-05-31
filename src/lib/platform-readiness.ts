import { prisma } from "@/lib/prisma";

export type PlatformMode = "live" | "preview";

export function isPreviewModeForced(): boolean {
  return (
    process.env.PLATFORM_PREVIEW === "true" ||
    process.env.NEXT_PUBLIC_PLATFORM_PREVIEW === "true"
  );
}

export async function isDatabaseConnected(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}

export async function getPlatformMode(): Promise<PlatformMode> {
  if (isPreviewModeForced()) return "preview";
  const connected = await isDatabaseConnected();
  return connected ? "live" : "preview";
}
