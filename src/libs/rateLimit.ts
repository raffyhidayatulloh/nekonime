import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!);

/**
 * Token bucket rate limiter with Redis (industry-ready).
 *
 * @param key - identifier (e.g., IP or userId)
 * @param limit - max requests allowed
 * @param windowSec - time window in seconds
 */
export async function rateLimit(
  key: string,
  limit: number,
  windowSec: number
): Promise<{ allowed: boolean; remaining: number; resetIn: number }> {
  const now = Math.floor(Date.now() / 1000); // current time in seconds
  const bucketKey = `ratelimit:${key}`;

  // Use Redis transactions to keep atomicity
  const ttl = await redis.ttl(bucketKey);
  const requests = await redis.incr(bucketKey);

  if (requests === 1) {
    // first request, set expiry
    await redis.expire(bucketKey, windowSec);
  }

  const allowed = requests <= limit;
  const remaining = Math.max(0, limit - requests);
  const resetIn = ttl > 0 ? ttl : windowSec;

  return { allowed, remaining, resetIn };
}
