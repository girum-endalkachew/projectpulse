import { NextResponse } from "next/server";
import { ingestTelemetryEvent } from "@/lib/telemetry-store";

export async function POST(request: Request) {
  try {
    const apiKey = request.headers.get("x-pulse-api-key") || request.headers.get("authorization");
    if (!apiKey) {
      return NextResponse.json({ success: false, error: "Missing API key in X-Pulse-Api-Key header" }, { status: 401 });
    }

    const body = await request.json();
    if (!body.eventType) {
      return NextResponse.json({ success: false, error: "Missing eventType field" }, { status: 400 });
    }

    const recorded = ingestTelemetryEvent(body);
    return NextResponse.json({ success: true, data: recorded }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid telemetry payload" }, { status: 400 });
  }
}