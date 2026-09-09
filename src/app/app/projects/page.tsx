"use client";

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