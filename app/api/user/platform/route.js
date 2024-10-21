const { PrismaClient } = require("@prisma/client");
const { getToken } = require("next-auth/jwt");

const prisma = new PrismaClient();

export async function POST(request) {
  const token = await getToken({ req: request });

  if (!token) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: token.email },
  });

  if (!user) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }

  try {
    const { type, profileUrl } = await request.json();
    const userId = user.id;

    // Check if the user profile already exists for the given type and userId
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
      // If profile exists, update it
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
      // If profile doesn't exist, create it
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
    console.log("error: ", error);

    return Response.json(
      { message: "Error while updating user details" },
      { status: 500 }
    );
  }
}
