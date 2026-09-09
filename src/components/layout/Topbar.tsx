"use client";

import { Bell, Search, Plus } from "lucide-react";

interface TopbarProps {
  onOpenCreateModal?: () => void;
}

export function Topbar({ onOpenCreateModal }: TopbarProps) {
  return (
    <header className="h-16 glass-panel-1 border-b border-white/10 sticky top-0 z-20 flex items-center justify-between px-8 ml-64">
      <div className="relative w-80">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search projects, telemetry, errors... (Ctrl+K)"
          className="w-full glass-input pl-10 pr-4 py-1.5 rounded-xl text-xs placeholder:text-gray-500"
        />
      </div>

      <div className="flex items-center gap-4">
        {onOpenCreateModal && (
          <button
            onClick={onOpenCreateModal}
            className="flex items-center gap-2 bg-indigo-600/80 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-[0_0_20px_rgba(99,102,241,0.25)] border border-indigo-400/30"
          >
            <Plus className="w-3.5 h-3.5" />
            New Project
          </button>
        )}

        <button className="p-2 rounded-xl glass-panel-1 hover:bg-white/[0.08] text-gray-400 hover:text-white transition-all relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500"></span>
        </button>

        <div className="flex items-center gap-3 pl-3 border-l border-white/10">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-lg">
            GE
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-semibold text-white">Girum Endalkachew</p>
            <p className="text-[10px] text-gray-400">girum-endalkachew</p>
          </div>
        </div>
      </div>
    </header>
  );
}