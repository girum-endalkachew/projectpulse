"use client";

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