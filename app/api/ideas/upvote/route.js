const { PrismaClient } = require("@prisma/client");
const { getToken } = require("next-auth/jwt");

const prisma = new PrismaClient();

export async function POST(request) {
  const token = await getToken({ req: request });

  if (!token) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { ideaId } = await request.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email: token.email },
      include: { upvotedIdeas: true },
    });

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    const alreadyUpvoted = user.upvotedIdeas.some(idea => idea.id === Number(ideaId));

    if (alreadyUpvoted) {
      return Response.json({ message: "Already upvoted" }, { status: 400 });
    }

    const updatedIdea = await prisma.idea.update({
      where: { id: Number(ideaId) },
      data: {
        upvotes: { increment: 1 },
        upvotedBy: { connect: { id: user.id } },
      },
    });

    return Response.json(updatedIdea);
  } catch (error) {
    console.error("Error upvoting idea:", error);
    return Response.json({ message: "Error upvoting idea" }, { status: 500 });
  }
}