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
  errorRate: number;
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

export type AttentionSeverity = "CRITICAL" | "IMPORTANT" | "RECOMMENDED" | "OPPORTUNITY";

export interface AttentionItem {
  id: string;
  projectId: string;
  projectName: string;
  severity: AttentionSeverity;
  title: string;
  description: string;
  timestamp: string;
  metric?: string;
}

export interface ActivityItem {
  id: string;
  projectId: string;
  projectName: string;
  accentColor: string;
  type: "deployment" | "error" | "incident" | "health_check" | "feature";
  title: string;
  detail: string;
  timestamp: string;
}