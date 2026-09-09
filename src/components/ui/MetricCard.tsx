import React from "react";
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