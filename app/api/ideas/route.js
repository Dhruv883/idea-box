import { getToken } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  const token = await getToken({ req: request });

  const user = await prisma.user.findUnique({
    where: { email: token.email },
  });

  if (!user) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }

  try {
    const offset = parseInt(request.nextUrl.searchParams.get("offset"));
    const limit = parseInt(request.nextUrl.searchParams.get("limit"));
    const tags = request.nextUrl.searchParams.getAll("tags");

    const Ideas = await prisma.idea.findMany({
      where: {
        ...(tags.length > 0 && { tags: { some: { tag: { in: tags } } } }),
      },
      skip: offset,
      take: limit,
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

    const ideaCount = await prisma.idea.count({
      where: {
        ...(tags.length > 0 && { tags: { some: { tag: { in: tags } } } }),
      },
    });

    return Response.json(
      {
        message: "Successfully Fetched Ideas",
        ideas: Ideas,
        totalIdeas: ideaCount,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "An Error Occured while fetching ideas" },
      { status: 500 }
    );
  }
}
