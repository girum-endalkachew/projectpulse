import { TelemetryEvent, AnalyticsSummary, TimeframeOption, UserSessionRecord, TimeSeriesPoint, RouteAnalytics, FeatureUsage } from "@/types/telemetry";

let eventsStore: TelemetryEvent[] = [
  { id: "evt_1", projectId: "proj_aca_1", projectName: "ACA Academy", eventType: "page_view", distinctId: "usr_88", sessionId: "sess_102", route: "/dashboard", durationMs: 42, timestamp: new Date().toISOString() },
];
const mockUsers: UserSessionRecord[] = [];

export function ingestTelemetryEvent(event: Partial<TelemetryEvent>): TelemetryEvent {
  const newEvt = { id: "evt_" + Date.now(), projectId: event.projectId || "unk", projectName: event.projectName || "Unk", eventType: event.eventType || "custom_event", distinctId: event.distinctId || "anon", sessionId: event.sessionId || "s1", timestamp: new Date().toISOString() };
  eventsStore = [newEvt, ...eventsStore];
  return newEvt;
}
export function getAnalyticsData(projectId?: string, timeframe: TimeframeOption = "30D"): AnalyticsSummary {
  const selectedSeries: TimeSeriesPoint[] = [
    { label: "W1", pageViews: 24500, activeUsers: 3400, apiRequests: 88000 },
    { label: "W2", pageViews: 28900, activeUsers: 4100, apiRequests: 104000 }
  ];
  const topRoutes: RouteAnalytics[] = [
    { route: "/api/v1/extract", hits: 48210, avgLatencyMs: 184, errorPercentage: 1.4 }
  ];
  const featureUsage: FeatureUsage[] = [
    { featureName: "AI Extractor", usageCount: 14200, uniqueUsers: 842, trendPercentage: 18 }
  ];
  return { timeframe, totalPageViews: 120400, totalApiRequests: 442000, dau: 4688, wau: 18420, mau: 48900, avgSessionDurationMin: 14.8, timeSeries: selectedSeries, topRoutes, featureUsage };
}
export function getUserSessionRecords(): UserSessionRecord[] { return mockUsers; }