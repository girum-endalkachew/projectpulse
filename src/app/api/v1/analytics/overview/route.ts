import { NextResponse } from "next/server";
import { getAnalyticsData } from "@/lib/telemetry-store";
import { TimeframeOption } from "@/types/telemetry";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const timeframe = (searchParams.get("timeframe") as TimeframeOption) || "30D";

  const analytics = getAnalyticsData(undefined, timeframe);
  return NextResponse.json({ success: true, data: analytics });
}