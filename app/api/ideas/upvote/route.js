const { PrismaClient } = require("@prisma/client");
const { getToken } = require("next-auth/jwt");

const prisma = new PrismaClient();

export async function POST(request) {
  const token = await getToken({ req: request });
  const user = await prisma.user.findUnique({
    where: { email: token.email },
    include: { upvotedIdeas: true },
  });

  if (!user) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }

  const { ideaId } = await request.json();

  try {
    const alreadyUpvoted = user.upvotedIdeas.some(
      (idea) => idea.id === Number(ideaId)
    );

    if (alreadyUpvoted) {
      return Response.json({ message: "Already upvoted" }, { status: 409 }); // Changed to 409 Conflict
    }

    const updatedIdea = await prisma.idea.update({
      where: { id: Number(ideaId) },
      data: {
        upvotes: { increment: 1 },
        upvotedBy: { connect: { id: user.id } },
      },
    });

    return Response.json(updatedIdea, { status: 200 });
  } catch (error) {
    console.error("Error upvoting idea:", error);
    return Response.json({ message: "Error upvoting idea" }, { status: 500 });
  }
}
