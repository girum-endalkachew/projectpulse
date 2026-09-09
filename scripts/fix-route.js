const fs = require('fs');
const path = require('path');

const routeContent = `import { NextResponse } from "next/server";
import { getProjectById, updateProject, deleteProject } from "@/lib/projects-store";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) {
    return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: project });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = updateProject(id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update project" }, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const deleted = deleteProject(id);
  if (!deleted) {
    return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, message: "Project deleted successfully" });
}
`;

fs.writeFileSync(path.join(__dirname, '../src/app/api/v1/projects/[id]/route.ts'), routeContent.trim(), 'utf8');
console.log("Successfully updated API route for Next.js 15+ async params!");
