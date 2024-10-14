import { getToken } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  const token = await getToken({ req: request });

  if (!token) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { suggestion, ideaId } = await request.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email: token.email },
      include: { upvotedIdeas: true },
    });

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    const updatedIdea = await prisma.idea.update({
      where: { id: Number(ideaId) },
      data: {
        suggestions: {
          create: {
            suggestion,
            userId: token.id,
          },
        },
      },
      include: {
        suggestions: true,
        user: true,
        features: true,
        tags: true,
      },
    });

    return Response.json(
      { message: "Suggestion added successfully", idea: updatedIdea },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "Error while adding suggestion" },
      { status: 400 }
    );
  }
}
