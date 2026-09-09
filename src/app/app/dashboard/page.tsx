"use client";

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