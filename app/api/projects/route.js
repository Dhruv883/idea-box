import { getToken } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  const token = await getToken({ req: request });

  if (!token) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const offset = parseInt(request.nextUrl.searchParams.get("offset"));
    const limit = parseInt(request.nextUrl.searchParams.get("limit"));

    const Projects = await prisma.project.findMany({
      skip: offset,
      take: limit,
      include: {
        technologies: true,
        tags: true,
        user: true,
      },
    });

    const projectCount = await prisma.project.count();

    return Response.json(
      {
        message: "Successfully Fetched Projects",
        projects: Projects,
        totalProjects: projectCount,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "An Error Occured while fetching projects" },
      { status: 200 }
    );
  }
}
