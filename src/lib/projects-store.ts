import { Project, CreateProjectInput, AttentionItem, ActivityItem } from "@/types/project";

let projectsStore: Project[] = [
  {
    id: "proj_aca_1",
    name: "ACA Academy",
    slug: "aca-academy",
    description: "Educational learning platform and student management system.",
    websiteUrl: "https://aca.academy",
    repositoryUrl: "https://github.com/girum-endalkachew/aca-academy",
    environment: "production",
    status: "operational",
    healthScore: 98,
    uptimePercentage: 99.98,
    latencyMs: 32,
    activeUsers: 1284,
    errorRate: 0.01,
    accentColor: "#3B82F6",
    icon: "GraduationCap",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"],
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "proj_sift_2",
    name: "Sift",
    slug: "sift",
    description: "AI-powered document intelligence and content filtering platform.",
    websiteUrl: "https://sift.dev",
    repositoryUrl: "https://github.com/girum-endalkachew/sift",
    environment: "production",
    status: "degraded",
    healthScore: 84,
    uptimePercentage: 98.42,
    latencyMs: 184,
    activeUsers: 842,
    errorRate: 1.42,
    accentColor: "#EC4899",
    icon: "Filter",
    techStack: ["Python", "FastAPI", "React", "Redis"],
    createdAt: new Date(Date.now() - 45 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "proj_examguard_3",
    name: "ExamGuard",
    slug: "examguard",
    description: "Proctoring and exam integrity monitoring service.",
    websiteUrl: "https://examguard.io",
    repositoryUrl: "https://github.com/girum-endalkachew/examguard",
    environment: "production",
    status: "warning",
    healthScore: 76,
    uptimePercentage: 97.10,
    latencyMs: 340,
    activeUsers: 412,
    errorRate: 2.15,
    accentColor: "#8B5CF6",
    icon: "ShieldCheck",
    techStack: ["Node.js", "WebRTC", "PostgreSQL", "Docker"],
    createdAt: new Date(Date.now() - 60 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "proj_focusos_4",
    name: "Focus OS",
    slug: "focus-os",
    description: "Personal productivity and deep-work operational engine.",
    websiteUrl: "https://focusos.app",
    repositoryUrl: "https://github.com/girum-endalkachew/focus-os",
    environment: "production",
    status: "operational",
    healthScore: 100,
    uptimePercentage: 100.0,
    latencyMs: 18,
    activeUsers: 2150,
    errorRate: 0.00,
    accentColor: "#06B6D4",
    icon: "Zap",
    techStack: ["Tauri", "Rust", "React", "SQLite"],
    createdAt: new Date(Date.now() - 90 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const attentionItemsStore: AttentionItem[] = [
  {
    id: "att_1",
    projectId: "proj_examguard_3",
    projectName: "ExamGuard",
    severity: "CRITICAL",
    title: "WebRTC Proctoring Relay High Latency",
    description: "API latency is 340ms (34% above the 120ms baseline). Impacting live exam streams.",
    timestamp: "12 mins ago",
    metric: "340ms latency",
  },
  {
    id: "att_2",
    projectId: "proj_sift_2",
    projectName: "Sift",
    severity: "IMPORTANT",
    title: "Document Parser Exception Spikes",
    description: "TypeError: Cannot read property 'metadata' of undefined occurred 142 times in 2 hours.",
    timestamp: "45 mins ago",
    metric: "+18% error rate",
  },
  {
    id: "att_3",
    projectId: "proj_aca_1",
    projectName: "ACA Academy",
    severity: "RECOMMENDED",
    title: "Stale Production Deployment",
    description: "No production deployment detected in 8 days. 4 commits pending on main branch.",
    timestamp: "2 hours ago",
    metric: "8d since build",
  },
  {
    id: "att_4",
    projectId: "proj_focusos_4",
    projectName: "Focus OS",
    severity: "OPPORTUNITY",
    title: "Active Session Growth Acceleration",
    description: "Daily active users increased by 42% following v2.4 desktop release.",
    timestamp: "5 hours ago",
    metric: "2,150 active",
  },
];

const activityStore: ActivityItem[] = [
  {
    id: "act_1",
    projectId: "proj_focusos_4",
    projectName: "Focus OS",
    accentColor: "#06B6D4",
    type: "deployment",
    title: "Deployed v2.4.1 Production Build",
    detail: "Commit #8a1f4e � Upgraded Rust desktop sync engine & sqlite connection pool.",
    timestamp: "10 mins ago",
  },
  {
    id: "act_2",
    projectId: "proj_sift_2",
    projectName: "Sift",
    accentColor: "#EC4899",
    type: "error",
    title: "New High-Frequency Exception",
    detail: "FastAPI endpoint /api/v1/extract returned HTTP 500 on large PDF buffers.",
    timestamp: "32 mins ago",
  },
  {
    id: "act_3",
    projectId: "proj_examguard_3",
    projectName: "ExamGuard",
    accentColor: "#8B5CF6",
    type: "incident",
    title: "Incident Opened: High Stream Latency",
    detail: "Automated alert triggered. Investigating US-East WebRTC relay node overhead.",
    timestamp: "1 hour ago",
  },
  {
    id: "act_4",
    projectId: "proj_aca_1",
    projectName: "ACA Academy",
    accentColor: "#3B82F6",
    type: "health_check",
    title: "SSL Certificate Auto-Verified",
    detail: "256-bit TLS certificate valid for 88 days. HTTP GET /api/health 200 OK (32ms).",
    timestamp: "3 hours ago",
  },
];

export function getProjects(): Project[] {
  return projectsStore;
}

export function getProjectById(id: string): Project | undefined {
  return projectsStore.find((p) => p.id === id || p.slug === id);
}

export function getAttentionItems(): AttentionItem[] {
  return attentionItemsStore;
}

export function getActivityFeed(): ActivityItem[] {
  return activityStore;
}

export function createProject(input: CreateProjectInput): Project {
  const slug = input.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const newProject: Project = {
    id: "proj_" + Date.now(),
    name: input.name,
    slug,
    description: input.description,
    websiteUrl: input.websiteUrl,
    repositoryUrl: input.repositoryUrl,
    environment: input.environment,
    status: "operational",
    healthScore: 100,
    uptimePercentage: 100.0,
    latencyMs: 24,
    activeUsers: 1,
    errorRate: 0.0,
    accentColor: input.accentColor || "#6366F1",
    icon: "Layers",
    techStack: input.techStack.length ? input.techStack : ["Next.js", "TypeScript"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  projectsStore = [newProject, ...projectsStore];
  return newProject;
}

export function updateProject(id: string, updates: Partial<Project>): Project | null {
  const index = projectsStore.findIndex((p) => p.id === id);
  if (index === -1) return null;

  projectsStore[index] = {
    ...projectsStore[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  return projectsStore[index];
}

export function deleteProject(id: string): boolean {
  const initialLength = projectsStore.length;
  projectsStore = projectsStore.filter((p) => p.id !== id);
  return projectsStore.length < initialLength;
}