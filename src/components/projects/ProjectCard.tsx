"use client";

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