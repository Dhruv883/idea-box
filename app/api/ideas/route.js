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

    const Ideas = await prisma.idea.findMany({
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

    const ideaCount = await prisma.idea.count();

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
