"use client";

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
                  <span className="text-[10px] text-gray-500">� {item.timestamp}</span>
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