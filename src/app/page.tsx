"use client";

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
        ProjectPulse � Built by Girum Endalkachew
      </footer>
    </div>
  );
}