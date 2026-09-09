"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, Activity, AlertTriangle, ShieldAlert, Sparkles, Settings, Terminal, Bell } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const items = [
    { name: "Command Center", href: "/app/dashboard", icon: LayoutDashboard },
    { name: "Projects", href: "/app/projects", icon: FolderKanban },
    { name: "Analytics", href: "/app/analytics", icon: Activity },
    { name: "Errors", href: "/app/dashboard#errors", icon: AlertTriangle },
    { name: "Incidents", href: "/app/dashboard#incidents", icon: ShieldAlert },
    { name: "AI Copilot", href: "/app/dashboard#copilot", icon: Sparkles },
  ];

  return (
    <aside className="w-20 glass-container border-r border-white/10 flex flex-col justify-between items-center py-6 h-screen fixed left-0 top-0 z-40 my-auto rounded-r-3xl">
      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-purple-600/30 border border-white/20 flex items-center justify-center text-white shadow-lg">
        <Terminal className="w-5 h-5 text-indigo-300" />
      </div>

      <nav className="flex flex-col gap-4">
        {items.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              title={item.name}
              className={"w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 " + (
                isActive
                  ? "bg-white/15 text-white border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className="w-5 h-5" />
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-4 items-center">
        <button className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-amber-400 absolute top-2 right-2 animate-pulse"></span>
        </button>
        <button className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-colors">
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}