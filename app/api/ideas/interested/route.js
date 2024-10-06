const { PrismaClient } = require("@prisma/client");
const { getToken } = require("next-auth/jwt");

const prisma = new PrismaClient();

export async function POST(request) {
	const token = await getToken({ req: request });

	if (!token) {
		return Response.json({ message: "Unauthorized" }, { status: 401 });
	}

	try {
		const body = await request.json();
		const { ideaId } = body;

		if (!ideaId) {
			return Response.json({ message: "Idea ID is required" }, { status: 400 });
		}

		const user = await prisma.user.update({
			where: { email: token.email },
			data: {
				interestedIdeas: {
					connect: { id: ideaId }
				}
			},
			include: { interestedIdeas: true },
		});

		if (!user) {
			return Response.json({ message: "User not found" }, { status: 404 });
		}

		return Response.json({ message: "Idea added to interested list", user }, { status: 200 });
	} catch (error) {
		console.error("Error adding idea to interested list:", error);
		return Response.json({ message: "Error adding idea to interested list" }, { status: 400 });
	}
}
