const fs = require('fs');
const path = require('path');

function ensureDir(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

const files = {
  "src/types/project.ts": `
export type ProjectEnvironment = "production" | "staging" | "development";
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
  healthScore: number; // 0 - 100
  uptimePercentage: number;
  latencyMs: number;
  activeUsers: number;
  accentColor: string; // e.g. #3B82F6
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

  "src/lib/projects-store.ts": `
import { Project, CreateProjectInput } from "@/types/project";

// Initial seed projects matching your portfolio specification
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
    accentColor: "#3B82F6", // Blue
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
    accentColor: "#EC4899", // Pink/Burgundy
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
    accentColor: "#8B5CF6", // Purple
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
    accentColor: "#06B6D4", // Cyan
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
    id: \`proj_\${Date.now()}\`,
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

  "src/app/api/v1/projects/route.ts": `
import { NextResponse } from "next/server";
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

  "src/app/api/v1/projects/[id]/route.ts": `
import { NextResponse } from "next/server";
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
`,

  "src/app/globals.css": `
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg-base: #0B0C10;
  --glass-surface: rgba(255, 255, 255, 0.03);
  --glass-border: rgba(255, 255, 255, 0.08);
}

body {
  background-color: #0B0C10;
  color: #F3F4F6;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  overflow-x: hidden;
}

/* Glassmorphism primitives */
.glass-panel-1 {
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.glass-panel-2 {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.glass-panel-3 {
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(28px);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.glass-input {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #F3F4F6;
}

.glass-input:focus {
  outline: none;
  border-color: rgba(99, 102, 241, 0.5);
  box-shadow: 0 0 15px rgba(99, 102, 241, 0.2);
}

/* Custom Scrollbars */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: #0B0C10;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 9999px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
`,

  "src/components/layout/Sidebar.tsx": `
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, Activity, ShieldAlert, AlertTriangle, Terminal, Settings, Sparkles } from "lucide-react";

const navigation = [
  { name: "Command Center", href: "/app/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/app/projects", icon: FolderKanban },
  { name: "Health & Uptime", href: "/app/dashboard#health", icon: Activity },
  { name: "Errors", href: "/app/dashboard#errors", icon: AlertTriangle },
  { name: "Incidents", href: "/app/dashboard#incidents", icon: ShieldAlert },
  { name: "AI Copilot", href: "/app/dashboard#copilot", icon: Sparkles },
  { name: "Settings", href: "/app/dashboard#settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 glass-panel-2 border-r border-white/10 flex flex-col justify-between p-5 min-h-screen fixed left-0 top-0 z-30">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 py-3 mb-8">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            <Terminal className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h1 className="font-bold tracking-tight text-white text-lg">PROJECTPULSE</h1>
            <p className="text-[10px] text-gray-400 tracking-wider uppercase">Command Center</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={\`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 \${
                  isActive
                    ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.15)]"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                }\`}
              >
                <Icon className={\`w-4 h-4 \${isActive ? "text-indigo-400" : "text-gray-400"}\`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* System Status Footer */}
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

  "src/components/layout/Topbar.tsx": `
"use client";

import { Bell, Search, Plus, User } from "lucide-react";

interface TopbarProps {
  onOpenCreateModal?: () => void;
}

export function Topbar({ onOpenCreateModal }: TopbarProps) {
  return (
    <header className="h-16 glass-panel-1 border-b border-white/10 sticky top-0 z-20 flex items-center justify-between px-8 ml-64">
      {/* Search Bar */}
      <div className="relative w-80">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search projects, telemetry, errors... (Ctrl+K)"
          className="w-full glass-input pl-10 pr-4 py-1.5 rounded-xl text-xs placeholder:text-gray-500"
        />
      </div>

      {/* Action Area */}
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

  "src/components/layout/AppShell.tsx": `
"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { CreateProjectModal } from "@/components/projects/CreateProjectModal";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B0C10] text-gray-100 flex relative selection:bg-indigo-500 selection:text-white">
      {/* Background Ambient Glows */}
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

  "src/components/projects/ProjectCard.tsx": `
"use client";

import { Project } from "@/types/project";
import { Activity, ExternalLink, Globe, GitBranch, Trash2, ArrowUpRight } from "lucide-react";

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
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-md border border-white/10"
              style={{ backgroundColor: `${project.accentColor}25`, borderColor: `${project.accentColor}50` }}
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

          <span
            className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${statusColors[project.status]} capitalize`}
          >
            ? {project.status}
          </span>
        </div>

        <p className="text-xs text-gray-300 line-clamp-2 mb-6 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Metrics Row */}
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

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.techStack.map((tech) => (
            <span key={tech} className="text-[10px] font-medium text-gray-400 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/5">
              {tech}
            </span>
          ))}
        </div>

        {/* Card Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            {project.websiteUrl && (
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                title="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
            )}
            {project.repositoryUrl && (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                title="Repository"
              >
                <GitBranch className="w-4 h-4" />
              </a>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onDelete && (
              <button
                onClick={() => onDelete(project.id)}
                className="p-1.5 rounded-lg text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                title="Delete Project"
              >
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

  "src/components/projects/CreateProjectModal.tsx": `
"use client";

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
        window.location.reload(); // Refresh to display new project
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
              placeholder="Short overview of what this application does..."
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
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs text-gray-400 hover:text-white"
            >
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

  "src/app/app/dashboard/page.tsx": `
"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Project } from "@/types/project";
import { Activity, AlertTriangle, ShieldCheck, Users, Layers, Sparkles } from "lucide-react";

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
      const res = await fetch(\`/api/v1/projects/\${id}\`, { method: "DELETE" });
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
      {/* Greeting Banner */}
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

      {/* Global Quick Stats */}
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
          <span className="text-[10px] text-gray-400 font-medium">Across all production nodes</span>
        </div>

        <div className="glass-panel-2 rounded-3xl p-5 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-400">Average Uptime</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-400">{avgUptime}%</p>
          <span className="text-[10px] text-gray-400 font-medium">Last 30-day baseline</span>
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

      {/* Projects Grid */}
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

  "src/app/app/projects/page.tsx": `
import DashboardPage from "@/app/app/dashboard/page";

export default function ProjectsPage() {
  return <DashboardPage />;
}
`,

  "src/app/page.tsx": `
import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/app/dashboard");
}
`,

  "src/app/layout.tsx": `
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProjectPulse — Everything you build. One command center.",
  description: "Developer observability and project management platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
`
};

for (const [filePath, content] of Object.entries(files)) {
  ensureDir(filePath);
  fs.writeFileSync(filePath, content.trim(), 'utf8');
  console.log(`Created: ${filePath}`);
}

console.log('Phase 1 Foundation layout and Project CRUD successfully generated!');
