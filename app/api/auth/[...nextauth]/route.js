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
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt(data) {
      const { token, account, profile } = data;

      if (account) {
        token.accessToken = account.access_token;
        token.id_token = account.id_token;
        token.email = profile.email;
      }

      return token;
    },

    async session(data) {
      const { session, token } = data;
      if (token) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          include: {
            upvotedIdeas: {
              include: {
                user: true,
              },
            },
            upvotedProjects: {
              include: {
                user: true,
              },
            },
            interestedIdeas: {
              include: {
                user: true,
              },
            },
            projects: true,
            ideas: true,
            profiles: true,
          },
        });

        session.accessToken = token.accessToken;
        session.user.id = dbUser.id;
        session.user.bio = dbUser.bio;
        session.user.username = dbUser.username;
        session.user.profiles = dbUser.profiles;
        session.user.upvotedIdeas = dbUser.upvotedIdeas;
        session.user.interestedIdeas = dbUser.interestedIdeas;
        session.user.projects = dbUser.projects;
        session.user.upvotedProjects = dbUser.upvotedProjects;
        session.user.ideas = dbUser.ideas;
      }
      return session;
    },

    async signIn(data) {
      const { user } = data;
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
              username: email.split("@")[0],
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
