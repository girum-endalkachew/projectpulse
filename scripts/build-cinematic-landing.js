const fs = require('fs');
const path = require('path');

function ensureDir(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

const files = {
  // 1. BULLETPROOF TAILWIND V4 + GLASS CSS
  "src/app/globals.css": `@import "tailwindcss";

*, ::after, ::before {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  background-color: #08080a;
  color: #f4f4f5;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  overflow-x: hidden;
}

/* Glass Architecture Primitives */
.glass-workspace {
  background: rgba(14, 14, 18, 0.75);
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  border-right: 1px solid rgba(255, 255, 255, 0.03);
  border-bottom: 1px solid rgba(255, 255, 255, 0.02);
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.8);
}

.glass-panel {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-left: 1px solid rgba(255, 255, 255, 0.05);
  border-right: 1px solid rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid rgba(255, 255, 255, 0.01);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 20px 50px rgba(0, 0, 0, 0.4);
}

.glass-overlay-bar {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(40px) saturate(200%);
  -webkit-backdrop-filter: blur(40px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
}

.glass-pill {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.15); border-radius: 9999px; }
`,

  // 2. CINEMATIC LANDING PAGE (SCENES 1-4)
  "src/app/page.tsx": `"use client";

import Link from "next/link";
import {
  Terminal,
  ArrowRight,
  Sparkles,
  Activity,
  ShieldAlert,
  AlertTriangle,
  TrendingUp,
  Zap,
  Globe,
  GitBranch,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  MoreHorizontal
} from "lucide-react";
import { Sparkline } from "@/components/ui/Sparkline";

export default function LandingPage() {
  const projects = [
    {
      id: "proj_aca_1",
      name: "ACA Academy",
      category: "Education Platform",
      status: "Operational",
      statusColor: "bg-blue-400",
      users: "1.28k active",
      latency: "32ms",
      sparkline: [20, 25, 30, 28, 45, 50, 65],
      accent: "#3B82F6",
    },
    {
      id: "proj_sift_2",
      name: "Sift Intelligence",
      category: "AI Content Filter",
      status: "Degraded",
      statusColor: "bg-pink-500",
      users: "842 active",
      latency: "184ms",
      sparkline: [60, 55, 40, 30, 25, 18, 12],
      accent: "#EC4899",
    },
    {
      id: "proj_examguard_3",
      name: "ExamGuard Proctoring",
      category: "Exam Integrity Engine",
      status: "Warning",
      statusColor: "bg-purple-400",
      users: "412 active",
      latency: "340ms",
      sparkline: [30, 32, 35, 38, 36, 42, 40],
      accent: "#8B5CF6",
    },
    {
      id: "proj_focusos_4",
      name: "Focus OS",
      category: "Productivity Engine",
      status: "Operational",
      statusColor: "bg-cyan-400",
      users: "2.15k active",
      latency: "18ms",
      sparkline: [10, 25, 40, 55, 70, 85, 98],
      accent: "#06B6D4",
    },
  ];

  return (
    <div className="min-h-screen bg-[#08080a] text-gray-100 flex flex-col relative selection:bg-amber-500/30 selection:text-amber-200 overflow-hidden">
      
      {/* Background Warm Studio Lighting (Reference Environment) */}
      <div 
        className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] pointer-events-none rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgba(180, 83, 9, 0.12) 0%, rgba(159, 18, 57, 0.08) 45%, transparent 70%)",
          filter: "blur(120px)"
        }}
      ></div>

      <div 
        className="fixed bottom-[-10%] right-[-10%] w-[800px] h-[500px] pointer-events-none rounded-full"
        style={{
          background: "radial-gradient(circle at center, rgba(30, 58, 138, 0.12) 0%, transparent 60%)",
          filter: "blur(140px)"
        }}
      ></div>

      {/* Top Header */}
      <header className="h-24 border-b border-white/10 backdrop-blur-2xl bg-black/40 sticky top-0 z-50 flex items-center justify-between px-6 lg:px-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300 shadow-md">
            <Terminal className="w-5 h-5" />
          </div>
          <span className="font-extrabold tracking-widest text-white text-base">PROJECTPULSE</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider text-gray-400 uppercase">
          <a href="#ecosystem" className="hover:text-white transition-colors">Ecosystem</a>
          <a href="#attention" className="hover:text-white transition-colors">Attention Engine</a>
          <a href="#copilot" className="hover:text-white transition-colors">AI Intelligence</a>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/app/dashboard" className="text-xs font-semibold text-gray-300 hover:text-white px-3 py-2 transition-colors">
            Explore the Command Center
          </Link>
          <Link
            href="/register"
            className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black text-xs font-bold px-5 py-2.5 rounded-xl shadow-[0_0_25px_rgba(245,158,11,0.25)] transition-all"
          >
            Start Monitoring <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* SCENE 1: HERO WORKSPACE */}
      <section className="pt-16 pb-24 px-6 lg:px-16 max-w-[1400px] mx-auto relative z-10">
        
        {/* Editorial Headline */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-amber-300 text-xs font-semibold mb-6 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Developer Observability & Command Center
          </div>

          <h1 className="text-5xl sm:text-7xl font-light tracking-tight text-white leading-[1.05] mb-6">
            Everything you build. <br />
            <span className="text-gray-400 font-normal">One command center.</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-400 font-normal leading-relaxed max-w-xl mb-8">
            ProjectPulse unifies project health, active users, uptime metrics, error tracking, and AI insights across all your production software applications into a single glass environment.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/register"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black text-sm font-bold px-8 py-3.5 rounded-2xl shadow-[0_0_35px_rgba(245,158,11,0.3)] transition-all"
            >
              Start Monitoring <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/app/dashboard"
              className="w-full sm:w-auto flex items-center justify-center gap-2 glass-pill hover:bg-white/10 text-white text-sm font-semibold px-8 py-3.5 rounded-2xl transition-all"
            >
              Explore the Command Center
            </Link>
          </div>
        </div>

        {/* Hero Product Visual (Layered Frosted Glass Composition matching visual reference) */}
        <div className="glass-workspace rounded-[2.5rem] p-6 lg:p-8 relative overflow-hidden">
          <div className="grid grid-cols-12 gap-6">
            
            {/* Hero Main Panel (Span 7) */}
            <div className="col-span-12 lg:col-span-7 glass-panel rounded-[2rem] p-8 relative overflow-hidden flex flex-col justify-between min-h-[380px]">
              <div 
                className="absolute top-[-30%] right-[-10%] w-[300px] h-[350px] rounded-full blur-[80px] pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, rgba(225, 29, 72, 0.1) 50%, transparent 100%)" }}
              ></div>

              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Developer Solution</span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                  Optimize <br /> Your Metrics
                </h2>
                <div className="mt-6">
                  <Link href="/app/dashboard" className="inline-flex items-center gap-2 bg-white text-black text-xs font-bold px-5 py-2.5 rounded-full hover:bg-gray-200 transition-colors shadow-lg">
                    Start Now
                  </Link>
                </div>
              </div>

              {/* Overlapping Translucent Frosted Glass Strip */}
              <div className="glass-overlay-bar rounded-2xl p-4 mt-8 relative z-10 flex items-center justify-between gap-2 overflow-x-auto">
                <div className="px-3 border-r border-white/10">
                  <p className="text-xl font-bold text-white">1,284</p>
                  <p className="text-[10px] text-blue-400 font-semibold flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> Users
                  </p>
                </div>
                <div className="px-3 border-r border-white/10">
                  <p className="text-xl font-bold text-white">99.98%</p>
                  <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Uptime
                  </p>
                </div>
                <div className="px-3 border-r border-white/10">
                  <p className="text-xl font-bold text-white">32ms</p>
                  <p className="text-[10px] text-indigo-300 font-semibold flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-300"></span> Latency
                  </p>
                </div>
                <div className="px-3">
                  <p className="text-xl font-bold text-white">0</p>
                  <p className="text-[10px] text-amber-400 font-semibold flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> Incidents
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white shrink-0 ml-2">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Hero Secondary Curve Panel (Span 5) */}
            <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
              <div className="glass-panel rounded-[2rem] p-6 relative overflow-hidden flex-1 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-gray-300 flex items-center gap-2">
                    Active Users right now <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  </h3>
                </div>

                <div className="relative my-3">
                  <svg viewBox="0 0 300 110" className="w-full h-24 overflow-visible">
                    <path d="M 0,80 Q 50,20 100,70 T 200,30 T 300,90" fill="none" stroke="#F59E0B" strokeWidth="3" />
                    <path d="M 0,100 Q 60,50 120,90 T 220,10 T 300,60" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeDasharray="4 4" />
                    <circle cx="220" cy="10" r="5" fill="#F59E0B" />
                    <g transform="translate(205, -20)">
                      <rect width="30" height="20" rx="10" fill="#000" />
                      <text x="15" y="13" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">50</text>
                    </g>
                  </svg>
                  <div className="flex justify-between text-[10px] text-gray-500 font-semibold mt-1">
                    <span>Oct</span>
                    <span>Mar</span>
                    <span>Jul</span>
                    <span>Aug</span>
                  </div>
                </div>
              </div>

              <div className="glass-panel rounded-[2rem] p-5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-semibold">Overall Ecosystem Health</p>
                  <p className="text-2xl font-extrabold text-white mt-0.5">98.4 <span className="text-xs font-semibold text-emerald-400">? 6%</span></p>
                </div>
                <Sparkline data={[20, 30, 25, 40, 35, 50, 60]} color="#10B981" width={90} height={32} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SCENE 2: LIVING ECOSYSTEM & ATTENTION ENGINE */}
      <section id="ecosystem" className="py-20 px-6 lg:px-16 max-w-[1400px] mx-auto border-t border-white/10">
        <div className="mb-12">
          <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase block mb-2">Live Observability</span>
          <h2 className="text-3xl sm:text-4xl font-light text-white">Monitored Software Ecosystem</h2>
        </div>

        <div className="grid grid-cols-12 gap-8">
          
          {/* Left: Asymmetric Attention Stack (Span 5) */}
          <div id="attention" className="col-span-12 lg:col-span-5 space-y-4">
            <div className="glass-panel rounded-3xl p-6 border-l-4 border-l-rose-500">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Critical Alert</span>
                <span className="text-[10px] text-gray-500">12 mins ago</span>
              </div>
              <h3 className="text-base font-bold text-white mb-1">ExamGuard High Relay Latency</h3>
              <p className="text-xs text-gray-400 leading-relaxed">WebRTC proctoring stream exceeding 340ms baseline on US-East node.</p>
            </div>

            <div className="glass-panel rounded-3xl p-6 border-l-4 border-l-amber-500">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Important Warning</span>
                <span className="text-[10px] text-gray-500">45 mins ago</span>
              </div>
              <h3 className="text-base font-bold text-white mb-1">Sift Document Extractor Exception</h3>
              <p className="text-xs text-gray-400 leading-relaxed">TypeError occurrences increased +18% on large PDF buffer parsing.</p>
            </div>

            <div className="glass-panel rounded-3xl p-6 border-l-4 border-l-cyan-500">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Growth Opportunity</span>
                <span className="text-[10px] text-gray-500">2 hours ago</span>
              </div>
              <h3 className="text-base font-bold text-white mb-1">Focus OS Session Surge</h3>
              <p className="text-xs text-gray-400 leading-relaxed">Daily active sessions up +42% following v2.4 desktop release.</p>
            </div>
          </div>

          {/* Right: Project Rows (Span 7) */}
          <div className="col-span-12 lg:col-span-7 glass-panel rounded-3xl p-6 space-y-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Active Production Applications</p>

            {projects.map((proj) => (
              <div key={proj.id} className="glass-panel rounded-2xl p-4 flex items-center justify-between gap-4 hover:bg-white/[0.04] transition-all">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-xs border border-white/10"
                    style={{ backgroundColor: `${proj.accent}20` }}
                  >
                    <span style={{ color: proj.accent }}>{proj.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{proj.name}</h4>
                    <p className="text-[10px] text-gray-400">{proj.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${proj.statusColor}`}></span>
                  <span className="text-xs text-gray-300 font-semibold">{proj.users}</span>
                </div>

                <div className="text-xs text-gray-300 font-mono font-medium">
                  {proj.latency}
                </div>

                <Sparkline data={proj.sparkline} color={proj.accent} width={80} height={24} />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SCENE 3: AI COPILOT INTELLIGENCE */}
      <section id="copilot" className="py-20 px-6 lg:px-16 max-w-[1400px] mx-auto border-t border-white/10">
        <div className="glass-workspace rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
          <div className="max-w-2xl mb-8">
            <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase block mb-2">ProjectPulse AI</span>
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-4">
              Your projects have something to tell you.
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              The AI Copilot executes deterministic function tools directly against PostgreSQL telemetry without hallucinating fake numbers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel rounded-2xl p-5 border border-white/10">
              <p className="text-[10px] text-gray-400 uppercase font-semibold mb-2">User Query</p>
              <p className="text-xs font-semibold text-white">&quot;What needs my attention today across all apps?&quot;</p>
            </div>

            <div className="glass-panel rounded-2xl p-5 border border-amber-500/30 bg-amber-500/5">
              <p className="text-[10px] text-amber-400 uppercase font-bold mb-2">AI Response (Data-Grounded)</p>
              <p className="text-xs text-gray-300 leading-relaxed">
                1. <strong className="text-white">ExamGuard</strong> API latency is 34% above baseline (340ms). <br />
                2. <strong className="text-white">Sift</strong> error rate increased +18% in the last 2 hours. <br />
                3. <strong className="text-white">ACA Academy</strong> has no production build in 8 days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SCENE 4: TERMINAL FOOTER */}
      <footer className="mt-auto border-t border-white/10 py-16 px-6 lg:px-16 text-center relative z-10">
        <div className="max-w-xl mx-auto space-y-6">
          <h2 className="text-4xl font-light text-white tracking-tight">100% Visibility.</h2>
          <p className="text-xs text-gray-400">Ready to monitor your entire software ecosystem from one command center?</p>

          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black text-xs font-bold px-8 py-3.5 rounded-2xl shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all"
          >
            Start Monitoring <ArrowRight className="w-4 h-4" />
          </Link>

          <p className="text-[11px] text-gray-500 pt-8 border-t border-white/5">
            ProjectPulse Command Center — Engineered by Girum Endalkachew
          </p>
        </div>
      </footer>

    </div>
  );
}
`
};

for (const [filePath, content] of Object.entries(files)) {
  ensureDir(filePath);
  fs.writeFileSync(filePath, content.trim(), 'utf8');
  console.log(`Successfully generated: ${filePath}`);
}

console.log('Cinematic Landing Page Build Script Complete!');
