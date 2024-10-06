import { getToken } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  const token = await getToken({ req: request });

  if (!token) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const Projects = await prisma.project.findMany({
      include: {
        technologies: true,
        tags: true,
        user: true,
      },
    });

    return Response.json(
      { message: "Successfully Fetched Projects", projects: Projects },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "An Error Occured while fetching projects" },
      { status: 200 }
    );
  }
}
