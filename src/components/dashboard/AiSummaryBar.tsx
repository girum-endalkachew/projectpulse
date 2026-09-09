"use client";

import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export function AiSummaryBar() {
  return (
    <div className="glass-panel-2 rounded-3xl p-5 border border-indigo-500/30 bg-gradient-to-r from-indigo-900/20 via-purple-900/10 to-transparent flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 shadow-[0_0_30px_rgba(99,102,241,0.1)]">
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-2xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-indigo-300 shrink-0 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
          <Sparkles className="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-white">PROJECTPULSE AI SUMMARY</span>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Data Grounded
            </span>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed max-w-3xl">
            Overall ecosystem health is <span className="text-emerald-400 font-bold">98.2%</span>. <span className="text-white font-semibold">ExamGuard</span> API latency requires attention (340ms). <span className="text-cyan-300 font-semibold">Focus OS</span> daily active users surged +42% post-release.
          </p>
        </div>
      </div>

      <Link
        href="/app/dashboard#copilot"
        className="self-start md:self-center shrink-0 flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-white/10 transition-all"
      >
        Ask AI Copilot <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}