"use client";

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