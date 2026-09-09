"use client";

import { RouteAnalytics } from "@/types/telemetry";

interface TableProps {
  routes: RouteAnalytics[];
}

export function TopRoutesTable({ routes }: TableProps) {
  return (
    <div className="glass-panel-2 rounded-3xl p-6 border border-white/10">
      <h3 className="text-base font-bold text-white mb-1">Top Application Routes</h3>
      <p className="text-xs text-gray-400 mb-6">Route traffic distribution, average latency, and exception rates</p>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              <th className="pb-3">Route Endpoint</th>
              <th className="pb-3 text-right">Total Hits</th>
              <th className="pb-3 text-right">Avg Latency</th>
              <th className="pb-3 text-right">Error Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs">
            {routes.map((r) => (
              <tr key={r.route} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3 font-mono text-indigo-300 font-semibold">{r.route}</td>
                <td className="py-3 text-right font-bold text-white">{r.hits.toLocaleString()}</td>
                <td className="py-3 text-right font-medium text-gray-300">{r.avgLatencyMs}ms</td>
                <td className="py-3 text-right">
                  <span
                    className={"font-bold text-[11px] " + (
                      r.errorPercentage > 1.0 ? "text-rose-400" : "text-emerald-400"
                    )}
                  >
                    {r.errorPercentage}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}