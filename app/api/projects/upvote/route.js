import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient();

export async function POST(request) {
  const token = await getToken({ req: request });

  const user = await prisma.user.findUnique({
    where: { email: token.email },
    include: { upvotedProjects: true },
  });

  if (!user) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }

  const { projectId } = await request.json();

  try {
    const alreadyUpvoted = user.upvotedProjects.some(
      (project) => project.id === Number(projectId)
    );

    if (alreadyUpvoted) {
      return Response.json({ message: "Already upvoted" }, { status: 400 });
    }

    const updatedProject = await prisma.project.update({
      where: { id: Number(projectId) },
      data: {
        upvotes: { increment: 1 },
        upvotedBy: { connect: { id: user.id } },
      },
    });

    return Response.json(updatedProject);
  } catch (error) {
    console.error("Error upvoting project:", error);
    return Response.json(
      { message: "Error upvoting project" },
      { status: 500 }
    );
  }
}
