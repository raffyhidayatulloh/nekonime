import { rateLimit } from "@/libs/rateLimit";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";

  const { allowed, remaining, resetIn } = await rateLimit(ip, 60, 60);

  if (!allowed) {
    return new NextResponse("Too Many Requests", {
      status: 429,
      headers: {
        "Retry-After": resetIn.toString(),
        "X-RateLimit-Limit": "60",
        "X-RateLimit-Remaining": remaining.toString(),
        "X-RateLimit-Reset": resetIn.toString(),
      },
    });
  }


  const res = NextResponse.next({ request: { headers: req.headers, }, });
  res.headers.set("Content-Security-Policy", "script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'");
  return res;
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"], };
