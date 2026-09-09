"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { AttentionRequired } from "@/components/dashboard/AttentionRequired";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { AiSummaryBar } from "@/components/dashboard/AiSummaryBar";
import { Project, AttentionItem, ActivityItem } from "@/types/project";
import { Activity, Users, Layers, AlertTriangle, Clock } from "lucide-react";

export default function DashboardPage() {
  const [data, setData] = useState<{
    metrics: {
      totalProjects: number;
      totalActiveUsers: number;
      averageUptime: string;
      averageLatencyMs: number;
      openIncidentsCount: number;
    };
    projects: Project[];
    attentionItems: AttentionItem[];
    activities: ActivityItem[];
  } | null>(null);

  const [loading, setLoading] = useState(true);

  async function fetchOverview() {
    try {
      const res = await fetch("/api/v1/dashboard/overview");
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch("/api/v1/projects/" + id, { method: "DELETE" });
      if (res.ok) fetchOverview();
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchOverview();
  }, []);

  return (
    <AppShell>
      {/* Greeting Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            Good evening, Girum.
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Command Center � Monitored developer applications ecosystem
          </p>
        </div>
      </div>

      {/* Top Metric Strip (Matching Prototype Screen 3) */}
      {data && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <div className="glass-panel-2 rounded-3xl p-5 border border-white/10">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Projects</p>
            <p className="text-3xl font-black text-white">{data.metrics.totalProjects}</p>
            <span className="text-[10px] text-indigo-400 font-medium">All isolated</span>
          </div>

          <div className="glass-panel-2 rounded-3xl p-5 border border-white/10">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Active Users</p>
            <p className="text-3xl font-black text-white">{data.metrics.totalActiveUsers.toLocaleString()}</p>
            <span className="text-[10px] text-cyan-400 font-medium">Live session nodes</span>
          </div>

          <div className="glass-panel-2 rounded-3xl p-5 border border-white/10">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Uptime</p>
            <p className="text-3xl font-black text-emerald-400">{data.metrics.averageUptime}%</p>
            <span className="text-[10px] text-gray-400 font-medium">30-day baseline</span>
          </div>

          <div className="glass-panel-2 rounded-3xl p-5 border border-white/10">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Open Incidents</p>
            <p className="text-3xl font-black text-amber-400">{data.metrics.openIncidentsCount}</p>
            <span className="text-[10px] text-amber-300 font-medium">1 degraded route</span>
          </div>

          <div className="glass-panel-2 rounded-3xl p-5 border border-white/10">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Avg Latency</p>
            <p className="text-3xl font-black text-indigo-300">{data.metrics.averageLatencyMs}ms</p>
            <span className="text-[10px] text-gray-400 font-medium">Global HTTP ping</span>
          </div>
        </div>
      )}

      {/* AI Summary Banner */}
      <AiSummaryBar />

      {/* Project Health Cards Matrix */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white tracking-tight">Project Health Overview</h2>
        <span className="text-xs text-gray-400 font-medium">{data?.projects.length || 0} Active Projects</span>
      </div>

      {loading ? (
        <div className="py-20 text-center glass-panel-1 rounded-3xl text-gray-400 text-xs mb-10">
          Loading command center telemetry...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {data?.projects.map((project) => (
            <ProjectCard key={project.id} project={project} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {/* Attention Required & Activity Feed Two-Column Grid */}
      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AttentionRequired items={data.attentionItems} />
          <RecentActivity activities={data.activities} />
        </div>
      )}
    </AppShell>
  );
}