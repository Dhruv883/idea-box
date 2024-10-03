import { getToken } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  const token = await getToken({ req: request });

  if (!token) {
    return Response.json({ message: "Unauthorized" }, { status: 403 });
  }

  const { name, title, domain, description, guidelines, url, techStack, tags } =
    await request.json();

  const Project = await prisma.project.create({
    data: {
      name: name,
      title: title,
      domain: domain,
      description: description,
      guidelines: guidelines,
      repositoryURL: url,
      userId: token.id,
    },
  });

  techStack.forEach(async (technology) => {
    await prisma.technology.create({
      data: {
        technology: technology,
        projectId: Project.id,
      },
    });
  });

  tags.forEach(async (tag) => {
    await prisma.projectTag.create({
      data: {
        tag: tag,
        projectId: Project.id,
      },
    });
  });

  return Response.json(
    { message: "Project Submitted Successfully" },
    { status: 200 }
  );
}
