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
| **3** | **Projects + main dashboard** | **COMPLETED** |
| **4** | Telemetry + analytics | UP NEXT |
| **5** | Health monitoring + incidents | UPCOMING |
| **6** | Error tracking + deployments | UPCOMING |
| **7** | SDK + integrations | UPCOMING |
| **8** | Tasks + releases + ideas | UPCOMING |
| **9** | AI Copilot + AI insights | UPCOMING |
| **10** | Security, performance, polish + production | UPCOMING |
`,

  "src/types/project.ts": `export type ProjectEnvironment = "production" | "staging" | "development";
export type ProjectStatus = "operational" | "degraded" | "warning" | "down" | "unknown";

export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  websiteUrl: string;
  repositoryUrl: string;
  environment: ProjectEnvironment;
  status: ProjectStatus;
  healthScore: number;
  uptimePercentage: number;
  latencyMs: number;
  activeUsers: number;
  errorRate: number;
  accentColor: string;
  icon: string;
  techStack: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectInput {
  name: string;
  description: string;
  websiteUrl: string;
  repositoryUrl: string;
  environment: ProjectEnvironment;
  accentColor: string;
  techStack: string[];
}

export type AttentionSeverity = "CRITICAL" | "IMPORTANT" | "RECOMMENDED" | "OPPORTUNITY";

export interface AttentionItem {
  id: string;
  projectId: string;
  projectName: string;
  severity: AttentionSeverity;
  title: string;
  description: string;
  timestamp: string;
  metric?: string;
}

export interface ActivityItem {
  id: string;
  projectId: string;
  projectName: string;
  accentColor: string;
  type: "deployment" | "error" | "incident" | "health_check" | "feature";
  title: string;
  detail: string;
  timestamp: string;
}
`,

  "src/lib/projects-store.ts": `import { Project, CreateProjectInput, AttentionItem, ActivityItem } from "@/types/project";

let projectsStore: Project[] = [
  {
    id: "proj_aca_1",
    name: "ACA Academy",
    slug: "aca-academy",
    description: "Educational learning platform and student management system.",
    websiteUrl: "https://aca.academy",
    repositoryUrl: "https://github.com/girum-endalkachew/aca-academy",
    environment: "production",
    status: "operational",
    healthScore: 98,
    uptimePercentage: 99.98,
    latencyMs: 32,
    activeUsers: 1284,
    errorRate: 0.01,
    accentColor: "#3B82F6",
    icon: "GraduationCap",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"],
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "proj_sift_2",
    name: "Sift",
    slug: "sift",
    description: "AI-powered document intelligence and content filtering platform.",
    websiteUrl: "https://sift.dev",
    repositoryUrl: "https://github.com/girum-endalkachew/sift",
    environment: "production",
    status: "degraded",
    healthScore: 84,
    uptimePercentage: 98.42,
    latencyMs: 184,
    activeUsers: 842,
    errorRate: 1.42,
    accentColor: "#EC4899",
    icon: "Filter",
    techStack: ["Python", "FastAPI", "React", "Redis"],
    createdAt: new Date(Date.now() - 45 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "proj_examguard_3",
    name: "ExamGuard",
    slug: "examguard",
    description: "Proctoring and exam integrity monitoring service.",
    websiteUrl: "https://examguard.io",
    repositoryUrl: "https://github.com/girum-endalkachew/examguard",
    environment: "production",
    status: "warning",
    healthScore: 76,
    uptimePercentage: 97.10,
    latencyMs: 340,
    activeUsers: 412,
    errorRate: 2.15,
    accentColor: "#8B5CF6",
    icon: "ShieldCheck",
    techStack: ["Node.js", "WebRTC", "PostgreSQL", "Docker"],
    createdAt: new Date(Date.now() - 60 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "proj_focusos_4",
    name: "Focus OS",
    slug: "focus-os",
    description: "Personal productivity and deep-work operational engine.",
    websiteUrl: "https://focusos.app",
    repositoryUrl: "https://github.com/girum-endalkachew/focus-os",
    environment: "production",
    status: "operational",
    healthScore: 100,
    uptimePercentage: 100.0,
    latencyMs: 18,
    activeUsers: 2150,
    errorRate: 0.00,
    accentColor: "#06B6D4",
    icon: "Zap",
    techStack: ["Tauri", "Rust", "React", "SQLite"],
    createdAt: new Date(Date.now() - 90 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const attentionItemsStore: AttentionItem[] = [
  {
    id: "att_1",
    projectId: "proj_examguard_3",
    projectName: "ExamGuard",
    severity: "CRITICAL",
    title: "WebRTC Proctoring Relay High Latency",
    description: "API latency is 340ms (34% above the 120ms baseline). Impacting live exam streams.",
    timestamp: "12 mins ago",
    metric: "340ms latency",
  },
  {
    id: "att_2",
    projectId: "proj_sift_2",
    projectName: "Sift",
    severity: "IMPORTANT",
    title: "Document Parser Exception Spikes",
    description: "TypeError: Cannot read property 'metadata' of undefined occurred 142 times in 2 hours.",
    timestamp: "45 mins ago",
    metric: "+18% error rate",
  },
  {
    id: "att_3",
    projectId: "proj_aca_1",
    projectName: "ACA Academy",
    severity: "RECOMMENDED",
    title: "Stale Production Deployment",
    description: "No production deployment detected in 8 days. 4 commits pending on main branch.",
    timestamp: "2 hours ago",
    metric: "8d since build",
  },
  {
    id: "att_4",
    projectId: "proj_focusos_4",
    projectName: "Focus OS",
    severity: "OPPORTUNITY",
    title: "Active Session Growth Acceleration",
    description: "Daily active users increased by 42% following v2.4 desktop release.",
    timestamp: "5 hours ago",
    metric: "2,150 active",
  },
];

const activityStore: ActivityItem[] = [
  {
    id: "act_1",
    projectId: "proj_focusos_4",
    projectName: "Focus OS",
    accentColor: "#06B6D4",
    type: "deployment",
    title: "Deployed v2.4.1 Production Build",
    detail: "Commit #8a1f4e — Upgraded Rust desktop sync engine & sqlite connection pool.",
    timestamp: "10 mins ago",
  },
  {
    id: "act_2",
    projectId: "proj_sift_2",
    projectName: "Sift",
    accentColor: "#EC4899",
    type: "error",
    title: "New High-Frequency Exception",
    detail: "FastAPI endpoint /api/v1/extract returned HTTP 500 on large PDF buffers.",
    timestamp: "32 mins ago",
  },
  {
    id: "act_3",
    projectId: "proj_examguard_3",
    projectName: "ExamGuard",
    accentColor: "#8B5CF6",
    type: "incident",
    title: "Incident Opened: High Stream Latency",
    detail: "Automated alert triggered. Investigating US-East WebRTC relay node overhead.",
    timestamp: "1 hour ago",
  },
  {
    id: "act_4",
    projectId: "proj_aca_1",
    projectName: "ACA Academy",
    accentColor: "#3B82F6",
    type: "health_check",
    title: "SSL Certificate Auto-Verified",
    detail: "256-bit TLS certificate valid for 88 days. HTTP GET /api/health 200 OK (32ms).",
    timestamp: "3 hours ago",
  },
];

export function getProjects(): Project[] {
  return projectsStore;
}

export function getProjectById(id: string): Project | undefined {
  return projectsStore.find((p) => p.id === id || p.slug === id);
}

export function getAttentionItems(): AttentionItem[] {
  return attentionItemsStore;
}

export function getActivityFeed(): ActivityItem[] {
  return activityStore;
}

export function createProject(input: CreateProjectInput): Project {
  const slug = input.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const newProject: Project = {
    id: "proj_" + Date.now(),
    name: input.name,
    slug,
    description: input.description,
    websiteUrl: input.websiteUrl,
    repositoryUrl: input.repositoryUrl,
    environment: input.environment,
    status: "operational",
    healthScore: 100,
    uptimePercentage: 100.0,
    latencyMs: 24,
    activeUsers: 1,
    errorRate: 0.0,
    accentColor: input.accentColor || "#6366F1",
    icon: "Layers",
    techStack: input.techStack.length ? input.techStack : ["Next.js", "TypeScript"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  projectsStore = [newProject, ...projectsStore];
  return newProject;
}

export function updateProject(id: string, updates: Partial<Project>): Project | null {
  const index = projectsStore.findIndex((p) => p.id === id);
  if (index === -1) return null;

  projectsStore[index] = {
    ...projectsStore[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  return projectsStore[index];
}

export function deleteProject(id: string): boolean {
  const initialLength = projectsStore.length;
  projectsStore = projectsStore.filter((p) => p.id !== id);
  return projectsStore.length < initialLength;
}
`,

  "src/app/api/v1/dashboard/overview/route.ts": `import { NextResponse } from "next/server";
import { getProjects, getAttentionItems, getActivityFeed } from "@/lib/projects-store";

export async function GET() {
  const projects = getProjects();
  const attentionItems = getAttentionItems();
  const activities = getActivityFeed();

  const totalUsers = projects.reduce((acc, p) => acc + p.activeUsers, 0);
  const avgUptime = projects.length
    ? (projects.reduce((acc, p) => acc + p.uptimePercentage, 0) / projects.length).toFixed(2)
    : "100.00";
  const avgLatency = projects.length
    ? Math.round(projects.reduce((acc, p) => acc + p.latencyMs, 0) / projects.length)
    : 0;

  return NextResponse.json({
    success: true,
    data: {
      metrics: {
        totalProjects: projects.length,
        totalActiveUsers: totalUsers,
        averageUptime: avgUptime,
        averageLatencyMs: avgLatency,
        openIncidentsCount: attentionItems.filter((a) => a.severity === "CRITICAL").length,
      },
      projects,
      attentionItems,
      activities,
    },
  });
}
`,

  "src/components/dashboard/AttentionRequired.tsx": `"use client";

import { AttentionItem } from "@/types/project";
import { AlertTriangle, AlertCircle, CheckCircle2, TrendingUp, ShieldAlert } from "lucide-react";
import Link from "next/link";

interface AttentionProps {
  items: AttentionItem[];
}

export function AttentionRequired({ items }: AttentionProps) {
  const severityStyles = {
    CRITICAL: {
      badge: "bg-rose-500/20 text-rose-400 border-rose-500/30",
      border: "border-l-rose-500",
      icon: ShieldAlert,
      iconColor: "text-rose-400",
    },
    IMPORTANT: {
      badge: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      border: "border-l-amber-500",
      icon: AlertTriangle,
      iconColor: "text-amber-400",
    },
    RECOMMENDED: {
      badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
      border: "border-l-indigo-500",
      icon: AlertCircle,
      iconColor: "text-indigo-400",
    },
    OPPORTUNITY: {
      badge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      border: "border-l-emerald-500",
      icon: TrendingUp,
      iconColor: "text-emerald-400",
    },
  };

  return (
    <div className="glass-panel-2 rounded-3xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Attention Required</h3>
            <p className="text-xs text-gray-400">Prioritized algorithmic issue queue across all applications</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
          {items.length} Items Pending
        </span>
      </div>

      <div className="space-y-3">
        {items.map((item) => {
          const config = severityStyles[item.severity];
          const Icon = config.icon;
          return (
            <div
              key={item.id}
              className={"glass-panel-1 rounded-2xl p-4 border border-white/5 border-l-4 transition-all hover:bg-white/[0.04] " + config.border}
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <Icon className={"w-4 h-4 " + config.iconColor} />
                  <span className="text-xs font-bold text-white">{item.projectName}</span>
                  <span className="text-[10px] text-gray-500">• {item.timestamp}</span>
                </div>
                <span className={"text-[9px] font-bold px-2 py-0.5 rounded-full border tracking-wide " + config.badge}>
                  {item.severity}
                </span>
              </div>
              <h4 className="text-xs font-bold text-gray-200 mb-1">{item.title}</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed mb-3">{item.description}</p>
              
              {item.metric && (
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-[10px] font-mono text-gray-400">Metric: <span className="text-white font-semibold">{item.metric}</span></span>
                  <Link href={"/app/projects/" + item.projectId} className="text-[10px] font-bold text-indigo-400 hover:underline">
                    Inspect Issue ?
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
`,

  "src/components/dashboard/RecentActivity.tsx": `"use client";

import { ActivityItem } from "@/types/project";
import { Terminal, GitCommit, AlertTriangle, ShieldCheck, Zap } from "lucide-react";

interface ActivityProps {
  activities: ActivityItem[];
}

export function RecentActivity({ activities }: ActivityProps) {
  const iconMap = {
    deployment: GitCommit,
    error: AlertTriangle,
    incident: ShieldCheck,
    health_check: Zap,
    feature: Terminal,
  };

  return (
    <div className="glass-panel-2 rounded-3xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-white">Recent System Activity</h3>
          <p className="text-xs text-gray-400">Live telemetry stream across production nodes</p>
        </div>
        <span className="text-xs text-indigo-400 font-semibold cursor-pointer hover:underline">View All ?</span>
      </div>

      <div className="space-y-4 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
        {activities.map((act) => {
          const Icon = iconMap[act.type] || Terminal;
          return (
            <div key={act.id} className="flex items-start gap-4 relative pl-8">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white absolute left-0 top-0 border border-white/10 shadow-md"
                style={{ backgroundColor: act.accentColor + "30" }}
              >
                <Icon className="w-4 h-4" style={{ color: act.accentColor }} />
              </div>

              <div className="glass-panel-1 rounded-2xl p-3.5 flex-1 border border-white/5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white">{act.projectName}</span>
                  <span className="text-[10px] text-gray-500 font-mono">{act.timestamp}</span>
                </div>
                <h4 className="text-xs font-semibold text-gray-200 mb-1">{act.title}</h4>
                <p className="text-[11px] text-gray-400 leading-relaxed">{act.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
`,

  "src/components/dashboard/AiSummaryBar.tsx": `"use client";

import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export function AiSummaryBar() {
  return (
    <div className="glass-panel-2 rounded-3xl p-5 border border-indigo-500/30 bg-gradient-to-r from-indigo-900/20 via-purple-900/10 to-transparent flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 shadow-[0_0_30px_rgba(99,102,241,0.1)]">
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-2xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-indigo-300 shrink-0 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
          <Sparkles className="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-white">PROJECTPULSE AI SUMMARY</span>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Data Grounded
            </span>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed max-w-3xl">
            Overall ecosystem health is <span className="text-emerald-400 font-bold">98.2%</span>. <span className="text-white font-semibold">ExamGuard</span> API latency requires attention (340ms). <span className="text-cyan-300 font-semibold">Focus OS</span> daily active users surged +42% post-release.
          </p>
        </div>
      </div>

      <Link
        href="/app/dashboard#copilot"
        className="self-start md:self-center shrink-0 flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-white/10 transition-all"
      >
        Ask AI Copilot <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
`,

  "src/app/app/dashboard/page.tsx": `"use client";

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
            Command Center • Monitored developer applications ecosystem
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
`,

  "src/app/app/projects/page.tsx": `"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Project } from "@/types/project";
import { Search, Filter, Layers, Plus } from "lucide-react";

export default function ProjectsManagementPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  async function fetchProjects() {
    try {
      const res = await fetch("/api/v1/projects");
      const json = await res.json();
      if (json.success) setProjects(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  const filtered = projects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AppShell>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Project Management</h1>
          <p className="text-xs text-gray-400 mt-1">Manage and inspect all registered applications</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-panel-2 rounded-2xl p-4 border border-white/10 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full glass-input pl-10 pr-4 py-2 rounded-xl text-xs"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="glass-input px-3.5 py-2 rounded-xl text-xs bg-[#0B0C10]"
          >
            <option value="all">All Statuses</option>
            <option value="operational">Operational</option>
            <option value="degraded">Degraded</option>
            <option value="warning">Warning</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-20 text-center glass-panel-1 rounded-3xl text-gray-400 text-xs">
          Loading projects matrix...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </AppShell>
  );
}
`,

  "src/app/app/projects/[id]/page.tsx": `"use client";

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
          Telemetry & Operational Details — {activeTab}
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
`
};

for (const [filePath, content] of Object.entries(files)) {
  ensureDir(filePath);
  fs.writeFileSync(filePath, content.trim(), 'utf8');
  console.log(`Generated: ${filePath}`);
}

console.log('Phase 3 Main Command Center & Project Detail build complete!');
