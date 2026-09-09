"use client";

import { FeatureUsage } from "@/types/telemetry";
import { Sparkles, TrendingUp, Users } from "lucide-react";

interface GridProps {
  features: FeatureUsage[];
}

export function FeatureUsageGrid({ features }: GridProps) {
  return (
    <div className="glass-panel-2 rounded-3xl p-6 border border-white/10">
      <h3 className="text-base font-bold text-white mb-1">Feature Adoption & Usage</h3>
      <p className="text-xs text-gray-400 mb-6">Product feature engagement tracked via SDK pulse.track()</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((f) => (
          <div key={f.featureName} className="glass-panel-1 p-4 rounded-2xl border border-white/5 flex flex-col justify-between">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-xs font-bold text-white">{f.featureName}</h4>
                <p className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                  <Users className="w-3 h-3 text-indigo-400" /> {f.uniqueUsers} active users
                </p>
              </div>
              <span
                className={"text-[10px] font-bold px-2 py-0.5 rounded-full border " + (
                  f.trendPercentage >= 0
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                    : "bg-rose-500/10 border-rose-500/30 text-rose-400"
                )}
              >
                {f.trendPercentage >= 0 ? "?" : "?"} {Math.abs(f.trendPercentage)}%
              </span>
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] text-gray-400 uppercase font-semibold">Total Triggers</span>
              <span className="text-xs font-bold text-indigo-300 font-mono">{f.usageCount.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}