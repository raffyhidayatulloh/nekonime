import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!);

export async function rateLimit(
  key: string,
  limit: number,
  windowSec: number
): Promise<{ allowed: boolean; remaining: number; resetIn: number }> {
  const bucketKey = `ratelimit:${key}`;

  const ttl = await redis.ttl(bucketKey);
  const requests = await redis.incr(bucketKey);

  if (requests === 1) {
    await redis.expire(bucketKey, windowSec);
  }

  const allowed = requests <= limit;
  const remaining = Math.max(0, limit - requests);
  const resetIn = ttl > 0 ? ttl : windowSec;

  return { allowed, remaining, resetIn };
}
