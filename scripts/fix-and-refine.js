const fs = require('fs');
const path = require('path');

function ensureDir(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

const files = {
  // 1. FIX GLOBALS.CSS (Remove responsive modifiers in @apply to fix build)
  "src/app/globals.css": `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg-dark: #0a0a0c;
}

body {
  background-color: #08080a;
  color: #f3f4f6;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  overflow-x: hidden;
  background-image: 
    radial-gradient(circle at 50% 20%, rgba(120, 50, 35, 0.12), transparent 50%),
    radial-gradient(circle at 85% 60%, rgba(45, 55, 75, 0.15), transparent 40%);
  background-attachment: fixed;
}

/* Glass Architecture Levels */
.glass-container {
  background: rgba(18, 18, 22, 0.65);
  backdrop-filter: blur(30px) saturate(180%);
  -webkit-backdrop-filter: blur(30px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.6);
}

.glass-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 20px 40px rgba(0, 0, 0, 0.3);
}

.glass-pill {
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.glass-overlay {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(35px);
  -webkit-backdrop-filter: blur(35px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
}

::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.15); border-radius: 9999px; }
`,

  // 2. REFINED SIDEBAR (Matching reference rail)
  "src/components/layout/Sidebar.tsx": `"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, Activity, AlertTriangle, ShieldAlert, Sparkles, Settings, Terminal, Bell } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const items = [
    { name: "Command Center", href: "/app/dashboard", icon: LayoutDashboard },
    { name: "Projects", href: "/app/projects", icon: FolderKanban },
    { name: "Analytics", href: "/app/analytics", icon: Activity },
    { name: "Errors", href: "/app/dashboard#errors", icon: AlertTriangle },
    { name: "Incidents", href: "/app/dashboard#incidents", icon: ShieldAlert },
    { name: "AI Copilot", href: "/app/dashboard#copilot", icon: Sparkles },
  ];

  return (
    <aside className="w-20 glass-container border-r border-white/10 flex flex-col justify-between items-center py-6 h-screen fixed left-0 top-0 z-40 my-auto rounded-r-3xl">
      {/* Brand Icon */}
      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-purple-600/30 border border-white/20 flex items-center justify-center text-white shadow-lg">
        <Terminal className="w-5 h-5 text-indigo-300" />
      </div>

      {/* Navigation Rail */}
      <nav className="flex flex-col gap-4">
        {items.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              title={item.name}
              className={"w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 " + (
                isActive
                  ? "bg-white/15 text-white border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className="w-5 h-5" />
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="flex flex-col gap-4 items-center">
        <button className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-amber-400 absolute top-2 right-2 animate-pulse"></span>
        </button>
        <button className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-colors">
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
},

  // 3. REFINED TOPBAR
  "src/components/layout/Topbar.tsx": `"use client";
import { Search, Mail } from "lucide-react";

export function Topbar() {
  return (
    <header className="h-20 px-8 flex items-center justify-between ml-20">
      <h1 className="text-2xl font-bold tracking-tight text-white">Ecosystem Observability</h1>

      <div className="flex items-center gap-5">
        <button className="p-2.5 rounded-2xl glass-card text-gray-400 hover:text-white transition-all">
          <Mail className="w-4 h-4" />
        </button>
        <button className="p-2.5 rounded-2xl glass-card text-gray-400 hover:text-white transition-all">
          <Search className="w-4 h-4" />
        </button>
        <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 border border-white/20 flex items-center justify-center text-white font-bold text-xs shadow-md">
          GE
        </div>
      </div>
    </header>
  );
},

  // 4. SPARKLINE ENGINE
  "src/components/ui/Sparkline.tsx": `import React from "react";

interface SparklineProps {
  data: number[];
  color?: string;
  height?: number;
  width?: number;
}

export function Sparkline({ data, color = "#F59E0B", height = 36, width = 120 }: SparklineProps) {
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

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  );
},

  // 5. CINEMATIC DASHBOARD (Matching Reference Grid & Overlay)
  "src/app/app/dashboard/page.tsx": `"use client";

import { AppShell } from "@/components/layout/AppShell";
import { Sparkline } from "@/components/ui/Sparkline";
import { ArrowRight, MoreHorizontal, Activity, Layers, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const projects = [
    {
      id: "proj_aca_1",
      name: "ACA Academy",
      category: "Education Platform",
      status: "Operational",
      statusColor: "bg-emerald-400",
      users: "1.28k views",
      latency: "32ms (99.98%)",
      sparkline: [20, 25, 30, 28, 45, 50, 65],
      accent: "#3B82F6",
    },
    {
      id: "proj_sift_2",
      name: "Sift Intelligence",
      category: "AI Content Filter",
      status: "Degraded",
      statusColor: "bg-rose-400",
      users: "842 views",
      latency: "184ms (98.42%)",
      sparkline: [60, 55, 40, 30, 25, 18, 12],
      accent: "#EC4899",
    },
    {
      id: "proj_examguard_3",
      name: "ExamGuard Proctoring",
      category: "Exam Integrity Engine",
      status: "Warning",
      statusColor: "bg-amber-400",
      users: "412 views",
      latency: "340ms (97.10%)",
      sparkline: [30, 32, 35, 38, 36, 42, 40],
      accent: "#8B5CF6",
    },
    {
      id: "proj_focusos_4",
      name: "Focus OS",
      category: "Productivity System",
      status: "Operational",
      statusColor: "bg-cyan-400",
      users: "2.15k views",
      latency: "18ms (100.0%)",
      sparkline: [10, 25, 40, 55, 70, 85, 98],
      accent: "#06B6D4",
    },
  ];

  return (
    <AppShell>
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* Top Master Composition Grid */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Main Hero Card (Left, Span 7) */}
          <div className="col-span-12 lg:col-span-7 glass-card rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden flex flex-col justify-between min-h-[420px]">
            {/* Ambient Background Glow */}
            <div className="absolute top-[-30%] right-[-10%] w-[350px] h-[350px] bg-gradient-to-br from-amber-500/20 via-rose-500/10 to-transparent rounded-full blur-[90px] pointer-events-none"></div>

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Core Solution</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.1] max-w-md">
                Optimize <br /> Your Metrics
              </h2>
              <div className="mt-6">
                <Link href="/app/projects" className="inline-flex items-center gap-2 bg-white text-black text-xs font-bold px-6 py-3 rounded-full hover:bg-gray-200 transition-colors shadow-lg">
                  Start Now
                </Link>
              </div>
            </div>

            {/* Overlapping Glass Metrics Strip (Exactly as Reference Image) */}
            <div className="glass-overlay rounded-3xl p-5 border border-white/20 mt-8 relative z-10 flex items-center justify-between gap-4 overflow-x-auto">
              <div className="px-3 border-r border-white/10">
                <p className="text-2xl font-bold text-white">1,284</p>
                <p className="text-[10px] text-indigo-300 font-semibold flex items-center gap-1 mt-0.5">? Users</p>
              </div>
              <div className="px-3 border-r border-white/10">
                <p className="text-2xl font-bold text-white">99.98%</p>
                <p className="text-[10px] text-pink-300 font-semibold flex items-center gap-1 mt-0.5">? Uptime</p>
              </div>
              <div className="px-3 border-r border-white/10">
                <p className="text-2xl font-bold text-white">32ms</p>
                <p className="text-[10px] text-emerald-300 font-semibold flex items-center gap-1 mt-0.5">? Latency</p>
              </div>
              <div className="px-3">
                <p className="text-2xl font-bold text-white">0</p>
                <p className="text-[10px] text-amber-300 font-semibold flex items-center gap-1 mt-0.5">? Incidents</p>
              </div>
              <button className="w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white shrink-0 ml-2">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Top Right Dual-Curve Active Users Card (Span 5) */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
            <div className="glass-card rounded-[2.5rem] p-7 relative overflow-hidden flex-1 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-semibold text-gray-300 flex items-center gap-2">
                  Active Users right now <span className="text-amber-400">??</span>
                </h3>
              </div>

              {/* Dual Curve Integrated Graph (Reference SVG style) */}
              <div className="relative my-4">
                <svg viewBox="0 0 300 120" className="w-full h-28 overflow-visible">
                  {/* Yellow/Amber Curve */}
                  <path d="M 0,80 Q 50,20 100,70 T 200,30 T 300,90" fill="none" stroke="#F59E0B" strokeWidth="3" />
                  {/* Gray/White Curve */}
                  <path d="M 0,100 Q 60,50 120,90 T 220,10 T 300,60" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="4 4" />
                  {/* Active Tooltip Node (Reference "50") */}
                  <circle cx="220" cy="10" r="5" fill="#F59E0B" className="animate-ping opacity-75" />
                  <circle cx="220" cy="10" r="5" fill="#F59E0B" />
                  <g transform="translate(205, -20)">
                    <rect width="30" height="20" rx="10" fill="#000" />
                    <text x="15" y="13" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">50</text>
                  </g>
                </svg>
                <div className="flex justify-between text-[10px] text-gray-500 font-semibold mt-2">
                  <span>Oct</span>
                  <span>Mar</span>
                  <span>Jul</span>
                  <span>Aug</span>
                </div>
              </div>
            </div>

            {/* Middle Right System Health Item */}
            <div className="glass-card rounded-[2.5rem] p-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-semibold">Overall Ecosystem Health</p>
                <p className="text-3xl font-extrabold text-white mt-1">98.4 <span className="text-xs font-semibold text-emerald-400">? 6%</span></p>
                <p className="text-[10px] text-gray-400 mt-0.5">All 4 production nodes active</p>
              </div>
              <Sparkline data={[20, 30, 25, 40, 35, 50, 60]} color="#10B981" width={100} height={40} />
            </div>
          </div>

        </div>

        {/* Bottom Section: Monitored Applications in this Period (Reference Table Style) */}
        <div className="glass-card rounded-[2.5rem] p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-white tracking-wide">Monitored Applications in this period</h3>
            <button className="glass-pill px-4 py-1.5 rounded-full text-xs font-semibold text-gray-300">
              Popularity ?
            </button>
          </div>

          <div className="space-y-4">
            {projects.map((proj) => (
              <div key={proj.id} className="glass-card rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.04] transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white">
                    {proj.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{proj.name}</h4>
                    <p className="text-[10px] text-gray-400">{proj.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={"w-2 h-2 rounded-full " + proj.statusColor}></span>
                  <span className="text-xs text-gray-300 font-semibold">{proj.users}</span>
                </div>

                <div className="text-xs text-gray-300 font-medium font-mono">
                  {proj.latency}
                </div>

                <Sparkline data={proj.sparkline} color={proj.accent} width={100} height={28} />

                <button className="text-gray-500 hover:text-white p-1">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AppShell>
  );
}
`,

  "src/components/layout/AppShell.tsx": `"use client";

import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#08080a] text-gray-100 flex relative selection:bg-white/20 selection:text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
`
};

for (const [filePath, content] of Object.entries(files)) {
  ensureDir(filePath);
  fs.writeFileSync(filePath, content.trim(), 'utf8');
  console.log(`Generated: ${filePath}`);
}

console.log('Fix & Refinement Script Complete!');
