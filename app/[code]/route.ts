import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";
import { redis } from "@/lib/redis";
import { analyticsQueue } from "@/lib/queue";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  try {
    // 1. Check Redis first
    const cachedUrl = await redis.get(`url:${code}`);

    if (cachedUrl) {
      console.log(`🟢 Cache HIT: ${code}`);

      await analyticsQueue.add("click", {
        shortCode: code,
        timestamp: Date.now(),
      });

      return NextResponse.redirect(cachedUrl);
    }

    // Cache miss
    console.log(`🔴 Cache MISS: ${code}`);

    // 2. Query PostgreSQL
    const url = await db.url.findUnique({
      where: {
        shortCode: code,
      },
    });

    if (!url) {
      return NextResponse.json(
        { error: "Short URL not found" },
        { status: 404 }
      );
    }

    // 3. Store in Redis (1-hour TTL)
    await redis.set(`url:${code}`, url.originalUrl, "EX", 3600);

    console.log(`💾 Cached: ${code}`);

    // 4. Queue analytics job
    await analyticsQueue.add("click", {
      shortCode: code,
      timestamp: Date.now(),
    });

    // 5. Redirect
    return NextResponse.redirect(url.originalUrl);
  } catch (error) {
    console.error("Redirect Error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}