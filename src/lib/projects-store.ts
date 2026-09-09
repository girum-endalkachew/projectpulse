import { Project, CreateProjectInput } from "@/types/project";

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
    accentColor: "#06B6D4",
    icon: "Zap",
    techStack: ["Tauri", "Rust", "React", "SQLite"],
    createdAt: new Date(Date.now() - 90 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function getProjects(): Project[] {
  return projectsStore;
}

export function getProjectById(id: string): Project | undefined {
  return projectsStore.find((p) => p.id === id || p.slug === id);
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