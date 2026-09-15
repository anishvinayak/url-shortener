import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { z } from "zod";

import { db } from "@/lib/db";
import { redis } from "@/lib/redis";

const bodySchema = z.object({
  url: z.url(),
});

export async function POST(req: NextRequest) {
  let shortCode = "";

  try {
    // ===== Rate Limiting (10 requests/minute/IP) =====
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0] ?? "unknown";

    const rateKey = `rate:${ip}`;

    const requests = await redis.incr(rateKey);

    if (requests === 1) {
      await redis.expire(rateKey, 60);
    }

    if (requests > 10) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Try again in a minute." },
        { status: 429 }
      );
    }

    // ===== Validate Request =====
    const body = bodySchema.parse(await req.json());

    // ===== Return Existing URL if Already Exists =====
    const existing = await db.url.findUnique({
      where: {
        originalUrl: body.url,
      },
    });

    if (existing) {
      return NextResponse.json({
        message: "URL already shortened.",
        shortCode: existing.shortCode,
        shortUrl: `${req.nextUrl.origin}/${existing.shortCode}`,
        originalUrl: existing.originalUrl,
      });
    }

    // ===== Distributed Lock with Redis =====
    let lockAcquired = false;

    for (let i = 0; i < 5; i++) {
      shortCode = nanoid(7);

    const lock = await redis.set(
  `lock:${shortCode}`,
  "1",
  "EX",
  10,
  "NX"
);

      if (lock === "OK") {
        lockAcquired = true;
        break;
      }
    }

    if (!lockAcquired) {
      return NextResponse.json(
        { error: "Unable to generate unique short code." },
        { status: 503 }
      );
    }

    // ===== Save to PostgreSQL =====
    const url = await db.url.create({
      data: {
        originalUrl: body.url,
        shortCode,
      },
    });

    // ===== Write-Through Cache =====
await redis.set(`url:${shortCode}`, url.originalUrl, "EX", 3600);
    return NextResponse.json(
      {
        message: "Short URL created successfully.",
        shortCode,
        shortUrl: `${req.nextUrl.origin}/${shortCode}`,
        originalUrl: url.originalUrl,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? "Invalid request." },
        { status: 400 }
      );
    }

    console.error(error);

    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  } finally {
    // Always release the lock if one was acquired
    if (shortCode) {
      await redis.del(`lock:${shortCode}`);
    }
  }
}