import { createHmac } from "node:crypto";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
let limiter: Ratelimit | undefined;
const local = new Map<string, { count: number; reset: number }>();
export async function allowEnquiry(request: Request) {
  const configured =
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN &&
    process.env.RATE_LIMIT_SALT;
  if (configured) {
    limiter ??= new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, "15 m"),
      prefix: "nestora:enquiries",
      analytics: false,
    });
    // Vercel overwrites this header. On other hosts, use a shared anonymous bucket until a trusted proxy is configured.
    const ip = process.env.VERCEL
      ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
        "unknown"
      : "shared";
    const key = createHmac("sha256", process.env.RATE_LIMIT_SALT!)
      .update(ip)
      .digest("hex");
    const result = await limiter.limit(key);
    return result.success;
  }
  if (process.env.NODE_ENV === "production")
    throw new Error("Rate limiting is not configured");
  const now = Date.now();
  for (const [key, value] of local) if (value.reset < now) local.delete(key);
  const bucket = local.get("local") || { count: 0, reset: now + 900000 };
  bucket.count++;
  local.set("local", bucket);
  return bucket.count <= 5;
}
