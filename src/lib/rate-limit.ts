import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const memoryStore = new Map<string, { count: number; resetAt: number }>();

function memoryLimit(identifier: string, limit: number, windowMs: number) {
  const now = Date.now();
  const entry = memoryStore.get(identifier);
  if (!entry || entry.resetAt <= now) {
    memoryStore.set(identifier, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: limit - 1 };
  }
  if (entry.count >= limit) {
    return { success: false, remaining: 0 };
  }
  entry.count += 1;
  return { success: true, remaining: limit - entry.count };
}

let ratelimit: Ratelimit | null = null;

function getRatelimit() {
  if (ratelimit) return ratelimit;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    ratelimit = new Ratelimit({
      redis: new Redis({ url, token }),
      limiter: Ratelimit.slidingWindow(100, "1 m"),
      prefix: "classroom-industry",
    });
  }
  return ratelimit;
}

export async function enforceRateLimit(identifier: string) {
  const rl = getRatelimit();
  if (rl) {
    const { success, remaining } = await rl.limit(identifier);
    return { success, remaining };
  }
  const result = memoryLimit(identifier, 100, 60_000);
  return result;
}
