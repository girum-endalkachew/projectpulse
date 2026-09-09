"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { CreateProjectModal } from "@/components/projects/CreateProjectModal";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B0C10] text-gray-100 flex relative selection:bg-indigo-500 selection:text-white">
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onOpenCreateModal={() => setIsModalOpen(true)} />
        <main className="ml-64 p-8 flex-1">{children}</main>
      </div>

      <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}