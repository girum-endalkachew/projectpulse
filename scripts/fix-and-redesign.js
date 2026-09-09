const fs = require('fs');
const path = require('path');

function ensureDir(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

const files = {
  // 1. FIX THE BUILD ERROR (Add missing imports)
  "src/lib/telemetry-store.ts": `import { TelemetryEvent, AnalyticsSummary, TimeframeOption, UserSessionRecord, TimeSeriesPoint, RouteAnalytics, FeatureUsage } from "@/types/telemetry";

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
`,

  // 2. CINEMATIC GLOBAL CSS
  "src/app/globals.css": `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-[#030303] text-[#F3F4F6] overflow-x-hidden;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background-image: 
      radial-gradient(circle at 15% 30%, rgba(68, 53, 62, 0.15), transparent 40%),
      radial-gradient(circle at 85% 70%, rgba(45, 55, 72, 0.15), transparent 40%);
    background-attachment: fixed;
  }
}

@layer components {
  .glass-base {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%);
    backdrop-filter: blur(40px);
    -webkit-backdrop-filter: blur(40px);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    border-left: 1px solid rgba(255, 255, 255, 0.06);
    border-right: 1px solid rgba(255, 255, 255, 0.02);
    border-bottom: 1px solid rgba(255, 255, 255, 0.01);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }
  
  .glass-subtle {
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.04);
  }

  .editorial-heading {
    @apply text-5xl md:text-7xl font-thin tracking-tighter leading-none text-white/95;
  }

  .editorial-label {
    @apply text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-gray-500 font-medium;
  }
}

::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
`,

  // 3. EDITORIAL GLASS CARD
  "src/components/ui/GlassCard.tsx": `import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  level?: 1 | 2 | 3;
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ level = 2, children, className = "", ...props }: GlassCardProps) {
  const styles = {
    1: "glass-subtle rounded-2xl",
    2: "glass-base rounded-[2rem]",
    3: "glass-base rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.6)]",
  };
  return (
    <div className={styles[level] + " relative overflow-hidden " + className} {...props}>
      {children}
    </div>
  );
}
`,

  // 4. AMBIENT APP SHELL
  "src/components/layout/AppShell.tsx": `"use client";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#030303] text-gray-100 flex relative selection:bg-white/20 selection:text-white">
      {/* Cinematic Studio Lighting */}
      <div className="fixed top-[-20%] left-[-10%] w-[60vw] h-[60vh] bg-rose-900/10 rounded-full blur-[180px] pointer-events-none mix-blend-screen"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[60vw] h-[60vh] bg-slate-800/20 rounded-full blur-[180px] pointer-events-none mix-blend-screen"></div>

      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 z-10">
        <Topbar />
        <main className="ml-64 p-10 flex-1 lg:px-16 lg:py-12">{children}</main>
      </div>
    </div>
  );
}
`,

  // 5. ASYMMETRIC, LAYERED COMMAND CENTER (THE NEW DASHBOARD)
  "src/app/app/dashboard/page.tsx": `"use client";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { Sparkline } from "@/components/ui/Sparkline";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => { setTimeout(() => setLoading(false), 500); }, []);

  return (
    <AppShell>
      {/* Editorial Header */}
      <header className="mb-12">
        <p className="editorial-label mb-4">PROJECTPULSE / COMMAND CENTER</p>
        <h1 className="editorial-heading mb-4">Good evening. <br/><span className="text-white/40">Everything is under control.</span></h1>
      </header>

      {/* Asymmetric Master Composition Grid */}
      <div className="grid grid-cols-12 gap-8 mb-12">
        
        {/* Large Hero Health Panel (Span 8) */}
        <div className="col-span-12 xl:col-span-8 relative">
          <GlassCard level={3} className="h-full p-10 flex flex-col justify-between min-h-[400px]">
            {/* Background integration */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-transparent via-transparent to-emerald-900/10 pointer-events-none"></div>
            
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <p className="editorial-label mb-2 text-emerald-400/80">ECOSYSTEM HEALTH</p>
                <div className="text-8xl font-thin tracking-tighter text-white">99.98<span className="text-4xl text-white/40">%</span></div>
              </div>
              <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)] animate-pulse"></div>
            </div>

            <div className="relative z-10 grid grid-cols-3 gap-6 pt-12 border-t border-white/5 mt-auto">
              <div>
                <p className="editorial-label mb-1">ACTIVE USERS</p>
                <p className="text-3xl font-light">4,688</p>
              </div>
              <div>
                <p className="editorial-label mb-1">GLOBAL LATENCY</p>
                <p className="text-3xl font-light">32<span className="text-xl text-white/40">ms</span></p>
              </div>
              <div>
                <p className="editorial-label mb-1">OPEN INCIDENTS</p>
                <p className="text-3xl font-light">1</p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Cinematic Attention Stack (Span 4) */}
        <div className="col-span-12 xl:col-span-4 flex flex-col">
          <p className="editorial-label mb-4 pl-2">NEEDS YOUR ATTENTION</p>
          <div className="flex-1 relative space-y-4">
            {/* Layered Glass Notifications */}
            <GlassCard level={2} className="p-6 border-l-4 border-l-amber-500/50 hover:translate-x-2 transition-transform">
              <p className="text-[10px] font-bold text-amber-500/80 uppercase tracking-wider mb-2">ExamGuard</p>
              <h3 className="text-lg font-light text-white mb-1">Latency increased 34%</h3>
              <p className="text-xs text-white/40">API relay nodes are exceeding 340ms baseline.</p>
            </GlassCard>

            <GlassCard level={2} className="p-6 border-l-4 border-l-rose-500/50 hover:translate-x-2 transition-transform">
              <p className="text-[10px] font-bold text-rose-500/80 uppercase tracking-wider mb-2">Sift Platform</p>
              <h3 className="text-lg font-light text-white mb-1">Error rate rising</h3>
              <p className="text-xs text-white/40">TypeError occurrences up 18% in last hour.</p>
            </GlassCard>
            
            <GlassCard level={2} className="p-6 border-l-4 border-l-emerald-500/50 hover:translate-x-2 transition-transform">
              <p className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-wider mb-2">Focus OS</p>
              <h3 className="text-lg font-light text-white mb-1">Traffic surged 42%</h3>
              <p className="text-xs text-white/40">Opportunity: High engagement post-release.</p>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* Integrated Projects Strip */}
      <div className="mb-12">
        <p className="editorial-label mb-6">INTEGRATED PROJECTS</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <GlassCard level={1} className="p-6 flex flex-col gap-6 group hover:bg-white/[0.04] transition-colors">
            <div className="flex justify-between items-start">
              <p className="text-sm font-semibold text-white/90">ACA Academy</p>
              <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"></div>
            </div>
            <Sparkline data={[20,25,22,30,45,40,60]} color="#3B82F6" width={100} height={30} />
          </GlassCard>
          
          <GlassCard level={1} className="p-6 flex flex-col gap-6 group hover:bg-white/[0.04] transition-colors">
            <div className="flex justify-between items-start">
              <p className="text-sm font-semibold text-white/90">Sift</p>
              <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.6)] animate-pulse"></div>
            </div>
            <Sparkline data={[60,50,40,45,20,25,10]} color="#F43F5E" width={100} height={30} />
          </GlassCard>
          
          <GlassCard level={1} className="p-6 flex flex-col gap-6 group hover:bg-white/[0.04] transition-colors">
            <div className="flex justify-between items-start">
              <p className="text-sm font-semibold text-white/90">ExamGuard</p>
              <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.6)]"></div>
            </div>
            <Sparkline data={[30,35,32,38,35,42,40]} color="#F59E0B" width={100} height={30} />
          </GlassCard>
          
          <GlassCard level={1} className="p-6 flex flex-col gap-6 group hover:bg-white/[0.04] transition-colors">
            <div className="flex justify-between items-start">
              <p className="text-sm font-semibold text-white/90">Focus OS</p>
              <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.6)]"></div>
            </div>
            <Sparkline data={[10,20,35,40,60,80,95]} color="#06B6D4" width={100} height={30} />
          </GlassCard>
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

console.log('Cinematic Design Overhaul & Build Fix complete!');
