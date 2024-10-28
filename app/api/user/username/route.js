import { getToken } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  const token = await getToken({ req: request });

  if (!token) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { username } = await request.json();

  try {
    await prisma.user.update({
      where: { email: token.email },
      data: { username },
    });

    return Response.json(
      { message: "Username Updated Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "Error while updating Username" },
      { status: 500 }
    );
  }
}
