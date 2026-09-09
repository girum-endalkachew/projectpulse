"use client";

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