import { NextResponse } from "next/server";
import { getProjects, getAttentionItems, getActivityFeed } from "@/lib/projects-store";

export async function GET() {
  const projects = getProjects();
  const attentionItems = getAttentionItems();
  const activities = getActivityFeed();

  const totalUsers = projects.reduce((acc, p) => acc + p.activeUsers, 0);
  const avgUptime = projects.length
    ? (projects.reduce((acc, p) => acc + p.uptimePercentage, 0) / projects.length).toFixed(2)
    : "100.00";
  const avgLatency = projects.length
    ? Math.round(projects.reduce((acc, p) => acc + p.latencyMs, 0) / projects.length)
    : 0;

  return NextResponse.json({
    success: true,
    data: {
      metrics: {
        totalProjects: projects.length,
        totalActiveUsers: totalUsers,
        averageUptime: avgUptime,
        averageLatencyMs: avgLatency,
        openIncidentsCount: attentionItems.filter((a) => a.severity === "CRITICAL").length,
      },
      projects,
      attentionItems,
      activities,
    },
  });
}