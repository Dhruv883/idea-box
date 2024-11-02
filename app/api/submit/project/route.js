import { getToken } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  const token = await getToken({ req: request });

  const user = await prisma.user.findUnique({
    where: { email: token.email },
  });

  if (!user) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }

  const { name, title, domain, description, guidelines, url, techStack, tags } =
    await request.json();

  try {
    await prisma.$transaction(async (prisma) => {
      const Project = await prisma.project.create({
        data: {
          name: name,
          title: title,
          domain: domain,
          description: description,
          guidelines: guidelines,
          repositoryURL: url,
          userId: user.id,
        },
      });

      const techData = techStack.map((technology) => ({
        technology: technology,
        projectId: Project.id,
      }));

      const tagData = tags.map((tag) => ({
        tag: tag,
        projectId: Project.id,
      }));

      await prisma.technology.createMany({ data: techData });
      await prisma.projectTag.createMany({ data: tagData });
    });

    return Response.json(
      { message: "Project Submitted Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Failed to submit project" },
      { status: 500 }
    );
  }
}
