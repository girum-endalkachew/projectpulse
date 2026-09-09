"use client";

import Link from "next/link";
import { Terminal, ArrowRight, Sparkles } from "lucide-react";
import { Sparkline } from "@/components/ui/Sparkline";

export default function LandingPage() {
  const projects = [
    { name: "ACA Academy", category: "Education Platform", users: "1.28k active", latency: "32ms", accent: "#3B82F6", status: "bg-blue-400", spark: [20, 25, 30, 28, 45, 50, 65] },
    { name: "Sift Intelligence", category: "AI Content Filter", users: "842 active", latency: "184ms", accent: "#EC4899", status: "bg-pink-500", spark: [60, 55, 40, 30, 25, 18, 12] },
    { name: "ExamGuard", category: "Exam Integrity", users: "412 active", latency: "340ms", accent: "#8B5CF6", status: "bg-purple-400", spark: [30, 32, 35, 38, 36, 42, 40] },
    { name: "Focus OS", category: "Productivity Engine", users: "2.15k active", latency: "18ms", accent: "#06B6D4", status: "bg-cyan-400", spark: [10, 25, 40, 55, 70, 85, 98] },
  ];

  return (
    <div className="min-h-screen text-zinc-100 overflow-x-hidden">
      <div className="pp-stage" aria-hidden />

      <div className="pp-content">
        {/* Header */}
        <header className="h-20 sticky top-0 z-50 flex items-center justify-between px-6 lg:px-16 border-b border-white/10 bg-black/30 backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl glass-pill flex items-center justify-center text-amber-300">
              <Terminal className="w-5 h-5" />
            </div>
            <span className="font-extrabold tracking-[0.2em] text-sm text-white">PROJECTPULSE</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/app/dashboard" className="hidden sm:inline text-xs font-semibold text-zinc-400 hover:text-white px-3 py-2">
              Explore the Command Center
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold text-black bg-gradient-to-r from-amber-500 to-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.35)]"
            >
              Start Monitoring <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* SCENE 1 — Hero */}
        <section className="px-6 lg:px-16 pt-16 pb-20 max-w-[1400px] mx-auto">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 glass-pill rounded-full px-3.5 py-1.5 text-xs font-semibold text-amber-200 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Developer Observability & Command Center
            </div>
            <h1 className="text-5xl sm:text-7xl font-light tracking-tight leading-[1.05] text-white mb-6">
              Everything you build.
              <br />
              <span className="text-zinc-500">One command center.</span>
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed mb-8">
              ProjectPulse unifies project health, active users, uptime, errors, and AI insights across all your production apps in one warm glass command environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/register"
                className="inline-flex justify-center items-center gap-2 rounded-2xl px-8 py-3.5 text-sm font-bold text-black bg-gradient-to-r from-amber-500 to-amber-400 shadow-[0_0_40px_rgba(245,158,11,0.4)]"
              >
                Start Monitoring <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/app/dashboard"
                className="inline-flex justify-center items-center gap-2 rounded-2xl px-8 py-3.5 text-sm font-semibold text-white glass-pill hover:bg-white/10"
              >
                Explore the Command Center
              </Link>
            </div>
          </div>

          {/* Floating product mockup — glass layers */}
          <div className="glass-workspace rounded-[2.5rem] p-5 sm:p-8">
            <div className="grid grid-cols-12 gap-5">
              {/* Large hero glass */}
              <div className="col-span-12 lg:col-span-7 glass-panel rounded-[2rem] p-8 min-h-[360px] flex flex-col justify-between relative overflow-hidden">
                <div
                  className="absolute -top-24 -right-16 w-72 h-72 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(245,158,11,0.35), rgba(225,29,72,0.12), transparent 70%)", filter: "blur(40px)" }}
                />
                <div className="relative z-10">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500 mb-3">Developer solution</p>
                  <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white leading-[1.1]">
                    Optimize
                    <br />
                    Your Metrics
                  </h2>
                  <Link href="/app/dashboard" className="inline-flex mt-6 rounded-full bg-white text-black text-xs font-bold px-5 py-2.5">
                    Start Now
                  </Link>
                </div>

                {/* Frosted metrics strip — THIS is the glass bar from the reference */}
                <div className="glass-overlay-bar relative z-10 mt-8 rounded-2xl px-4 py-4 flex items-center gap-1 overflow-x-auto">
                  <div className="px-4 border-r border-white/15 min-w-[5.5rem]">
                    <p className="text-2xl font-bold text-white">1,284</p>
                    <p className="text-[10px] font-semibold text-blue-300 mt-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Users
                    </p>
                  </div>
                  <div className="px-4 border-r border-white/15 min-w-[5.5rem]">
                    <p className="text-2xl font-bold text-white">99.98%</p>
                    <p className="text-[10px] font-semibold text-emerald-300 mt-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Uptime
                    </p>
                  </div>
                  <div className="px-4 border-r border-white/15 min-w-[5.5rem]">
                    <p className="text-2xl font-bold text-white">32ms</p>
                    <p className="text-[10px] font-semibold text-amber-200 mt-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Latency
                    </p>
                  </div>
                  <div className="px-4 min-w-[5rem]">
                    <p className="text-2xl font-bold text-white">0</p>
                    <p className="text-[10px] font-semibold text-rose-300 mt-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Incidents
                    </p>
                  </div>
                  <div className="ml-auto w-10 h-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center shrink-0">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Right stack */}
              <div className="col-span-12 lg:col-span-5 flex flex-col gap-5">
                <div className="glass-panel rounded-[2rem] p-6 flex-1 flex flex-col">
                  <p className="text-xs font-semibold text-zinc-300 flex items-center gap-2 mb-4">
                    Active Users right now <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  </p>
                  <svg viewBox="0 0 300 110" className="w-full h-28 overflow-visible">
                    <path d="M 0,80 Q 50,20 100,70 T 200,30 T 300,90" fill="none" stroke="#F59E0B" strokeWidth="3" />
                    <path d="M 0,100 Q 60,50 120,90 T 220,10 T 300,60" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeDasharray="4 4" />
                    <circle cx="220" cy="10" r="5" fill="#F59E0B" />
                    <g transform="translate(205,-20)">
                      <rect width="30" height="20" rx="10" fill="#000" />
                      <text x="15" y="13" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">50</text>
                    </g>
                  </svg>
                  <div className="flex justify-between text-[10px] text-zinc-500 font-semibold mt-1">
                    <span>Oct</span><span>Mar</span><span>Jul</span><span>Aug</span>
                  </div>
                </div>

                <div className="glass-panel rounded-[2rem] p-5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">Ecosystem health</p>
                    <p className="text-2xl font-bold text-white mt-1">
                      98.4 <span className="text-xs text-emerald-400 font-semibold">up 6%</span>
                    </p>
                  </div>
                  <Sparkline data={[20, 30, 25, 40, 35, 50, 60]} color="#10B981" width={90} height={32} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SCENE 2 — Attention + projects */}
        <section className="px-6 lg:px-16 pb-20 max-w-[1400px] mx-auto border-t border-white/10 pt-16">
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-zinc-500 mb-2">Live observability</p>
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-10">Monitored software ecosystem</h2>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-5 space-y-4">
              <div className="glass-panel rounded-3xl p-6 border-l-4 border-l-rose-500/80">
                <p className="text-[10px] font-bold uppercase tracking-widest text-rose-300 mb-2">Critical</p>
                <h3 className="text-base font-semibold text-white">ExamGuard high relay latency</h3>
                <p className="text-xs text-zinc-400 mt-1">WebRTC stream at 340ms — 34% above baseline.</p>
              </div>
              <div className="glass-panel rounded-3xl p-6 border-l-4 border-l-amber-500/80">
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-300 mb-2">Important</p>
                <h3 className="text-base font-semibold text-white">Sift extractor exceptions</h3>
                <p className="text-xs text-zinc-400 mt-1">Error rate up 18% on large PDF buffers.</p>
              </div>
              <div className="glass-panel rounded-3xl p-6 border-l-4 border-l-cyan-500/80">
                <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-300 mb-2">Opportunity</p>
                <h3 className="text-base font-semibold text-white">Focus OS session surge</h3>
                <p className="text-xs text-zinc-400 mt-1">Daily active sessions up 42% after v2.4.</p>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-7 glass-panel rounded-3xl p-6 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Active production apps</p>
              {projects.map((p) => (
                <div key={p.name} className="glass-panel rounded-2xl px-4 py-3 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-[10rem]">
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
                  <p className="text-xs font-mono text-zinc-400">{p.latency}</p>
                  <Sparkline data={p.spark} color={p.accent} width={80} height={24} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SCENE 3 — AI */}
        <section className="px-6 lg:px-16 pb-20 max-w-[1400px] mx-auto">
          <div className="glass-workspace rounded-[2.5rem] p-8 md:p-12">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-amber-400 mb-2">ProjectPulse AI</p>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-3">Your projects have something to tell you.</h2>
            <p className="text-xs text-zinc-400 max-w-xl mb-8">
              Data-grounded tools only — no invented metrics.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="glass-panel rounded-2xl p-5">
                <p className="text-[10px] uppercase text-zinc-500 font-semibold mb-2">You</p>
                <p className="text-sm text-white">&quot;What needs my attention today?&quot;</p>
              </div>
              <div className="glass-panel rounded-2xl p-5 border border-amber-500/25 bg-amber-500/5">
                <p className="text-[10px] uppercase text-amber-300 font-bold mb-2">AI</p>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  <strong className="text-white">ExamGuard</strong> latency 34% above baseline.
                  <br />
                  <strong className="text-white">Sift</strong> errors up 18% in 2 hours.
                  <br />
                  <strong className="text-white">ACA Academy</strong> no deploy in 8 days.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SCENE 4 — Footer */}
        <footer className="border-t border-white/10 py-16 px-6 text-center">
          <h2 className="text-4xl font-light text-white mb-3">100% Visibility.</h2>
          <p className="text-xs text-zinc-500 mb-6">Monitor your whole stack from one glass command center.</p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-2xl px-8 py-3.5 text-xs font-bold text-black bg-gradient-to-r from-amber-500 to-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.35)]"
          >
            Start Monitoring <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-[11px] text-zinc-600 mt-10">ProjectPulse — Girum Endalkachew</p>
        </footer>
      </div>
    </div>
  );
}
