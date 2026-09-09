import { TelemetryEvent, AnalyticsSummary, TimeframeOption, UserSessionRecord } from "@/types/telemetry";

let eventsStore: TelemetryEvent[] = [
  {
    id: "evt_1",
    projectId: "proj_aca_1",
    projectName: "ACA Academy",
    eventType: "page_view",
    distinctId: "usr_student_88",
    sessionId: "sess_102",
    route: "/dashboard/courses",
    durationMs: 42,
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
  },
  {
    id: "evt_2",
    projectId: "proj_sift_2",
    projectName: "Sift",
    eventType: "api_request",
    distinctId: "usr_analyst_04",
    sessionId: "sess_108",
    route: "/api/v1/extract",
    durationMs: 184,
    statusCode: 200,
    timestamp: new Date(Date.now() - 12 * 60000).toISOString(),
  },
  {
    id: "evt_3",
    projectId: "proj_examguard_3",
    projectName: "ExamGuard",
    eventType: "feature_used",
    distinctId: "usr_proctor_12",
    sessionId: "sess_112",
    route: "/exam/proctor-live",
    properties: { feature: "ai-gaze-detection" },
    timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
  },
  {
    id: "evt_4",
    projectId: "proj_focusos_4",
    projectName: "Focus OS",
    eventType: "user_login",
    distinctId: "usr_focus_99",
    sessionId: "sess_120",
    route: "/app/today",
    timestamp: new Date(Date.now() - 40 * 60000).toISOString(),
  },
];

const mockUsers: UserSessionRecord[] = [
  {
    distinctId: "usr_focus_99",
    name: "Abebe Kebede",
    email: "abebe@focusos.app",
    avatar: "AK",
    lastActive: "2 mins ago",
    totalSessions: 142,
    favoriteProject: "Focus OS",
    status: "active",
  },
  {
    distinctId: "usr_student_88",
    name: "Bethlehem Tadesse",
    email: "betty@aca.academy",
    avatar: "BT",
    lastActive: "5 mins ago",
    totalSessions: 89,
    favoriteProject: "ACA Academy",
    status: "active",
  },
  {
    distinctId: "usr_analyst_04",
    name: "Dawit Wolde",
    email: "dawit@sift.dev",
    avatar: "DW",
    lastActive: "12 mins ago",
    totalSessions: 64,
    favoriteProject: "Sift",
    status: "idle",
  },
  {
    distinctId: "usr_proctor_12",
    name: "Eleni Hailu",
    email: "eleni@examguard.io",
    avatar: "EH",
    lastActive: "25 mins ago",
    totalSessions: 210,
    favoriteProject: "ExamGuard",
    status: "idle",
  },
  {
    distinctId: "usr_dev_33",
    name: "Yonas Alemu",
    email: "yonas@dev.io",
    avatar: "YA",
    lastActive: "1 hour ago",
    totalSessions: 38,
    favoriteProject: "Focus OS",
    status: "offline",
  },
];

export function ingestTelemetryEvent(event: Partial<TelemetryEvent>): TelemetryEvent {
  const newEvt: TelemetryEvent = {
    id: "evt_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
    projectId: event.projectId || "proj_unknown",
    projectName: event.projectName || "Unknown Application",
    eventType: event.eventType || "custom_event",
    distinctId: event.distinctId || "usr_anonymous",
    sessionId: event.sessionId || "sess_" + Date.now(),
    route: event.route || "/",
    durationMs: event.durationMs || 20,
    statusCode: event.statusCode || 200,
    properties: event.properties || {},
    timestamp: new Date().toISOString(),
  };

  eventsStore = [newEvt, ...eventsStore];
  return newEvt;
}

export function getAnalyticsData(projectId?: string, timeframe: TimeframeOption = "30D"): AnalyticsSummary {
  const timeSeriesMap: Record<string, TimeSeriesPoint> = {
    "24H": [
      { label: "00:00", pageViews: 120, activeUsers: 45, apiRequests: 410 },
      { label: "04:00", pageViews: 80, activeUsers: 22, apiRequests: 280 },
      { label: "08:00", pageViews: 340, activeUsers: 140, apiRequests: 1100 },
      { label: "12:00", pageViews: 620, activeUsers: 280, apiRequests: 2400 },
      { label: "16:00", pageViews: 890, activeUsers: 410, apiRequests: 3200 },
      { label: "20:00", pageViews: 540, activeUsers: 230, apiRequests: 1800 },
    ] as any,
    "7D": [
      { label: "Mon", pageViews: 4200, activeUsers: 1200, apiRequests: 15400 },
      { label: "Tue", pageViews: 5100, activeUsers: 1450, apiRequests: 18900 },
      { label: "Wed", pageViews: 4800, activeUsers: 1380, apiRequests: 17200 },
      { label: "Thu", pageViews: 6200, activeUsers: 1820, apiRequests: 22100 },
      { label: "Fri", pageViews: 5900, activeUsers: 1690, apiRequests: 20400 },
      { label: "Sat", pageViews: 3100, activeUsers: 890, apiRequests: 9800 },
      { label: "Sun", pageViews: 2800, activeUsers: 740, apiRequests: 8200 },
    ] as any,
    "30D": [
      { label: "Week 1", pageViews: 24500, activeUsers: 3400, apiRequests: 88000 },
      { label: "Week 2", pageViews: 28900, activeUsers: 4100, apiRequests: 104000 },
      { label: "Week 3", pageViews: 31200, activeUsers: 4550, apiRequests: 118000 },
      { label: "Week 4", pageViews: 35800, activeUsers: 4890, apiRequests: 132000 },
    ] as any,
    "90D": [
      { label: "Month 1", pageViews: 88000, activeUsers: 8900, apiRequests: 310000 },
      { label: "Month 2", pageViews: 112000, activeUsers: 11400, apiRequests: 420000 },
      { label: "Month 3", pageViews: 145000, activeUsers: 14800, apiRequests: 540000 },
    ] as any,
  };

  const selectedSeries = timeSeriesMap[timeframe] || timeSeriesMap["30D"];

  const topRoutes: RouteAnalytics[] = [
    { route: "/api/v1/extract", hits: 48210, avgLatencyMs: 184, errorPercentage: 1.4 },
    { route: "/dashboard/courses", hits: 32400, avgLatencyMs: 32, errorPercentage: 0.1 },
    { route: "/exam/proctor-live", hits: 18900, avgLatencyMs: 340, errorPercentage: 2.1 },
    { route: "/app/today", hits: 89400, avgLatencyMs: 18, errorPercentage: 0.0 },
    { route: "/auth/login", hits: 12400, avgLatencyMs: 28, errorPercentage: 0.2 },
  ];

  const featureUsage: FeatureUsage[] = [
    { featureName: "AI Document Extractor", usageCount: 14200, uniqueUsers: 842, trendPercentage: 18 },
    { featureName: "Live Exam Video Stream", usageCount: 8900, uniqueUsers: 412, trendPercentage: -4 },
    { featureName: "Deep-Work Focus Timer", usageCount: 42100, uniqueUsers: 2150, trendPercentage: 42 },
    { featureName: "Student Course Analytics", usageCount: 22400, uniqueUsers: 1284, trendPercentage: 12 },
  ];

  return {
    timeframe,
    totalPageViews: 120400,
    totalApiRequests: 442000,
    dau: 4688,
    wau: 18420,
    mau: 48900,
    avgSessionDurationMin: 14.8,
    timeSeries: selectedSeries,
    topRoutes,
    featureUsage,
  };
}

export function getUserSessionRecords(): UserSessionRecord[] {
  return mockUsers;
}