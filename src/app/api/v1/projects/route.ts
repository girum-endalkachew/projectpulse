import { NextResponse } from "next/server";
import { getProjects, createProject } from "@/lib/projects-store";

export async function GET() {
  const projects = getProjects();
  return NextResponse.json({ success: true, data: projects });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name) {
      return NextResponse.json({ success: false, error: "Project name is required" }, { status: 400 });
    }
    const project = createProject(body);
    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid request payload" }, { status: 400 });
  }
}