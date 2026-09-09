"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { UserSessionRecord } from "@/types/telemetry";
import { getUserSessionRecords } from "@/lib/telemetry-store";
import { Users, Clock, Zap, ShieldCheck } from "lucide-react";

export default function UsersPage() {
  const [users, setUsers] = useState<UserSessionRecord[]>([]);

  useEffect(() => {
    setUsers(getUserSessionRecords());
  }, []);

  return (
    <AppShell>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">User Telemetry & Retention</h1>
          <p className="text-xs text-gray-400 mt-1">Distinct user identities, session logs, and retention cohorts</p>
        </div>
      </div>

      {/* Retention Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel-2 rounded-3xl p-5 border border-white/10">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">7-Day Retention</p>
          <p className="text-3xl font-black text-emerald-400">68.4%</p>
          <span className="text-[10px] text-gray-400 font-medium">Returning user baseline</span>
        </div>

        <div className="glass-panel-2 rounded-3xl p-5 border border-white/10">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Avg Sessions / User</p>
          <p className="text-3xl font-black text-indigo-300">14.2</p>
          <span className="text-[10px] text-gray-400 font-medium">Monthly session count</span>
        </div>

        <div className="glass-panel-2 rounded-3xl p-5 border border-white/10">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Active User Pool</p>
          <p className="text-3xl font-black text-cyan-300">4,688</p>
          <span className="text-[10px] text-gray-400 font-medium">Distinct authenticated IDs</span>
        </div>
      </div>

      {/* Active Users Table (Matching Prototype Screen 10) */}
      <div className="glass-panel-2 rounded-3xl p-6 border border-white/10">
        <h2 className="text-base font-bold text-white mb-1">Live Active User Session Stream</h2>
        <p className="text-xs text-gray-400 mb-6">Real-time user pulse records across all connected applications</p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                <th className="pb-3">User Identity</th>
                <th className="pb-3">Favorite App</th>
                <th className="pb-3 text-right">Total Sessions</th>
                <th className="pb-3 text-right">Last Active</th>
                <th className="pb-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {users.map((u) => (
                <tr key={u.distinctId} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-white font-bold text-xs">
                        {u.avatar}
                      </div>
                      <div>
                        <p className="font-bold text-white">{u.name}</p>
                        <p className="text-[10px] text-gray-400 font-mono">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="font-semibold text-indigo-300">{u.favoriteProject}</span>
                  </td>
                  <td className="py-3 text-right font-bold text-white">{u.totalSessions}</td>
                  <td className="py-3 text-right text-gray-400 font-mono">{u.lastActive}</td>
                  <td className="py-3 text-right">
                    <span
                      className={"text-[10px] font-bold px-2 py-0.5 rounded-full border " + (
                        u.status === "active"
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                          : u.status === "idle"
                          ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                          : "bg-gray-500/10 border-gray-500/30 text-gray-400"
                      )}
                    >
                      ? {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}