const fs = require('fs');
const path = require('path');

function ensureDir(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

const files = {
  // 1. BULLETPROOF Tailwind v4 CSS
  "src/app/globals.css": `@import "tailwindcss";

*, ::after, ::before {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  background-color: #08080a;
  color: #f4f4f5;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  overflow-x: hidden;
}

/* Glass Architecture Primitives */
.glass-workspace {
  background: rgba(14, 14, 18, 0.75);
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.7);
}

.glass-panel {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.015) 100%);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 20px 50px rgba(0, 0, 0, 0.4);
}

.glass-overlay-bar {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(35px) saturate(200%);
  -webkit-backdrop-filter: blur(35px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.glass-pill {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.15); border-radius: 9999px; }
`,

  // 2. LANDING PAGE REBUILD (No raw HTML styling, high-craft dark glass)
  "src/app/page.tsx": `"use client";

import Link from "next/link";
import { Terminal, ArrowRight, Sparkles, Activity, ShieldCheck, Zap, Globe, Layers } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#08080a] text-gray-100 flex flex-col relative selection:bg-indigo-500 selection:text-white overflow-hidden">
      {/* Background Studio Lighting */}
      <div 
        className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.08) 50%, transparent 100%)" }}
      ></div>

      {/* Top Bar */}
      <header className="h-20 border-b border-white/10 backdrop-blur-xl bg-black/40 sticky top-0 z-50 flex items-center justify-between px-6 lg:px-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shadow-lg">
            <Terminal className="w-5 h-5" />
          </div>
          <span className="font-extrabold tracking-wider text-white text-lg">PROJECTPULSE</span>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="text-xs font-semibold text-gray-300 hover:text-white px-3 py-2 transition-colors">
            Sign In
          </Link>
          <Link
            href="/app/dashboard"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg border border-indigo-400/30 transition-all"
          >
            Launch Command Center <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-20 pb-16 px-6 lg:px-16 text-center max-w-5xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-indigo-300 text-xs font-semibold mb-8 border border-white/10">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Developer Observability Platform v1.0
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.15] mb-6">
          Everything you build. <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
            One command center.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
          ProjectPulse unifies project health, uptime monitoring, latency analytics, error tracking, and AI insights across all your production applications.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/app/dashboard"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold px-8 py-3.5 rounded-2xl shadow-xl border border-indigo-400/40 transition-all"
          >
            Open Live Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/register"
            className="w-full sm:w-auto flex items-center justify-center gap-2 glass-pill hover:bg-white/10 text-white text-sm font-semibold px-8 py-3.5 rounded-2xl transition-all"
          >
            Create Account
          </Link>
        </div>

        {/* Hero Preview Card */}
        <div className="glass-workspace rounded-[2.5rem] p-6 text-left relative overflow-hidden">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              <span className="text-xs text-gray-400 ml-2 font-mono">projectpulse.dev / command-center</span>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              ? All Systems Operational
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="glass-panel p-4 rounded-2xl">
              <p className="text-[10px] text-gray-400 uppercase font-semibold">Active Apps</p>
              <p className="text-xl font-bold text-white mt-1">4 Managed</p>
            </div>
            <div className="glass-panel p-4 rounded-2xl">
              <p className="text-[10px] text-gray-400 uppercase font-semibold">Global Uptime</p>
              <p className="text-xl font-bold text-emerald-400 mt-1">99.98%</p>
            </div>
            <div className="glass-panel p-4 rounded-2xl">
              <p className="text-[10px] text-gray-400 uppercase font-semibold">Live Users</p>
              <p className="text-xl font-bold text-cyan-300 mt-1">4,688 Active</p>
            </div>
            <div className="glass-panel p-4 rounded-2xl">
              <p className="text-[10px] text-gray-400 uppercase font-semibold">Avg Latency</p>
              <p className="text-xl font-bold text-indigo-300 mt-1">32ms Baseline</p>
            </div>
          </div>
        </div>
      </section>

      {/* Monitored Products Strip */}
      <section className="py-12 border-y border-white/10 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-6">
            Monitored Applications Ecosystem
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            <span className="text-xs font-bold text-gray-300 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> ACA Academy
            </span>
            <span className="text-xs font-bold text-gray-300 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500"></span> Sift Platform
            </span>
            <span className="text-xs font-bold text-gray-300 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> ExamGuard
            </span>
            <span className="text-xs font-bold text-gray-300 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span> Focus OS
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/10 py-8 px-6 text-center text-xs text-gray-500">
        ProjectPulse — Built by Girum Endalkachew
      </footer>
    </div>
  );
}
`,

  // 3. DASHBOARD (Strict Alignment with Attached Reference Image)
  "src/app/app/dashboard/page.tsx": `"use client";

import { AppShell } from "@/components/layout/AppShell";
import { Sparkline } from "@/components/ui/Sparkline";
import { ArrowRight, MoreHorizontal, Globe, GitBranch } from "lucide-react";
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
        
        {/* Master Composition Grid */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Main Hero Glass Banner (Left, Span 7 - Matching Visual Reference) */}
          <div className="col-span-12 lg:col-span-7 glass-panel rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden flex flex-col justify-between min-h-[420px]">
            <div 
              className="absolute top-[-30%] right-[-10%] w-[350px] h-[350px] rounded-full blur-[90px] pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, rgba(225, 29, 72, 0.1) 50%, transparent 100%)" }}
            ></div>

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Popular Solution</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.1] max-w-md">
                Optimize <br /> Your Metrics
              </h2>
              <div className="mt-6">
                <Link href="/app/projects" className="inline-flex items-center gap-2 bg-white text-black text-xs font-bold px-6 py-3 rounded-full hover:bg-gray-200 transition-colors shadow-lg">
                  Start Now
                </Link>
              </div>
            </div>

            {/* Overlapping Glass Metrics Strip (Matching Attached Visual Reference) */}
            <div className="glass-overlay-bar rounded-3xl p-5 mt-8 relative z-10 flex items-center justify-between gap-4 overflow-x-auto">
              <div className="px-3 border-r border-white/10">
                <p className="text-2xl font-bold text-white">76k</p>
                <p className="text-[10px] text-indigo-300 font-semibold flex items-center gap-1 mt-0.5">? Users</p>
              </div>
              <div className="px-3 border-r border-white/10">
                <p className="text-2xl font-bold text-white">1.5m</p>
                <p className="text-[10px] text-pink-300 font-semibold flex items-center gap-1 mt-0.5">? Clicks</p>
              </div>
              <div className="px-3 border-r border-white/10">
                <p className="text-2xl font-bold text-white">$3,6k</p>
                <p className="text-[10px] text-emerald-300 font-semibold flex items-center gap-1 mt-0.5">? Sales</p>
              </div>
              <div className="px-3">
                <p className="text-2xl font-bold text-white">47</p>
                <p className="text-[10px] text-amber-300 font-semibold flex items-center gap-1 mt-0.5">? Items</p>
              </div>
              <button className="w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white shrink-0 ml-2">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Top Right Dual-Curve Active Users Card (Span 5) */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
            <div className="glass-panel rounded-[2.5rem] p-7 relative overflow-hidden flex-1 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-semibold text-gray-300 flex items-center gap-2">
                  Active Users right now <span className="text-amber-400">??</span>
                </h3>
              </div>

              <div className="relative my-4">
                <svg viewBox="0 0 300 120" className="w-full h-28 overflow-visible">
                  <path d="M 0,80 Q 50,20 100,70 T 200,30 T 300,90" fill="none" stroke="#F59E0B" strokeWidth="3" />
                  <path d="M 0,100 Q 60,50 120,90 T 220,10 T 300,60" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="4 4" />
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

            <div className="glass-panel rounded-[2.5rem] p-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-semibold">Latest Sales / Ecosystem Health</p>
                <p className="text-3xl font-extrabold text-white mt-1">$ 586 <span className="text-xs font-semibold text-emerald-400">? 6%</span></p>
                <p className="text-[10px] text-gray-400 mt-0.5">Your total earnings baseline</p>
              </div>
              <Sparkline data={[20, 30, 25, 40, 35, 50, 60]} color="#10B981" width={100} height={40} />
            </div>
          </div>

        </div>

        {/* Bottom Section: Monitored Applications in this Period */}
        <div className="glass-panel rounded-[2.5rem] p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-white tracking-wide">Monitored Applications in this period</h3>
            <button className="glass-pill px-4 py-1.5 rounded-full text-xs font-semibold text-gray-300">
              Popularity ?
            </button>
          </div>

          <div className="space-y-4">
            {projects.map((proj) => (
              <div key={proj.id} className="glass-panel rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.04] transition-all">
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
`
};

for (const [filePath, content] of Object.entries(files)) {
  ensureDir(filePath);
  fs.writeFileSync(filePath, content.trim(), 'utf8');
  console.log(`Generated: ${filePath}`);
}

console.log('Fix script complete!');
