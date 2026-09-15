import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  try {
    const url = await db.url.findUnique({
      where: {
        shortCode: code,
      },
    });

    if (!url) {
      return NextResponse.json(
        { error: "URL not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      shortCode: url.shortCode,
      originalUrl: url.originalUrl,
      clicks: url.clicks,
      createdAt: url.createdAt,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  }
}