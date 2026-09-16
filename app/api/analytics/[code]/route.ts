import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;

    const url = await db.url.findUnique({
      where: {
        shortCode: code,
      },
      select: {
        shortCode: true,
        originalUrl: true,
        clicks: true,
        createdAt: true,
      },
    });

    if (!url) {
      return NextResponse.json(
        { error: "Short URL not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(url);
  } catch (error) {
    console.error("Analytics API Error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}