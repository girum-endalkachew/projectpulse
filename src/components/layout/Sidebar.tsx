"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, Activity, ShieldAlert, AlertTriangle, Terminal, Settings, Sparkles } from "lucide-react";

const navigation = [
  { name: "Command Center", href: "/app/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/app/projects", icon: FolderKanban },
  { name: "Design System", href: "/app/design-system", icon: Sparkles },
  { name: "Health & Uptime", href: "/app/dashboard#health", icon: Activity },
  { name: "Errors", href: "/app/dashboard#errors", icon: AlertTriangle },
  { name: "Incidents", href: "/app/dashboard#incidents", icon: ShieldAlert },
  { name: "Settings", href: "/app/dashboard#settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 glass-panel-2 border-r border-white/10 flex flex-col justify-between p-5 min-h-screen fixed left-0 top-0 z-30">
      <div>
        <div className="flex items-center gap-3 px-2 py-3 mb-8">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            <Terminal className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h1 className="font-bold tracking-tight text-white text-lg">PROJECTPULSE</h1>
            <p className="text-[10px] text-gray-400 tracking-wider uppercase">Command Center</p>
          </div>
        </div>

        <nav className="space-y-1.5">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={"flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 " + (
                  isActive
                    ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.15)]"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                )}
              >
                <Icon className={"w-4 h-4 " + (isActive ? "text-indigo-400" : "text-gray-400")} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="glass-panel-1 rounded-2xl p-3.5 border border-white/5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-gray-300">Platform Status</span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </div>
        <p className="text-[11px] text-gray-400">All systems operational</p>
      </div>
    </aside>
  );
}