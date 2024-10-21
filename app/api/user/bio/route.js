import { getToken } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  const token = await getToken({ req: request });

  if (!token) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { bio } = await request.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { email: token.email },
      data: { bio },
    });

    return Response.json(
      { message: "Bio Updated Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "Error while updating Bio" },
      { status: 500 }
    );
  }
}
