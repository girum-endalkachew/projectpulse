const fs = require('fs');
const path = require('path');

function ensureDir(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

const files = {
  "src/app/globals.css": `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg-dark: #08080a;
}

body {
  background-color: #08080a;
  color: #f3f4f6;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  overflow-x: hidden;
  background-image: 
    radial-gradient(circle at 50% 20%, rgba(120, 50, 35, 0.12), transparent 50%),
    radial-gradient(circle at 85% 60%, rgba(45, 55, 75, 0.15), transparent 40%);
  background-attachment: fixed;
}

.glass-container {
  background: rgba(18, 18, 22, 0.65);
  backdrop-filter: blur(30px) saturate(180%);
  -webkit-backdrop-filter: blur(30px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.6);
}

.glass-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 20px 40px rgba(0, 0, 0, 0.3);
}

.glass-pill {
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.glass-overlay {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(35px);
  -webkit-backdrop-filter: blur(35px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
}

::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.15); border-radius: 9999px; }
`,

  "src/components/layout/Sidebar.tsx": `"use client";
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
}`,

  "src/components/layout/Topbar.tsx": `"use client";
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
}`,

  "src/components/layout/AppShell.tsx": `"use client";

import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#08080a] text-gray-100 flex relative selection:bg-white/20 selection:text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}`
};

for (const [filePath, content] of Object.entries(files)) {
  ensureDir(filePath);
  fs.writeFileSync(filePath, content.trim(), 'utf8');
  console.log(`Successfully generated: ${filePath}`);
}

console.log('Clean fix script completed!');
