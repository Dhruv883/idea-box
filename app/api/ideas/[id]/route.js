import { getToken } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const token = await getToken({ req: request });

  const user = await prisma.user.findUnique({
    where: { email: token.email },
  });

  if (!user) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }

  const { id } = params;

  try {
    const Idea = await prisma.idea.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        tags: true,
        features: true,
        suggestions: {
          include: {
            user: true,
          },
        },
        interestedBy: true,
        user: true,
      },
    });

    return Response.json(
      {
        message: "Successfully Fetched Idea",
        idea: Idea,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "An Error Occured while fetching idea" },
      { status: 500 }
    );
  }
}
