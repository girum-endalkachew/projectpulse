"use client";

import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-zinc-100 overflow-x-hidden">
      <div className="pp-stage" aria-hidden />
      <div className="pp-content min-h-screen flex">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Topbar />
          <main className="pl-24 pr-6 pb-10 pt-2 lg:pr-10 flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
