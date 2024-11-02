import { getToken } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  const token = await getToken({ req: request });

  const user = await prisma.user.findUnique({
    where: { email: token.email },
  });

  if (!user) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }

  const { title, domain, description, features, tags } = await request.json();

  try {
    await prisma.$transaction(async (prisma) => {
      const Idea = await prisma.idea.create({
        data: {
          title: title,
          domain: domain,
          description: description,
          userId: user.id,
        },
      });

      const featureData = features.map((feat) => ({
        feature: feat,
        ideaId: Idea.id,
      }));

      const tagData = tags.map((tag) => ({
        tag: tag,
        ideaId: Idea.id,
      }));

      await prisma.feature.createMany({ data: featureData });
      await prisma.ideaTag.createMany({ data: tagData });
    });

    return Response.json(
      { message: "Idea Submitted Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Failed to submit idea" }, { status: 500 });
  }
}
