"use client";

import { use, useEffect, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Project } from "@/types/project";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { MetricCard } from "@/components/ui/MetricCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { Globe, GitBranch, Terminal, Shield, Activity, AlertTriangle, Layers, Settings, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch("/api/v1/projects/" + id);
        const json = await res.json();
        if (json.success) setProject(json.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <AppShell>
        <div className="py-20 text-center glass-panel-1 rounded-3xl text-gray-400 text-xs">
          Loading project telemetry...
        </div>
      </AppShell>
    );
  }

  if (!project) {
    return (
      <AppShell>
        <div className="py-20 text-center glass-panel-1 rounded-3xl text-gray-400 text-xs">
          Project not found. <Link href="/app/dashboard" className="text-indigo-400 underline">Return to Dashboard</Link>
        </div>
      </AppShell>
    );
  }

  const tabs = ["overview", "analytics", "health", "errors", "incidents", "deployments", "settings"];

  return (
    <AppShell>
      {/* Back Link */}
      <Link href="/app/dashboard" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white mb-6 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
      </Link>

      {/* Project Detail Header (Matching Prototype Screen 4) */}
      <div className="glass-panel-2 rounded-3xl p-6 border border-white/10 mb-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-extrabold text-2xl shadow-xl border border-white/20"
              style={{ backgroundColor: project.accentColor + "30", borderColor: project.accentColor + "60" }}
            >
              <span style={{ color: project.accentColor }}>{project.name.charAt(0)}</span>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-black text-white">{project.name}</h1>
                <StatusIndicator status={project.status} />
              </div>
              <p className="text-xs text-gray-300 max-w-xl">{project.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
            {project.websiteUrl && (
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 glass-panel-1 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:text-white transition-colors border border-white/10"
              >
                <Globe className="w-3.5 h-3.5 text-indigo-400" /> Website
              </a>
            )}
            {project.repositoryUrl && (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 glass-panel-1 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:text-white transition-colors border border-white/10"
              >
                <GitBranch className="w-3.5 h-3.5 text-purple-400" /> GitHub
              </a>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-8 pt-4 border-t border-white/10 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={"px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all " + (
                activeTab === tab
                  ? "bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)] border border-indigo-400/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          label="Health Score"
          value={project.healthScore + "/100"}
          subValue="Calculated from uptime & error rate"
          accentColor={project.accentColor}
        />
        <MetricCard
          label="Uptime Baseline"
          value={project.uptimePercentage + "%"}
          subValue="Last 30-day monitor checks"
          accentColor="#10B981"
        />
        <MetricCard
          label="Response Latency"
          value={project.latencyMs + "ms"}
          subValue="HTTP GET ping duration"
          accentColor="#3B82F6"
        />
        <MetricCard
          label="Active Users"
          value={project.activeUsers.toLocaleString()}
          subValue="Telemetry session distinct IDs"
          accentColor="#06B6D4"
        />
      </div>

      {/* Tab Contents */}
      <GlassCard level={2}>
        <h3 className="text-base font-bold text-white mb-2 uppercase tracking-wider text-xs">
          Telemetry & Operational Details � {activeTab}
        </h3>
        <p className="text-xs text-gray-400 leading-relaxed mb-6">
          ProjectPulse is collecting isolated telemetry streams for <span className="text-white font-semibold">{project.name}</span>. All events, error stack traces, and uptime monitor logs are scoped to <span className="font-mono text-indigo-300">project_id: {project.id}</span>.
        </p>

        <div className="glass-panel-1 p-6 rounded-2xl border border-white/5 space-y-3 font-mono text-xs">
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-gray-400">Environment</span>
            <span className="text-white font-bold">{project.environment}</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-gray-400">Tech Stack</span>
            <span className="text-indigo-300">{project.techStack.join(", ")}</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-gray-400">Created At</span>
            <span className="text-gray-300">{new Date(project.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Telemetry API Key</span>
            <span className="text-emerald-400">pk_live_{project.id.replace('proj_', '')}_sec</span>
          </div>
        </div>
      </GlassCard>
    </AppShell>
  );
}