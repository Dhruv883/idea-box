const { PrismaClient } = require("@prisma/client");
const { getToken } = require("next-auth/jwt");

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
    const hasUpvoted = user.upvotedProjects.some(
      (project) => project.id === Number(projectId)
    );

    if (!hasUpvoted) {
      return Response.json({ message: "Project not upvoted" }, { status: 400 });
    }

    const upvotedProject = await prisma.project.update({
      where: { id: Number(projectId) },
      data: {
        upvotes: { decrement: 1 },
        upvotedBy: { disconnect: { id: user.id } },
      },
    });

    return Response.json(upvotedProject);
  } catch (error) {
    console.error("Error removing upvote from project:", error);
    return Response.json(
      { message: "Error removing upvote from project" },
      { status: 500 }
    );
  }
}
