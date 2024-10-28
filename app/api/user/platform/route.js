const { PrismaClient } = require("@prisma/client");
const { getToken } = require("next-auth/jwt");

const prisma = new PrismaClient();

export async function POST(request) {
  const token = await getToken({ req: request });

  const user = await prisma.user.findUnique({
    where: { email: token.email },
  });

  if (!user) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }

  try {
    const { type, profileUrl } = await request.json();
    const userId = user.id;

    const existingProfile = await prisma.userProfile.findUnique({
      where: {
        userId_type: {
          userId,
          type,
        },
      },
    });

    let profile;
    if (existingProfile) {
      profile = await prisma.userProfile.update({
        where: {
          userId_type: {
            userId,
            type,
          },
        },
        data: {
          profileUrl,
        },
      });
    } else {
      profile = await prisma.userProfile.create({
        data: {
          userId,
          type,
          profileUrl,
        },
      });
    }

    return Response.json(
      { message: "User profile updated successfully", profile: profile },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "Error while updating user details" },
      { status: 500 }
    );
  }
}
