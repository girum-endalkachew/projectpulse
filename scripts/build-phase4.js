const fs = require('fs');
const path = require('path');

function ensureDir(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

const files = {
  "docs/ROADMAP.md": `# ProjectPulse — 10-Phase Master Roadmap

| Phase | Build | Status |
| :--- | :--- | :--- |
| **0** | Architecture + product specification | **COMPLETED** |
| **1** | Design system + app foundation | **COMPLETED** |
| **2** | Landing page + authentication | **COMPLETED** |
| **3** | Projects + main dashboard | **COMPLETED** |
| **4** | **Telemetry + analytics** | **COMPLETED** |
| **5** | Health monitoring + incidents | UP NEXT |
| **6** | Error tracking + deployments | UPCOMING |
| **7** | SDK + integrations | UPCOMING |
| **8** | Tasks + releases + ideas | UPCOMING |
| **9** | AI Copilot + AI insights | UPCOMING |
| **10** | Security, performance, polish + production | UPCOMING |
`,

  "src/types/telemetry.ts": `export type TelemetryEventType =
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
`,

  "src/lib/telemetry-store.ts": `import { TelemetryEvent, AnalyticsSummary, TimeframeOption, UserSessionRecord } from "@/types/telemetry";

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
`,

  "src/app/api/v1/events/route.ts": `import { NextResponse } from "next/server";
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
`,

  "src/app/api/v1/projects/[id]/analytics/route.ts": `import { NextResponse } from "next/server";
import { getAnalyticsData } from "@/lib/telemetry-store";
import { TimeframeOption } from "@/types/telemetry";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const timeframe = (searchParams.get("timeframe") as TimeframeOption) || "30D";

  const analytics = getAnalyticsData(id, timeframe);
  return NextResponse.json({ success: true, data: analytics });
}
`,

  "src/app/api/v1/analytics/overview/route.ts": `import { NextResponse } from "next/server";
import { getAnalyticsData } from "@/lib/telemetry-store";
import { TimeframeOption } from "@/types/telemetry";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const timeframe = (searchParams.get("timeframe") as TimeframeOption) || "30D";

  const analytics = getAnalyticsData(undefined, timeframe);
  return NextResponse.json({ success: true, data: analytics });
}
`,

  "src/components/analytics/AnalyticsAreaChart.tsx": `"use client";

import { TimeSeriesPoint } from "@/types/telemetry";

interface ChartProps {
  data: TimeSeriesPoint[];
  accentColor?: string;
  metricKey?: "pageViews" | "activeUsers" | "apiRequests";
}

export function AnalyticsAreaChart({
  data,
  accentColor = "#6366F1",
  metricKey = "activeUsers",
}: ChartProps) {
  if (!data || data.length < 2) return null;

  const values = data.map((d) => d[metricKey]);
  const max = Math.max(...values) || 1;
  const min = Math.min(...values);

  const width = 800;
  const height = 240;

  const points = data
    .map((d, idx) => {
      const x = (idx / (data.length - 1)) * (width - 40) + 20;
      const y = height - ((d[metricKey] - min) / (max - min || 1)) * (height - 60) - 30;
      return x + "," + y;
    })
    .join(" ");

  const firstX = 20;
  const lastX = width - 20;
  const areaPoints = firstX + "," + (height - 10) + " " + points + " " + lastX + "," + (height - 10);

  const gradId = "area-grad-" + accentColor.replace("#", "");

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={"0 0 " + width + " " + height} className="w-full h-auto overflow-visible">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.4" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Fill Gradient Area */}
        <polygon fill={"url(#" + gradId + ")"} points={areaPoints} />

        {/* Line */}
        <polyline
          fill="none"
          stroke={accentColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />

        {/* Data Node Dots & Labels */}
        {data.map((d, idx) => {
          const x = (idx / (data.length - 1)) * (width - 40) + 20;
          const y = height - ((d[metricKey] - min) / (max - min || 1)) * (height - 60) - 30;

          return (
            <g key={d.label}>
              <circle cx={x} cy={y} r="5" fill="#0B0C10" stroke={accentColor} strokeWidth="3" />
              <text x={x} y={height - 5} textAnchor="middle" fill="#9CA3AF" fontSize="11" fontWeight="600">
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
`,

  "src/components/analytics/TopRoutesTable.tsx": `"use client";

import { RouteAnalytics } from "@/types/telemetry";

interface TableProps {
  routes: RouteAnalytics[];
}

export function TopRoutesTable({ routes }: TableProps) {
  return (
    <div className="glass-panel-2 rounded-3xl p-6 border border-white/10">
      <h3 className="text-base font-bold text-white mb-1">Top Application Routes</h3>
      <p className="text-xs text-gray-400 mb-6">Route traffic distribution, average latency, and exception rates</p>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              <th className="pb-3">Route Endpoint</th>
              <th className="pb-3 text-right">Total Hits</th>
              <th className="pb-3 text-right">Avg Latency</th>
              <th className="pb-3 text-right">Error Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs">
            {routes.map((r) => (
              <tr key={r.route} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3 font-mono text-indigo-300 font-semibold">{r.route}</td>
                <td className="py-3 text-right font-bold text-white">{r.hits.toLocaleString()}</td>
                <td className="py-3 text-right font-medium text-gray-300">{r.avgLatencyMs}ms</td>
                <td className="py-3 text-right">
                  <span
                    className={"font-bold text-[11px] " + (
                      r.errorPercentage > 1.0 ? "text-rose-400" : "text-emerald-400"
                    )}
                  >
                    {r.errorPercentage}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
`,

  "src/components/analytics/FeatureUsageGrid.tsx": `"use client";

import { FeatureUsage } from "@/types/telemetry";
import { Sparkles, TrendingUp, Users } from "lucide-react";

interface GridProps {
  features: FeatureUsage[];
}

export function FeatureUsageGrid({ features }: GridProps) {
  return (
    <div className="glass-panel-2 rounded-3xl p-6 border border-white/10">
      <h3 className="text-base font-bold text-white mb-1">Feature Adoption & Usage</h3>
      <p className="text-xs text-gray-400 mb-6">Product feature engagement tracked via SDK pulse.track()</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((f) => (
          <div key={f.featureName} className="glass-panel-1 p-4 rounded-2xl border border-white/5 flex flex-col justify-between">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-xs font-bold text-white">{f.featureName}</h4>
                <p className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                  <Users className="w-3 h-3 text-indigo-400" /> {f.uniqueUsers} active users
                </p>
              </div>
              <span
                className={"text-[10px] font-bold px-2 py-0.5 rounded-full border " + (
                  f.trendPercentage >= 0
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                    : "bg-rose-500/10 border-rose-500/30 text-rose-400"
                )}
              >
                {f.trendPercentage >= 0 ? "?" : "?"} {Math.abs(f.trendPercentage)}%
              </span>
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] text-gray-400 uppercase font-semibold">Total Triggers</span>
              <span className="text-xs font-bold text-indigo-300 font-mono">{f.usageCount.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
`,

  "src/app/app/analytics/page.tsx": `"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { AnalyticsSummary, TimeframeOption } from "@/types/telemetry";
import { AnalyticsAreaChart } from "@/components/analytics/AnalyticsAreaChart";
import { TopRoutesTable } from "@/components/analytics/TopRoutesTable";
import { FeatureUsageGrid } from "@/components/analytics/FeatureUsageGrid";
import { Activity, Users, Globe, Zap, Clock } from "lucide-react";

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState<TimeframeOption>("30D");
  const [metricKey, setMetricKey] = useState<"activeUsers" | "pageViews" | "apiRequests">("activeUsers");
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchAnalytics() {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/analytics/overview?timeframe=" + timeframe);
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAnalytics();
  }, [timeframe]);

  return (
    <AppShell>
      {/* Header & Timeframe Switcher */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white">Analytics Command Center</h1>
          <p className="text-xs text-gray-400 mt-1">Cross-project telemetry, traffic trends, and usage metrics</p>
        </div>

        <div className="flex items-center gap-2 glass-panel-2 p-1.5 rounded-2xl border border-white/10 self-start">
          {(["24H", "7D", "30D", "90D"] as TimeframeOption[]).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={"px-3 py-1.5 rounded-xl text-xs font-bold transition-all " + (
                timeframe === tf
                  ? "bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                  : "text-gray-400 hover:text-white"
              )}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Cards Row */}
      {data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="glass-panel-2 rounded-3xl p-5 border border-white/10">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Daily Active (DAU)</p>
            <p className="text-3xl font-black text-white">{data.dau.toLocaleString()}</p>
            <span className="text-[10px] text-emerald-400 font-medium">Distinct IDs active</span>
          </div>

          <div className="glass-panel-2 rounded-3xl p-5 border border-white/10">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Monthly Active (MAU)</p>
            <p className="text-3xl font-black text-cyan-300">{data.mau.toLocaleString()}</p>
            <span className="text-[10px] text-gray-400 font-medium">30-day active pool</span>
          </div>

          <div className="glass-panel-2 rounded-3xl p-5 border border-white/10">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Total Page Views</p>
            <p className="text-3xl font-black text-indigo-300">{data.totalPageViews.toLocaleString()}</p>
            <span className="text-[10px] text-gray-400 font-medium">Web + App client events</span>
          </div>

          <div className="glass-panel-2 rounded-3xl p-5 border border-white/10">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Avg Session Duration</p>
            <p className="text-3xl font-black text-purple-300">{data.avgSessionDurationMin}m</p>
            <span className="text-[10px] text-gray-400 font-medium">Engaged retention time</span>
          </div>
        </div>
      )}

      {/* Main Glass Area Chart Panel (Matching Prototype Screen 5) */}
      <div className="glass-panel-2 rounded-3xl p-6 border border-white/10 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-base font-bold text-white">Ecosystem Traffic & Engagement Trend</h2>
            <p className="text-xs text-gray-400">Time-bucket telemetry curves across all applications</p>
          </div>

          {/* Metric Selector Buttons */}
          <div className="flex items-center gap-2 glass-panel-1 p-1 rounded-xl border border-white/5">
            <button
              onClick={() => setMetricKey("activeUsers")}
              className={"px-3 py-1 rounded-lg text-xs font-semibold transition-colors " + (
                metricKey === "activeUsers" ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-white"
              )}
            >
              Active Users
            </button>
            <button
              onClick={() => setMetricKey("pageViews")}
              className={"px-3 py-1 rounded-lg text-xs font-semibold transition-colors " + (
                metricKey === "pageViews" ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-white"
              )}
            >
              Page Views
            </button>
            <button
              onClick={() => setMetricKey("apiRequests")}
              className={"px-3 py-1 rounded-lg text-xs font-semibold transition-colors " + (
                metricKey === "apiRequests" ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-white"
              )}
            >
              API Requests
            </button>
          </div>
        </div>

        {loading || !data ? (
          <div className="py-20 text-center text-gray-400 text-xs">Computing time-series aggregates...</div>
        ) : (
          <AnalyticsAreaChart data={data.timeSeries} metricKey={metricKey} accentColor="#6366F1" />
        )}
      </div>

      {/* Two-Column Routes & Feature Usage Grid */}
      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TopRoutesTable routes={data.topRoutes} />
          <FeatureUsageGrid features={data.featureUsage} />
        </div>
      )}
    </AppShell>
  );
}
`,

  "src/app/app/users/page.tsx": `"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { UserSessionRecord } from "@/types/telemetry";
import { getUserSessionRecords } from "@/lib/telemetry-store";
import { Users, Clock, Zap, ShieldCheck } from "lucide-react";

export default function UsersPage() {
  const [users, setUsers] = useState<UserSessionRecord[]>([]);

  useEffect(() => {
    setUsers(getUserSessionRecords());
  }, []);

  return (
    <AppShell>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">User Telemetry & Retention</h1>
          <p className="text-xs text-gray-400 mt-1">Distinct user identities, session logs, and retention cohorts</p>
        </div>
      </div>

      {/* Retention Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel-2 rounded-3xl p-5 border border-white/10">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">7-Day Retention</p>
          <p className="text-3xl font-black text-emerald-400">68.4%</p>
          <span className="text-[10px] text-gray-400 font-medium">Returning user baseline</span>
        </div>

        <div className="glass-panel-2 rounded-3xl p-5 border border-white/10">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Avg Sessions / User</p>
          <p className="text-3xl font-black text-indigo-300">14.2</p>
          <span className="text-[10px] text-gray-400 font-medium">Monthly session count</span>
        </div>

        <div className="glass-panel-2 rounded-3xl p-5 border border-white/10">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Active User Pool</p>
          <p className="text-3xl font-black text-cyan-300">4,688</p>
          <span className="text-[10px] text-gray-400 font-medium">Distinct authenticated IDs</span>
        </div>
      </div>

      {/* Active Users Table (Matching Prototype Screen 10) */}
      <div className="glass-panel-2 rounded-3xl p-6 border border-white/10">
        <h2 className="text-base font-bold text-white mb-1">Live Active User Session Stream</h2>
        <p className="text-xs text-gray-400 mb-6">Real-time user pulse records across all connected applications</p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                <th className="pb-3">User Identity</th>
                <th className="pb-3">Favorite App</th>
                <th className="pb-3 text-right">Total Sessions</th>
                <th className="pb-3 text-right">Last Active</th>
                <th className="pb-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {users.map((u) => (
                <tr key={u.distinctId} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-white font-bold text-xs">
                        {u.avatar}
                      </div>
                      <div>
                        <p className="font-bold text-white">{u.name}</p>
                        <p className="text-[10px] text-gray-400 font-mono">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="font-semibold text-indigo-300">{u.favoriteProject}</span>
                  </td>
                  <td className="py-3 text-right font-bold text-white">{u.totalSessions}</td>
                  <td className="py-3 text-right text-gray-400 font-mono">{u.lastActive}</td>
                  <td className="py-3 text-right">
                    <span
                      className={"text-[10px] font-bold px-2 py-0.5 rounded-full border " + (
                        u.status === "active"
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                          : u.status === "idle"
                          ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                          : "bg-gray-500/10 border-gray-500/30 text-gray-400"
                      )}
                    >
                      ? {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
`
};

for (const [filePath, content] of Object.entries(files)) {
  ensureDir(filePath);
  fs.writeFileSync(filePath, content.trim(), 'utf8');
  console.log(`Generated: ${filePath}`);
}

console.log('Phase 4 Telemetry and Analytics build complete!');
