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
| **1** | Design system + app foundation | **COMPLETED** |
| **2** | **Landing page + authentication** | **COMPLETED** |
| **3** | Projects + main dashboard | UP NEXT |
| **4** | Telemetry + analytics | UPCOMING |
| **5** | Health monitoring + incidents | UPCOMING |
| **6** | Error tracking + deployments | UPCOMING |
| **7** | SDK + integrations | UPCOMING |
| **8** | Tasks + releases + ideas | UPCOMING |
| **9** | AI Copilot + AI insights | UPCOMING |
| **10** | Security, performance, polish + production | UPCOMING |
`,

  "src/lib/auth.ts": `export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: string;
}

export function getCurrentUser(): UserSession | null {
  if (typeof window === "undefined") return null;
  const session = localStorage.getItem("pulse_session");
  if (!session) return null;
  try {
    return JSON.parse(session);
  } catch {
    return null;
  }
}

export function loginUser(email: string): UserSession {
  const user: UserSession = {
    id: "usr_admin_1",
    name: "Girum Endalkachew",
    email: email || "admin@projectpulse.dev",
    role: "Lead Engineer",
  };
  if (typeof window !== "undefined") {
    localStorage.setItem("pulse_session", JSON.stringify(user));
  }
  return user;
}

export function logoutUser(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("pulse_session");
  }
}
`,

  "src/app/page.tsx": `"use client";

import Link from "next/link";
import { Terminal, Activity, ShieldAlert, Sparkles, Zap, ArrowRight, Layers, Globe, CheckCircle2, Lock } from "lucide-react";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { GlassCard } from "@/components/ui/GlassCard";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B0C10] text-gray-100 flex flex-col relative selection:bg-indigo-500 selection:text-white overflow-hidden">
      {/* Background Glow Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-indigo-600/15 via-purple-600/10 to-transparent rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-[600px] -left-40 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none"></div>

      {/* Navigation Topbar */}
      <header className="h-20 border-b border-white/10 backdrop-blur-xl bg-black/30 sticky top-0 z-50 flex items-center justify-between px-6 lg:px-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            <Terminal className="w-5 h-5 text-indigo-400" />
          </div>
          <span className="font-extrabold tracking-wider text-white text-lg">PROJECTPULSE</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-gray-300">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
          <a href="#projects" className="hover:text-white transition-colors">Monitored Apps</a>
          <a href="#sdk" className="hover:text-white transition-colors">Developer SDK</a>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/login" className="text-xs font-semibold text-gray-300 hover:text-white px-3 py-2 transition-colors">
            Sign In
          </Link>
          <Link
            href="/app/dashboard"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-[0_0_25px_rgba(99,102,241,0.35)] border border-indigo-400/30 transition-all"
          >
            Launch Command Center <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6 lg:px-16 text-center max-w-5xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-1 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-8 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Developer Observability Platform v1.0
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.15] mb-6">
          Everything you build. <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
            One command center.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10">
          ProjectPulse monitors project health, active users, uptime, exceptions, and deployments across all your applications in a high-craft dark glassmorphism workspace.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/app/dashboard"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold px-8 py-3.5 rounded-2xl shadow-[0_0_30px_rgba(99,102,241,0.4)] border border-indigo-400/40 transition-all"
          >
            Open Live Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/register"
            className="w-full sm:w-auto flex items-center justify-center gap-2 glass-panel-2 hover:bg-white/10 text-white text-sm font-semibold px-8 py-3.5 rounded-2xl border border-white/10 transition-all"
          >
            Create Account
          </Link>
        </div>

        {/* Hero Command Center Glass Preview */}
        <div className="glass-panel-3 rounded-3xl p-4 sm:p-6 border border-white/20 shadow-[0_30px_100px_rgba(0,0,0,0.8)] text-left relative overflow-hidden group">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              <span className="text-xs text-gray-400 ml-2 font-mono">projectpulse.dev / command-center</span>
            </div>
            <StatusIndicator status="operational" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="glass-panel-1 p-4 rounded-2xl">
              <p className="text-[10px] text-gray-400 uppercase font-semibold">Active Apps</p>
              <p className="text-xl font-bold text-white">4 Managed Projects</p>
            </div>
            <div className="glass-panel-1 p-4 rounded-2xl">
              <p className="text-[10px] text-gray-400 uppercase font-semibold">Global Uptime</p>
              <p className="text-xl font-bold text-emerald-400">99.98%</p>
            </div>
            <div className="glass-panel-1 p-4 rounded-2xl">
              <p className="text-[10px] text-gray-400 uppercase font-semibold">Live Users</p>
              <p className="text-xl font-bold text-cyan-300">4,688 Active</p>
            </div>
            <div className="glass-panel-1 p-4 rounded-2xl">
              <p className="text-[10px] text-gray-400 uppercase font-semibold">Avg Latency</p>
              <p className="text-xl font-bold text-indigo-300">32ms Baseline</p>
            </div>
          </div>
        </div>
      </section>

      {/* Monitored Portfolio Strip */}
      <section id="projects" className="py-12 border-y border-white/10 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
            Unified Observability Across Active Production Products
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
            <span className="text-sm font-bold text-gray-300 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> ACA Academy
            </span>
            <span className="text-sm font-bold text-gray-300 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500"></span> Sift Platform
            </span>
            <span className="text-sm font-bold text-gray-300 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> ExamGuard
            </span>
            <span className="text-sm font-bold text-gray-300 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span> Focus OS
            </span>
          </div>
        </div>
      </section>

      {/* Bento Grid Feature Section */}
      <section id="features" className="py-24 px-6 lg:px-16 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Built for developers who maintain multiple apps.
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
            Stop checking 10 separate dashboards. ProjectPulse gives you one glass command center.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard level={2} className="md:col-span-2">
            <div className="p-2 w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 mb-4 border border-indigo-500/30">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Isolated Telemetry & Health Monitoring</h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Every project receives its own isolated telemetry channel. Track uptime, HTTP ping health, latency spikes, and SSL certificate renewals automatically.
            </p>
          </GlassCard>

          <GlassCard level={2}>
            <div className="p-2 w-10 h-10 rounded-2xl bg-pink-500/20 text-pink-400 mb-4 border border-pink-500/30">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Error Grouping</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Capture stack traces and group recurring exceptions with affected user counts.
            </p>
          </GlassCard>

          <GlassCard level={2}>
            <div className="p-2 w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 mb-4 border border-cyan-500/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Data-Grounded AI Copilot</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Ask natural language questions. The AI uses deterministic functions on PostgreSQL data without hallucinating metrics.
            </p>
          </GlassCard>

          <GlassCard level={2} className="md:col-span-2">
            <div className="p-2 w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 mb-4 border border-purple-500/30">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Signature &quot;Attention Required&quot; Engine</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Automatically ranks critical issues, memory leaks, high latencies, and stale deployments across all projects into a single prioritized queue.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/10 py-10 px-6 lg:px-16 glass-panel-1">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span className="font-bold text-white">ProjectPulse</span> — Built by Girum Endalkachew
          </div>
          <p>© {new Date().getFullYear()} ProjectPulse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
`,

  "src/app/login/page.tsx": `"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Terminal, Lock, Mail, ArrowRight, Sparkles } from "lucide-react";
import { loginUser } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@projectpulse.dev");
  const [password, setPassword] = useState("••••••••••••");
  const [loading, setLoading] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      loginUser(email);
      router.push("/app/dashboard");
    }, 600);
  }

  return (
    <div className="min-h-screen bg-[#0B0C10] text-gray-100 flex items-center justify-center p-6 relative selection:bg-indigo-500 selection:text-white">
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="glass-panel-3 w-full max-w-md rounded-3xl p-8 border border-white/20 shadow-[0_20px_80px_rgba(0,0,0,0.8)] relative z-10">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(99,102,241,0.35)]">
            <Terminal className="w-6 h-6 text-indigo-400" />
          </div>
          <h1 className="text-2xl font-black text-white">Welcome Back</h1>
          <p className="text-xs text-gray-400 mt-1">Sign in to your ProjectPulse Command Center</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-3 rounded-xl shadow-[0_0_25px_rgba(99,102,241,0.35)] border border-indigo-400/30 transition-all mt-6"
          >
            {loading ? "Authenticating..." : "Sign In to Dashboard"} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-gray-400">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-indigo-400 font-bold hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
`,

  "src/app/register/page.tsx": `"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Terminal, Lock, Mail, User, ArrowRight } from "lucide-react";
import { loginUser } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("Girum Endalkachew");
  const [email, setEmail] = useState("girum@projectpulse.dev");
  const [password, setPassword] = useState("••••••••••••");
  const [loading, setLoading] = useState(false);

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      loginUser(email);
      router.push("/app/dashboard");
    }, 600);
  }

  return (
    <div className="min-h-screen bg-[#0B0C10] text-gray-100 flex items-center justify-center p-6 relative selection:bg-indigo-500 selection:text-white">
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="glass-panel-3 w-full max-w-md rounded-3xl p-8 border border-white/20 shadow-[0_20px_80px_rgba(0,0,0,0.8)] relative z-10">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(168,85,247,0.35)]">
            <Terminal className="w-6 h-6 text-purple-400" />
          </div>
          <h1 className="text-2xl font-black text-white">Create Account</h1>
          <p className="text-xs text-gray-400 mt-1">Start monitoring your software ecosystem</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold py-3 rounded-xl shadow-[0_0_25px_rgba(168,85,247,0.35)] border border-purple-400/30 transition-all mt-6"
          >
            {loading ? "Creating Account..." : "Create Account & Launch"} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-purple-400 font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
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

console.log('Phase 2 Landing Page + Authentication build script complete!');
