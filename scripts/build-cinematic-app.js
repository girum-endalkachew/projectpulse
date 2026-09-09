const fs = require("fs");
const path = require("path");

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content.trim() + "\n", "utf8");
  console.log("Wrote", filePath);
}

// Shared sparkline (safe, no emoji)
write("src/components/ui/Sparkline.tsx", `
import React from "react";

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
}
`);

write("src/components/layout/Sidebar.tsx", `
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Activity,
  AlertTriangle,
  ShieldAlert,
  Sparkles,
  Settings,
  Terminal,
  Users,
} from "lucide-react";

const items = [
  { name: "Command Center", href: "/app/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/app/projects", icon: FolderKanban },
  { name: "Analytics", href: "/app/analytics", icon: Activity },
  { name: "Users", href: "/app/users", icon: Users },
  { name: "Errors", href: "/app/dashboard", icon: AlertTriangle },
  { name: "Incidents", href: "/app/dashboard", icon: ShieldAlert },
  { name: "AI", href: "/app/dashboard", icon: Sparkles },
  { name: "Settings", href: "/app/dashboard", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[4.5rem] fixed left-0 top-0 bottom-0 z-40 m-3 rounded-[1.75rem] glass-workspace flex flex-col items-center py-5 justify-between">
      <Link href="/" className="w-11 h-11 rounded-2xl flex items-center justify-center text-amber-300 border border-amber-500/30 bg-amber-500/10">
        <Terminal className="w-5 h-5" />
      </Link>

      <nav className="flex flex-col gap-2">
        {items.map((item) => {
          const active = pathname === item.href || (item.href !== "/app/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              title={item.name}
              className={
                "w-11 h-11 rounded-2xl flex items-center justify-center transition-all " +
                (active
                  ? "bg-white/15 text-white border border-white/20 shadow-[0_0_24px_rgba(255,255,255,0.08)]"
                  : "text-zinc-500 hover:text-white hover:bg-white/5 border border-transparent")
              }
            >
              <Icon className="w-4.5 h-4.5 w-[18px] h-[18px]" />
            </Link>
          );
        })}
      </nav>

      <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" title="Systems operational" />
    </aside>
  );
}
`);

write("src/components/layout/Topbar.tsx", `
"use client";

import { Search, Bell } from "lucide-react";

export function Topbar() {
  return (
    <header className="h-16 pl-24 pr-8 flex items-center justify-between">
      <div>
        <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-zinc-500">ProjectPulse</p>
        <h1 className="text-lg font-semibold tracking-tight text-white">Command Center</h1>
      </div>
      <div className="flex items-center gap-3">
        <button type="button" className="w-10 h-10 rounded-2xl glass-pill flex items-center justify-center text-zinc-400 hover:text-white">
          <Search className="w-4 h-4" />
        </button>
        <button type="button" className="w-10 h-10 rounded-2xl glass-pill flex items-center justify-center text-zinc-400 hover:text-white relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-amber-400" />
        </button>
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center text-xs font-bold text-black border border-white/20">
          GE
        </div>
      </div>
    </header>
  );
}
`);

write("src/components/layout/AppShell.tsx", `
"use client";

import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-zinc-100 overflow-x-hidden">
      <div className="pp-stage" aria-hidden />
      <div className="pp-content min-h-screen flex">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Topbar />
          <main className="pl-24 pr-6 pb-10 pt-2 lg:pr-10 flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
`);

write("src/app/app/dashboard/page.tsx", `
"use client";

import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Sparkline } from "@/components/ui/Sparkline";
import { ArrowRight, Sparkles } from "lucide-react";

const projects = [
  { id: "proj_aca_1", name: "ACA Academy", category: "Education Platform", users: "1.28k active", latency: "32ms", uptime: "99.98%", accent: "#3B82F6", status: "bg-blue-400", spark: [20, 25, 30, 28, 45, 50, 65] },
  { id: "proj_sift_2", name: "Sift Intelligence", category: "AI Content Filter", users: "842 active", latency: "184ms", uptime: "98.42%", accent: "#EC4899", status: "bg-pink-500", spark: [60, 55, 40, 30, 25, 18, 12] },
  { id: "proj_examguard_3", name: "ExamGuard", category: "Exam Integrity", users: "412 active", latency: "340ms", uptime: "97.10%", accent: "#8B5CF6", status: "bg-purple-400", spark: [30, 32, 35, 38, 36, 42, 40] },
  { id: "proj_focusos_4", name: "Focus OS", category: "Productivity Engine", users: "2.15k active", latency: "18ms", uptime: "100%", accent: "#06B6D4", status: "bg-cyan-400", spark: [10, 25, 40, 55, 70, 85, 98] },
];

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="max-w-[1400px] mx-auto space-y-8">
        {/* Editorial greeting */}
        <header className="pt-2">
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-zinc-500 mb-2">Good evening, Girum</p>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white">
            Everything is under control.
          </h2>
        </header>

        {/* Master composition — same language as landing hero */}
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12 xl:col-span-8 glass-panel rounded-[2rem] p-8 min-h-[340px] flex flex-col justify-between relative overflow-hidden">
            <div
              className="absolute -top-20 -right-10 w-80 h-80 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(245,158,11,0.28), rgba(225,29,72,0.1), transparent 70%)",
                filter: "blur(48px)",
              }}
            />
            <div className="relative z-10 flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500 mb-2">Ecosystem health</p>
                <p className="text-6xl sm:text-7xl font-light tracking-tighter text-white">
                  99.98<span className="text-3xl text-zinc-500">%</span>
                </p>
                <p className="text-xs text-zinc-400 mt-2 max-w-sm">
                  Four production apps monitored. One open attention item on ExamGuard latency.
                </p>
              </div>
              <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.9)] shrink-0 mt-2" />
            </div>

            <div className="glass-overlay-bar relative z-10 mt-8 rounded-2xl px-4 py-4 flex items-center gap-1 overflow-x-auto">
              <div className="px-4 border-r border-white/15 min-w-[5.5rem]">
                <p className="text-2xl font-bold text-white">4</p>
                <p className="text-[10px] font-semibold text-zinc-400 mt-1">Projects</p>
              </div>
              <div className="px-4 border-r border-white/15 min-w-[5.5rem]">
                <p className="text-2xl font-bold text-white">4,688</p>
                <p className="text-[10px] font-semibold text-blue-300 mt-1">Active users</p>
              </div>
              <div className="px-4 border-r border-white/15 min-w-[5.5rem]">
                <p className="text-2xl font-bold text-white">32ms</p>
                <p className="text-[10px] font-semibold text-amber-200 mt-1">Avg latency</p>
              </div>
              <div className="px-4 min-w-[5rem]">
                <p className="text-2xl font-bold text-white">1</p>
                <p className="text-[10px] font-semibold text-rose-300 mt-1">Incidents</p>
              </div>
              <Link
                href="/app/projects"
                className="ml-auto w-10 h-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center shrink-0"
              >
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
            </div>
          </div>

          <div className="col-span-12 xl:col-span-4 flex flex-col gap-4">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 px-1">Needs your attention</p>
            <div className="glass-panel rounded-3xl p-5 border-l-4 border-l-rose-500/80">
              <p className="text-[10px] font-bold uppercase tracking-widest text-rose-300 mb-1">ExamGuard</p>
              <h3 className="text-sm font-semibold text-white">Latency up 34%</h3>
              <p className="text-[11px] text-zinc-400 mt-1">Relay at 340ms vs 120ms baseline.</p>
            </div>
            <div className="glass-panel rounded-3xl p-5 border-l-4 border-l-amber-500/80">
              <p className="text-[10px] font-bold uppercase tracking-widest text-amber-300 mb-1">Sift</p>
              <h3 className="text-sm font-semibold text-white">Error rate rising</h3>
              <p className="text-[11px] text-zinc-400 mt-1">Extractor exceptions +18% (2h).</p>
            </div>
            <div className="glass-panel rounded-3xl p-5 border-l-4 border-l-cyan-500/80">
              <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-300 mb-1">Focus OS</p>
              <h3 className="text-sm font-semibold text-white">Traffic +42%</h3>
              <p className="text-[11px] text-zinc-400 mt-1">Post-release session surge.</p>
            </div>
          </div>
        </div>

        {/* Active users curve + health */}
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12 lg:col-span-8 glass-panel rounded-[2rem] p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-semibold text-zinc-300 flex items-center gap-2">
                Active users right now <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </p>
              <span className="text-[10px] font-mono text-zinc-500">Last 30 days</span>
            </div>
            <svg viewBox="0 0 600 140" className="w-full h-36 overflow-visible">
              <path d="M 0,100 Q 80,40 150,90 T 300,50 T 450,30 T 600,80" fill="none" stroke="#F59E0B" strokeWidth="3" />
              <path d="M 0,120 Q 100,70 200,100 T 400,20 T 600,70" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="5 5" />
              <circle cx="450" cy="30" r="6" fill="#F59E0B" />
              <g transform="translate(432,-8)">
                <rect width="36" height="22" rx="11" fill="#000" />
                <text x="18" y="15" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">50</text>
              </g>
            </svg>
          </div>
          <div className="col-span-12 lg:col-span-4 glass-panel rounded-[2rem] p-6 flex flex-col justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">AI summary</p>
              <p className="text-sm text-zinc-300 mt-3 leading-relaxed">
                Ecosystem health is strong. Prioritize <span className="text-white font-semibold">ExamGuard</span> latency, then Sift error grouping.
              </p>
            </div>
            <Sparkline data={[40, 42, 38, 50, 48, 55, 62]} color="#10B981" width={140} height={40} />
          </div>
        </div>

        {/* Project rows */}
        <div className="glass-panel rounded-[2rem] p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold text-white">Monitored applications</h3>
            <Link href="/app/projects" className="text-[11px] font-semibold text-amber-300 hover:text-amber-200">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {projects.map((p) => (
              <Link
                key={p.id}
                href={"/app/projects/" + p.id}
                className="glass-panel rounded-2xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 hover:bg-white/[0.04] transition-colors block"
              >
                <div className="flex items-center gap-3 min-w-[11rem]">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold border border-white/10"
                    style={{ backgroundColor: p.accent + "22", color: p.accent }}
                  >
                    {p.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{p.name}</p>
                    <p className="text-[10px] text-zinc-500">{p.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-300">
                  <span className={"w-2 h-2 rounded-full " + p.status} />
                  {p.users}
                </div>
                <p className="text-xs font-mono text-zinc-400">{p.latency} · {p.uptime}</p>
                <Sparkline data={p.spark} color={p.accent} width={88} height={26} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
`);

write("src/app/login/page.tsx", `
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Terminal, ArrowRight, Mail, Lock } from "lucide-react";
import { loginUser } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@projectpulse.dev");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      loginUser(email);
      router.push("/app/dashboard");
    }, 500);
  }

  return (
    <div className="min-h-screen text-zinc-100 flex items-center justify-center px-6">
      <div className="pp-stage" aria-hidden />
      <div className="pp-content w-full max-w-md">
        <div className="glass-workspace rounded-[2rem] p-8 border border-white/10">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300 mb-4">
              <Terminal className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-light text-white tracking-tight">Welcome back</h1>
            <p className="text-xs text-zinc-500 mt-1">Sign in to your command center</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-black/40 border border-white/10 pl-10 pr-3 py-2.5 text-xs text-white outline-none focus:border-amber-500/40"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl bg-black/40 border border-white/10 pl-10 pr-3 py-2.5 text-xs text-white outline-none focus:border-amber-500/40"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold text-black bg-gradient-to-r from-amber-500 to-amber-400 shadow-[0_0_28px_rgba(245,158,11,0.35)]"
            >
              {loading ? "Signing in..." : "Sign in"} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <p className="text-xs text-zinc-500 text-center mt-6">
            No account?{" "}
            <Link href="/register" className="text-amber-300 font-semibold hover:underline">
              Start Monitoring
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
`);

write("src/app/register/page.tsx", `
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Terminal, ArrowRight, Mail, Lock, User } from "lucide-react";
import { loginUser } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("Girum Endalkachew");
  const [email, setEmail] = useState("girum@projectpulse.dev");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      loginUser(email);
      router.push("/app/dashboard");
    }, 500);
  }

  return (
    <div className="min-h-screen text-zinc-100 flex items-center justify-center px-6">
      <div className="pp-stage" aria-hidden />
      <div className="pp-content w-full max-w-md">
        <div className="glass-workspace rounded-[2rem] p-8 border border-white/10">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300 mb-4">
              <Terminal className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-light text-white tracking-tight">Start Monitoring</h1>
            <p className="text-xs text-zinc-500 mt-1">Create your ProjectPulse workspace</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5 block">Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl bg-black/40 border border-white/10 pl-10 pr-3 py-2.5 text-xs text-white outline-none focus:border-amber-500/40"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-black/40 border border-white/10 pl-10 pr-3 py-2.5 text-xs text-white outline-none focus:border-amber-500/40"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl bg-black/40 border border-white/10 pl-10 pr-3 py-2.5 text-xs text-white outline-none focus:border-amber-500/40"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold text-black bg-gradient-to-r from-amber-500 to-amber-400 shadow-[0_0_28px_rgba(245,158,11,0.35)]"
            >
              {loading ? "Creating..." : "Create account"} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <p className="text-xs text-zinc-500 text-center mt-6">
            Already monitoring?{" "}
            <Link href="/login" className="text-amber-300 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
`);

write("docs/ROADMAP.md", `
# ProjectPulse — 10-Phase Master Roadmap

| Phase | Build | Status |
| :--- | :--- | :--- |
| **0** | Architecture + product specification | **COMPLETED** |
| **1** | Design system + app foundation | **COMPLETED** |
| **2** | Landing page + authentication | **COMPLETED** (cinematic glass) |
| **3** | Projects + main dashboard | **COMPLETED** (cinematic glass command center) |
| **4** | Telemetry + analytics | IN PROGRESS (restyle next) |
| **5** | Health monitoring + incidents | UP NEXT |
| **6** | Error tracking + deployments | UPCOMING |
| **7** | SDK + integrations | UPCOMING |
| **8** | Tasks + releases + ideas | UPCOMING |
| **9** | AI Copilot + AI insights | UPCOMING |
| **10** | Security, performance, polish + production | UPCOMING |
`);

console.log("Cinematic app shell + dashboard + auth complete.");
