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
| **2** | **Landing page + authentication** | **COMPLETED** |
| **3** | Projects + main dashboard | UP NEXT |
| **4** | Telemetry + analytics | UPCOMING |
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
`,

  "src/lib/auth.ts": `export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: string;
}

export function getCurrentUser(): UserSession | null {
  if (typeof window === "undefined") return null;
  const session = localStorage.getItem("pulse_session");
  if (!session) return null;
  try {
    return JSON.parse(session);
  } catch {
    return null;
  }
}

export function loginUser(email: string): UserSession {
  const user: UserSession = {
    id: "usr_admin_1",
    name: "Girum Endalkachew",
    email: email || "admin@projectpulse.dev",
    role: "Lead Engineer",
  };
  if (typeof window !== "undefined") {
    localStorage.setItem("pulse_session", JSON.stringify(user));
  }
  return user;
}

export function logoutUser(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("pulse_session");
  }
}
`,

  "src/lib/projects-store.ts": `import { Project, CreateProjectInput } from "@/types/project";

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
    accentColor: "#06B6D4",
    icon: "Zap",
    techStack: ["Tauri", "Rust", "React", "SQLite"],
    createdAt: new Date(Date.now() - 90 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function getProjects(): Project[] {
  return projectsStore;
}

export function getProjectById(id: string): Project | undefined {
  return projectsStore.find((p) => p.id === id || p.slug === id);
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

  "src/components/layout/Sidebar.tsx": `"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, Activity, ShieldAlert, AlertTriangle, Terminal, Settings, Sparkles } from "lucide-react";

const navigation = [
  { name: "Command Center", href: "/app/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/app/projects", icon: FolderKanban },
  { name: "Design System", href: "/app/design-system", icon: Sparkles },
  { name: "Health & Uptime", href: "/app/dashboard#health", icon: Activity },
  { name: "Errors", href: "/app/dashboard#errors", icon: AlertTriangle },
  { name: "Incidents", href: "/app/dashboard#incidents", icon: ShieldAlert },
  { name: "Settings", href: "/app/dashboard#settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 glass-panel-2 border-r border-white/10 flex flex-col justify-between p-5 min-h-screen fixed left-0 top-0 z-30">
      <div>
        <div className="flex items-center gap-3 px-2 py-3 mb-8">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            <Terminal className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h1 className="font-bold tracking-tight text-white text-lg">PROJECTPULSE</h1>
            <p className="text-[10px] text-gray-400 tracking-wider uppercase">Command Center</p>
          </div>
        </div>

        <nav className="space-y-1.5">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={"flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 " + (
                  isActive
                    ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.15)]"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                )}
              >
                <Icon className={"w-4 h-4 " + (isActive ? "text-indigo-400" : "text-gray-400")} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="glass-panel-1 rounded-2xl p-3.5 border border-white/5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-gray-300">Platform Status</span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </div>
        <p className="text-[11px] text-gray-400">All systems operational</p>
      </div>
    </aside>
  );
}
`,

  "src/components/layout/Topbar.tsx": `"use client";

import { Bell, Search, Plus } from "lucide-react";

interface TopbarProps {
  onOpenCreateModal?: () => void;
}

export function Topbar({ onOpenCreateModal }: TopbarProps) {
  return (
    <header className="h-16 glass-panel-1 border-b border-white/10 sticky top-0 z-20 flex items-center justify-between px-8 ml-64">
      <div className="relative w-80">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search projects, telemetry, errors... (Ctrl+K)"
          className="w-full glass-input pl-10 pr-4 py-1.5 rounded-xl text-xs placeholder:text-gray-500"
        />
      </div>

      <div className="flex items-center gap-4">
        {onOpenCreateModal && (
          <button
            onClick={onOpenCreateModal}
            className="flex items-center gap-2 bg-indigo-600/80 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-[0_0_20px_rgba(99,102,241,0.25)] border border-indigo-400/30"
          >
            <Plus className="w-3.5 h-3.5" />
            New Project
          </button>
        )}

        <button className="p-2 rounded-xl glass-panel-1 hover:bg-white/[0.08] text-gray-400 hover:text-white transition-all relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500"></span>
        </button>

        <div className="flex items-center gap-3 pl-3 border-l border-white/10">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-lg">
            GE
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-semibold text-white">Girum Endalkachew</p>
            <p className="text-[10px] text-gray-400">girum-endalkachew</p>
          </div>
        </div>
      </div>
    </header>
  );
}
`,

  "src/components/layout/AppShell.tsx": `"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { CreateProjectModal } from "@/components/projects/CreateProjectModal";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B0C10] text-gray-100 flex relative selection:bg-indigo-500 selection:text-white">
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onOpenCreateModal={() => setIsModalOpen(true)} />
        <main className="ml-64 p-8 flex-1">{children}</main>
      </div>

      <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
`,

  "src/components/ui/GlassCard.tsx": `import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  level?: 1 | 2 | 3 | 4;
  hoverGlow?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({
  level = 2,
  hoverGlow = true,
  children,
  className = "",
  ...props
}: GlassCardProps) {
  const levelStyles = {
    1: "glass-panel-1",
    2: "glass-panel-2",
    3: "glass-panel-3",
    4: "bg-black/80 backdrop-blur-3xl border border-white/20 shadow-2xl",
  };

  const glowStyle = hoverGlow
    ? "transition-all duration-300 hover:border-indigo-500/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]"
    : "";

  return (
    <div
      className={levelStyles[level] + " " + glowStyle + " rounded-3xl p-6 relative overflow-hidden " + className}
      {...props}
    >
      {children}
    </div>
  );
}
`,

  "src/components/ui/StatusIndicator.tsx": `import React from "react";

export type StatusType = "operational" | "degraded" | "warning" | "down" | "unknown";

interface StatusIndicatorProps {
  status: StatusType;
  showLabel?: boolean;
  size?: "sm" | "md";
}

export function StatusIndicator({ status, showLabel = true, size = "md" }: StatusIndicatorProps) {
  const config = {
    operational: {
      color: "bg-emerald-500",
      border: "border-emerald-500/30",
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      label: "Operational",
    },
    degraded: {
      color: "bg-amber-500",
      border: "border-amber-500/30",
      bg: "bg-amber-500/10",
      text: "text-amber-400",
      label: "Degraded",
    },
    warning: {
      color: "bg-orange-500",
      border: "border-orange-500/30",
      bg: "bg-orange-500/10",
      text: "text-orange-400",
      label: "Warning",
    },
    down: {
      color: "bg-rose-500",
      border: "border-rose-500/30",
      bg: "bg-rose-500/10",
      text: "text-rose-400",
      label: "Down",
    },
    unknown: {
      color: "bg-gray-500",
      border: "border-gray-500/30",
      bg: "bg-gray-500/10",
      text: "text-gray-400",
      label: "Unknown",
    },
  };

  const curr = config[status] || config.unknown;
  const dotSize = size === "sm" ? "w-1.5 h-1.5" : "w-2 h-2";

  return (
    <div className={"inline-flex items-center gap-2 px-2.5 py-1 rounded-full border " + curr.bg + " " + curr.border}>
      <span className="relative flex h-2 w-2">
        <span className={"animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 " + curr.color}></span>
        <span className={"relative inline-flex rounded-full " + dotSize + " " + curr.color}></span>
      </span>
      {showLabel && <span className={"text-[11px] font-semibold tracking-wide " + curr.text}>{curr.label}</span>}
    </div>
  );
}
`,

  "src/components/ui/Sparkline.tsx": `import React from "react";

interface SparklineProps {
  data: number[];
  color?: string;
  height?: number;
  width?: number;
}

export function Sparkline({ data, color = "#6366F1", height = 40, width = 120 }: SparklineProps) {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 8) - 4;
      return x + "," + y;
    })
    .join(" ");

  const gradId = "grad-" + color.replace("#", "");

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <polyline fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  );
}
`,

  "src/components/ui/MetricCard.tsx": `import React from "react";
import { GlassCard } from "./GlassCard";
import { Sparkline } from "./Sparkline";

interface MetricCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  change?: string;
  isPositive?: boolean;
  trendData?: number[];
  accentColor?: string;
}

export function MetricCard({
  label,
  value,
  subValue,
  change,
  isPositive = true,
  trendData,
  accentColor = "#6366F1",
}: MetricCardProps) {
  return (
    <GlassCard level={2} className="flex flex-col justify-between">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white tracking-tight">{value}</span>
            {change && (
              <span
                className={"text-xs font-bold px-2 py-0.5 rounded-full border " + (
                  isPositive
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                    : "bg-rose-500/10 border-rose-500/30 text-rose-400"
                )}
              >
                {isPositive ? "?" : "?"} {change}
              </span>
            )}
          </div>
        </div>

        {trendData && <Sparkline data={trendData} color={accentColor} width={80} height={36} />}
      </div>

      {subValue && <p className="text-[11px] text-gray-400 font-medium">{subValue}</p>}
    </GlassCard>
  );
}
`,

  "src/components/ui/Button.tsx": `import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "glass" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base = "inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-xl active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-xs gap-2",
    lg: "px-6 py-3 text-sm gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] border border-indigo-400/30",
    secondary: "bg-white/10 hover:bg-white/15 text-white border border-white/10",
    glass: "glass-panel-1 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10",
    danger: "bg-rose-600/80 hover:bg-rose-500 text-white border border-rose-400/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]",
  };

  return (
    <button className={base + " " + sizeStyles[size] + " " + variantStyles[variant] + " " + className} {...props}>
      {children}
    </button>
  );
}
`,

  "src/components/ui/Badge.tsx": `import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  variant?: "outline" | "solid";
}

export function Badge({ children, color = "#6366F1", variant = "outline" }: BadgeProps) {
  const bg = variant === "solid" ? color + "30" : "rgba(255, 255, 255, 0.03)";
  const border = color + "40";

  return (
    <span
      className="inline-flex items-center text-[10px] font-semibold px-2.5 py-0.5 rounded-full border transition-all"
      style={{
        backgroundColor: bg,
        borderColor: border,
        color: "#F3F4F6",
      }}
    >
      {children}
    </span>
  );
}
`,

  "src/components/projects/ProjectCard.tsx": `"use client";

import { Project } from "@/types/project";
import { Globe, GitBranch, Trash2, ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onDelete?: (id: string) => void;
}

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const statusColors = {
    operational: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    degraded: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    warning: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    down: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    unknown: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  };

  return (
    <div className="glass-panel-2 rounded-3xl p-6 relative group transition-all duration-300 hover:border-white/20 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-md border border-white/10"
              style={{ backgroundColor: project.accentColor + "25", borderColor: project.accentColor + "50" }}
            >
              <span style={{ color: project.accentColor }}>{project.name.charAt(0)}</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-1.5 group-hover:text-indigo-300 transition-colors">
                {project.name}
              </h3>
              <p className="text-xs text-gray-400">{project.environment}</p>
            </div>
          </div>

          <span className={"text-[10px] font-semibold px-2.5 py-1 rounded-full border " + statusColors[project.status]}>
            ? {project.status}
          </span>
        </div>

        <p className="text-xs text-gray-300 line-clamp-2 mb-6 leading-relaxed">
          {project.description}
        </p>
      </div>

      <div>
        <div className="grid grid-cols-3 gap-2 py-3 px-4 glass-panel-1 rounded-2xl mb-6 border border-white/5">
          <div>
            <p className="text-[10px] text-gray-400">Health Score</p>
            <p className="text-sm font-bold text-white">{project.healthScore}/100</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400">Uptime</p>
            <p className="text-sm font-bold text-emerald-400">{project.uptimePercentage}%</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400">Latency</p>
            <p className="text-sm font-bold text-indigo-300">{project.latencyMs}ms</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.techStack.map((tech) => (
            <span key={tech} className="text-[10px] font-medium text-gray-400 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/5">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            {project.websiteUrl && (
              <a href={project.websiteUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Globe className="w-4 h-4" />
              </a>
            )}
            {project.repositoryUrl && (
              <a href={project.repositoryUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <GitBranch className="w-4 h-4" />
              </a>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onDelete && (
              <button onClick={() => onDelete(project.id)} className="p-1.5 rounded-lg text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
            <span className="text-xs text-indigo-400 font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform cursor-pointer">
              Details <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
`,

  "src/components/projects/CreateProjectModal.tsx": `"use client";

import { useState } from "react";
import { X, Layers, Sparkles } from "lucide-react";
import { CreateProjectInput } from "@/types/project";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateProjectModal({ isOpen, onClose }: ModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [repositoryUrl, setRepositoryUrl] = useState("");
  const [environment, setEnvironment] = useState<"production" | "staging" | "development">("production");
  const [accentColor, setAccentColor] = useState("#3B82F6");
  const [techInput, setTechInput] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const payload: CreateProjectInput = {
      name,
      description,
      websiteUrl,
      repositoryUrl,
      environment,
      accentColor,
      techStack: techInput.split(",").map((s) => s.trim()).filter(Boolean),
    };

    try {
      const res = await fetch("/api/v1/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        onClose();
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl">
      <div className="glass-panel-3 w-full max-w-lg rounded-3xl p-6 border border-white/20 shadow-2xl relative">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Create New Project</h2>
              <p className="text-xs text-gray-400">Connect a new app to ProjectPulse observability</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Project Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. ExamGuard"
              className="w-full glass-input px-3.5 py-2 rounded-xl text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short overview..."
              className="w-full glass-input px-3.5 py-2 rounded-xl text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Website URL</label>
              <input
                type="url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://my-app.com"
                className="w-full glass-input px-3.5 py-2 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Repository URL</label>
              <input
                type="url"
                value={repositoryUrl}
                onChange={(e) => setRepositoryUrl(e.target.value)}
                placeholder="https://github.com/user/repo"
                className="w-full glass-input px-3.5 py-2 rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Environment</label>
              <select
                value={environment}
                onChange={(e) => setEnvironment(e.target.value as any)}
                className="w-full glass-input px-3.5 py-2 rounded-xl text-xs bg-[#0B0C10]"
              >
                <option value="production">Production</option>
                <option value="staging">Staging</option>
                <option value="development">Development</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Accent Color</label>
              <input
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="w-full h-9 glass-input p-1 rounded-xl cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Tech Stack (comma-separated)</label>
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="Next.js, TypeScript, PostgreSQL"
              className="w-full glass-input px-3.5 py-2 rounded-xl text-xs"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl text-xs text-gray-400 hover:text-white">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-5 py-2 rounded-xl shadow-lg transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {loading ? "Creating..." : "Initialize Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
`,

  "src/app/app/dashboard/page.tsx": `"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Project } from "@/types/project";
import { Activity, AlertTriangle, Users, Layers, Sparkles } from "lucide-react";

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchProjects() {
    try {
      const res = await fetch("/api/v1/projects");
      const data = await res.json();
      if (data.success) setProjects(data.data);
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
      if (res.ok) fetchProjects();
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  const totalUsers = projects.reduce((acc, p) => acc + p.activeUsers, 0);
  const avgUptime = projects.length
    ? (projects.reduce((acc, p) => acc + p.uptimePercentage, 0) / projects.length).toFixed(2)
    : "100.00";

  return (
    <AppShell>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            Good evening, Girum <Sparkles className="w-5 h-5 text-amber-400" />
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Everything you build. One command center. All systems monitored in real-time.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="glass-panel-2 rounded-3xl p-5 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-400">Monitored Apps</span>
            <Layers className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">{projects.length}</p>
          <span className="text-[10px] text-emerald-400 font-medium">? Isolated telemetry active</span>
        </div>

        <div className="glass-panel-2 rounded-3xl p-5 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-400">Total Active Users</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">{totalUsers.toLocaleString()}</p>
          <span className="text-[10px] text-gray-400 font-medium">Across production nodes</span>
        </div>

        <div className="glass-panel-2 rounded-3xl p-5 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-400">Average Uptime</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-400">{avgUptime}%</p>
          <span className="text-[10px] text-gray-400 font-medium">30-day baseline</span>
        </div>

        <div className="glass-panel-2 rounded-3xl p-5 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-400">Open Incidents</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-extrabold text-amber-400">1</p>
          <span className="text-[10px] text-amber-300 font-medium">Sift latency elevated</span>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white tracking-tight">Project Health Overview</h2>
        <span className="text-xs text-gray-400 font-medium">{projects.length} Active Projects</span>
      </div>

      {loading ? (
        <div className="py-20 text-center glass-panel-1 rounded-3xl text-gray-400 text-xs">
          Loading command center telemetry...
        </div>
      ) : projects.length === 0 ? (
        <div className="py-20 text-center glass-panel-1 rounded-3xl text-gray-400 text-xs">
          No projects registered yet. Click &quot;New Project&quot; above to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </AppShell>
  );
}
`,

  "src/app/app/projects/page.tsx": `import DashboardPage from "@/app/app/dashboard/page";

export default function ProjectsPage() {
  return <DashboardPage />;
}
`,

  "src/app/app/design-system/page.tsx": `"use client";

import { AppShell } from "@/components/layout/AppShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { MetricCard } from "@/components/ui/MetricCard";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function DesignSystemPage() {
  return (
    <AppShell>
      <div className="max-w-6xl mx-auto space-y-10">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            Design System Showcase
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Dark Glassmorphism primitives for ProjectPulse command center.
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-sm font-bold text-gray-300 uppercase tracking-wider">1. Status Indicators</h2>
          <div className="flex flex-wrap gap-4 glass-panel-2 p-6 rounded-3xl">
            <StatusIndicator status="operational" />
            <StatusIndicator status="degraded" />
            <StatusIndicator status="warning" />
            <StatusIndicator status="down" />
            <StatusIndicator status="unknown" />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-bold text-gray-300 uppercase tracking-wider">2. Metric Cards with Inline Sparklines</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              label="Active Users Right Now"
              value="1,284"
              change="12%"
              isPositive={true}
              subValue="Peak baseline across nodes"
              trendData={[20, 35, 25, 45, 30, 55, 60, 50]}
              accentColor="#3B82F6"
            />
            <MetricCard
              label="API Latency"
              value="32ms"
              change="4ms"
              isPositive={true}
              subValue="Global average response time"
              trendData={[50, 48, 42, 38, 35, 32, 32]}
              accentColor="#EC4899"
            />
            <MetricCard
              label="Error Rate"
              value="0.02%"
              change="18%"
              isPositive={false}
              subValue="14 unresolved exceptions"
              trendData={[0.01, 0.01, 0.02, 0.05, 0.04, 0.02]}
              accentColor="#8B5CF6"
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-bold text-gray-300 uppercase tracking-wider">3. Glass Levels Hierarchy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard level={1}>
              <h3 className="font-bold text-white text-sm mb-1">Glass Level 1 (Subtle)</h3>
              <p className="text-xs text-gray-400">Low opacity surface background for embedded containers.</p>
            </GlassCard>
            <GlassCard level={2}>
              <h3 className="font-bold text-white text-sm mb-1">Glass Level 2 (Card Default)</h3>
              <p className="text-xs text-gray-400">Standard card panel with medium blur and subtle hover glow.</p>
            </GlassCard>
            <GlassCard level={3}>
              <h3 className="font-bold text-white text-sm mb-1">Glass Level 3 (Elevated)</h3>
              <p className="text-xs text-gray-400">High contrast translucent backdrop for flyouts & popovers.</p>
            </GlassCard>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-bold text-gray-300 uppercase tracking-wider">4. Buttons & Badges</h2>
          <div className="flex flex-wrap items-center gap-4 glass-panel-2 p-6 rounded-3xl">
            <Button variant="primary">Primary Indigo</Button>
            <Button variant="secondary">Secondary Glass</Button>
            <Button variant="glass">Glass Panel</Button>
            <Button variant="danger">Danger Alert</Button>

            <div className="h-6 w-px bg-white/10 mx-2"></div>

            <Badge color="#3B82F6">ACA Academy</Badge>
            <Badge color="#EC4899">Sift Platform</Badge>
            <Badge color="#8B5CF6">ExamGuard</Badge>
            <Badge color="#06B6D4">Focus OS</Badge>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
`,

  "src/app/api/v1/projects/route.ts": `import { NextResponse } from "next/server";
import { getProjects, createProject } from "@/lib/projects-store";

export async function GET() {
  const projects = getProjects();
  return NextResponse.json({ success: true, data: projects });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name) {
      return NextResponse.json({ success: false, error: "Project name is required" }, { status: 400 });
    }
    const project = createProject(body);
    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid request payload" }, { status: 400 });
  }
}
`,

  "src/app/api/v1/projects/[id]/route.ts": `import { NextResponse } from "next/server";
import { getProjectById, updateProject, deleteProject } from "@/lib/projects-store";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const project = getProjectById(params.id);
  if (!project) {
    return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: project });
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const updated = updateProject(params.id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update project" }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const deleted = deleteProject(params.id);
  if (!deleted) {
    return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, message: "Project deleted successfully" });
}
`
};

for (const [filePath, content] of Object.entries(files)) {
  ensureDir(filePath);
  fs.writeFileSync(filePath, content.trim(), 'utf8');
  console.log(`Generated: ${filePath}`);
}

console.log('Fix script complete!');
