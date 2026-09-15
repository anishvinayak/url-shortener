import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { redis } from "@/lib/redis";

export async function GET() {
  try {
    await db.$queryRaw`SELECT 1`;
    await redis.ping();

    return NextResponse.json({
      status: "ok",
      database: "connected",
      redis: "connected",
    });
  } catch {
    return NextResponse.json(
      {
        status: "error",
      },
      { status: 500 }
    );
  }
}