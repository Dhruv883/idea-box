import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET;

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      params: {
        access_type: "offline",
        response_type: "code",
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt(data) {
      const { token, account, profile } = data;
      // console.log("JWT :", data);

      if (account) {
        token.accessToken = account.access_token;
        token.id_token = account.id_token;
      }

      const dbUser = await prisma.user.findUnique({
        where: { email: token.email },
        include: {
          upvotedIdeas: true,
          upvotedProjects: true,
          interestedIdeas: true,
          projects: true,
          ideas: true,
        },
      });

      if (dbUser) {
        token.id = dbUser.id;
        token.username = dbUser.username;
        token.bio = dbUser.bio;
        token.upvotedIdeas = dbUser.upvotedIdeas;
        token.interestedIdeas = dbUser.interestedIdeas;
        token.projects = dbUser.projects;
        token.ideas = dbUser.ideas;
        token.upvotedProjects = dbUser.upvotedProjects;
      }
      return token;
    },

    async session(data) {
      // console.log("Session: ", data);
      const { session, token } = data;
      if (token) {
        session.accessToken = token.accessToken;
        session.user.id = token.id;
        session.user.bio = token.bio;
        session.user.username = token.username;
        session.user.upvotedIdeas = token.upvotedIdeas;
        session.user.interestedIdeas = token.interestedIdeas;
        session.user.projects = token.projects;
        session.user.upvotedProjects = token.upvotedProjects;
        session.user.ideas = token.ideas;
      }
      return session;
    },

    async signIn(data) {
      const { user, account, profile } = data;
      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              name: user.name,
              email: user.email,
              image: user.image,
            },
          });
        }
        return true;
      } catch (error) {
        console.error("Error checking or adding user: ", error);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
