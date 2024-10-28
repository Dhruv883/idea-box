import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
// import { PrismaClient } from "@prisma/client/edge";

// const prisma = new PrismaClient();

export async function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }
  const token = await getToken({ req: request });

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // const user = await prisma.user.findUnique({
  //   where: { email: token.email },
  //   include: { upvotedIdeas: true },
  // });

  // if (!user) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/ideas/:path*",
    "/projects/:path*",
    "/submit/idea",
    "/submit/project",
    "/profile/:path*",
    "/u/:path*",
    "/api/:path*",
  ],
};
