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
| **1** | **Design system + app foundation** | **COMPLETED** |
| **2** | Landing page + authentication | UP NEXT |
| **3** | Projects + main dashboard | UPCOMING |
| **4** | Telemetry + analytics | UPCOMING |
| **5** | Health monitoring + incidents | UPCOMING |
| **6** | Error tracking + deployments | UPCOMING |
| **7** | SDK + integrations | UPCOMING |
| **8** | Tasks + releases + ideas | UPCOMING |
| **9** | AI Copilot + AI insights | UPCOMING |
| **10** | Security, performance, polish + production | UPCOMING |
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

        {/* Status Indicators Section */}
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

        {/* Metric Cards Section */}
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

        {/* Glass Levels Section */}
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

        {/* Button Variants Section */}
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
`
};

for (const [filePath, content] of Object.entries(files)) {
  ensureDir(filePath);
  fs.writeFileSync(filePath, content.trim(), 'utf8');
  console.log(`Generated: ${filePath}`);
}

console.log('Phase 1 Design System Component Library complete!');
