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
