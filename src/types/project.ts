export type ProjectEnvironment = "production" | "staging" | "development";
export type ProjectStatus = "operational" | "degraded" | "warning" | "down" | "unknown";

export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  websiteUrl: string;
  repositoryUrl: string;
  environment: ProjectEnvironment;
  status: ProjectStatus;
  healthScore: number;
  uptimePercentage: number;
  latencyMs: number;
  activeUsers: number;
  accentColor: string;
  icon: string;
  techStack: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectInput {
  name: string;
  description: string;
  websiteUrl: string;
  repositoryUrl: string;
  environment: ProjectEnvironment;
  accentColor: string;
  techStack: string[];
}