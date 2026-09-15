import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    server: process.env.HOSTNAME,
    time: new Date().toISOString(),
  });
}