import { getToken } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { username } = params;

  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
      include: {
        ideas: {
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
        },
        projects: {
          include: {
            technologies: true,
            tags: true,
            user: true,
          },
        },
        profiles: true,
      },
    });

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    return Response.json(
      { message: "User  details fetched successfully", user },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: "An error occurred" }, { status: 500 });
  }
}
