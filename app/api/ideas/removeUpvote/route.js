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
    const hasUpvoted = user.upvotedIdeas.some(
      (idea) => idea.id === Number(ideaId)
    );

   if (!hasUpvoted) {
      return Response.json({ message: "Idea not upvoted" }, { status: 409 }); // Changed to 409 Conflict
    }

    const updatedIdea = await prisma.idea.update({
      where: { id: Number(ideaId) },
      data: {
        upvotes: { decrement: 1 },
        upvotedBy: { disconnect: { id: user.id } },
      },
    });

    return Response.json(updatedIdea, { status: 200 })
  } catch (error) {
    console.error("Error removing upvote from idea:", error);
    return Response.json(
      { message: "Error removing upvote from idea" },
      { status: 500 }
    );
  }
}
