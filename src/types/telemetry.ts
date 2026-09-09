export type TelemetryEventType =
  | "page_view"
  | "user_signup"
  | "user_login"
  | "feature_used"
  | "custom_event"
  | "error"
  | "performance"
  | "api_request";

export type TimeframeOption = "24H" | "7D" | "30D" | "90D";

export interface TelemetryEvent {
  id: string;
  projectId: string;
  projectName: string;
  eventType: TelemetryEventType;
  distinctId: string;
  sessionId: string;
  route?: string;
  durationMs?: number;
  statusCode?: number;
  properties?: Record<string, any>;
  timestamp: string;
}

export interface RouteAnalytics {
  route: string;
  hits: number;
  avgLatencyMs: number;
  errorPercentage: number;
}

export interface FeatureUsage {
  featureName: string;
  usageCount: number;
  uniqueUsers: number;
  trendPercentage: number;
}

export interface TimeSeriesPoint {
  label: string;
  pageViews: number;
  activeUsers: number;
  apiRequests: number;
}

export interface AnalyticsSummary {
  timeframe: TimeframeOption;
  totalPageViews: number;
  totalApiRequests: number;
  dau: number;
  wau: number;
  mau: number;
  avgSessionDurationMin: number;
  timeSeries: TimeSeriesPoint[];
  topRoutes: RouteAnalytics[];
  featureUsage: FeatureUsage[];
}

export interface UserSessionRecord {
  distinctId: string;
  name: string;
  email: string;
  avatar: string;
  lastActive: string;
  totalSessions: number;
  favoriteProject: string;
  status: "active" | "idle" | "offline";
}