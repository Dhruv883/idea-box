import { getToken } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  const token = await getToken({ req: request });

  if (!token) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const Ideas = await prisma.idea.findMany({
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

    console.log("Successfully Fetched Ideas");

    return Response.json(
      { message: "Successfully Fetched Ideas", ideas: Ideas },
      { status: 200 }
    );
  } catch (error) {
    console.log("An Error Occured while fetching ideas");

    return Response.json(
      { message: "An Error Occured while fetching ideas" },
      { status: 500 } 
    );
  }
}
