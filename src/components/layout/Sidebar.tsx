"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Activity,
  AlertTriangle,
  ShieldAlert,
  Sparkles,
  Settings,
  Terminal,
  Users,
} from "lucide-react";

const items = [
  { name: "Command Center", href: "/app/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/app/projects", icon: FolderKanban },
  { name: "Analytics", href: "/app/analytics", icon: Activity },
  { name: "Users", href: "/app/users", icon: Users },
  { name: "Errors", href: "/app/dashboard", icon: AlertTriangle },
  { name: "Incidents", href: "/app/dashboard", icon: ShieldAlert },
  { name: "AI", href: "/app/dashboard", icon: Sparkles },
  { name: "Settings", href: "/app/dashboard", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[4.5rem] fixed left-0 top-0 bottom-0 z-40 m-3 rounded-[1.75rem] glass-workspace flex flex-col items-center py-5 justify-between">
      <Link href="/" className="w-11 h-11 rounded-2xl flex items-center justify-center text-amber-300 border border-amber-500/30 bg-amber-500/10">
        <Terminal className="w-5 h-5" />
      </Link>

      <nav className="flex flex-col gap-2">
        {items.map((item) => {
          const active = pathname === item.href || (item.href !== "/app/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              title={item.name}
              className={
                "w-11 h-11 rounded-2xl flex items-center justify-center transition-all " +
                (active
                  ? "bg-white/15 text-white border border-white/20 shadow-[0_0_24px_rgba(255,255,255,0.08)]"
                  : "text-zinc-500 hover:text-white hover:bg-white/5 border border-transparent")
              }
            >
              <Icon className="w-4.5 h-4.5 w-[18px] h-[18px]" />
            </Link>
          );
        })}
      </nav>

      <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" title="Systems operational" />
    </aside>
  );
}
