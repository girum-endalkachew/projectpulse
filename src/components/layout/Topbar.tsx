"use client";
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
}