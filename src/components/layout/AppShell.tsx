"use client";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#030303] text-gray-100 flex relative selection:bg-white/20 selection:text-white">
      {/* Cinematic Studio Lighting */}
      <div className="fixed top-[-20%] left-[-10%] w-[60vw] h-[60vh] bg-rose-900/10 rounded-full blur-[180px] pointer-events-none mix-blend-screen"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[60vw] h-[60vh] bg-slate-800/20 rounded-full blur-[180px] pointer-events-none mix-blend-screen"></div>

      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 z-10">
        <Topbar />
        <main className="ml-64 p-10 flex-1 lg:px-16 lg:py-12">{children}</main>
      </div>
    </div>
  );
}