import React from "react";

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