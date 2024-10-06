import { getToken } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  const token = await getToken({ req: request });
  // console.log(token);

  if (!token) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { title, domain, description, features, tags } = await request.json();

  const Idea = await prisma.idea.create({
    data: {
      title: title,
      domain: domain,
      description: description,
      userId: token.id,
    },
  });

  // console.log("Idea", idea);

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
