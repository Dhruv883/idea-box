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

  const Idea = await prisma.idea.create({
    data: {
      title: title,
      domain: domain,
      description: description,
      userId: user.id,
    },
  });

  features.forEach(async (feat) => {
    await prisma.feature.create({
      data: {
        feature: feat,
        ideaId: Idea.id,
      },
    });
  });

  tags.forEach(async (tag) => {
    await prisma.ideaTag.create({
      data: {
        tag: tag,
        ideaId: Idea.id,
      },
    });
  });

  return Response.json(
    { message: "Idea Submitted Successfully" },
    { status: 200 }
  );
}
