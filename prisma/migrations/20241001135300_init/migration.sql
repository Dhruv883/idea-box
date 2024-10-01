/*
  Warnings:

  - You are about to drop the column `fname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Idea` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tags` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProfileType" AS ENUM ('Dev', 'Medium', 'Hashnode', 'StackOverflow', 'Github', 'LinkedIn', 'Twitter', 'Portfolio');

-- DropForeignKey
ALTER TABLE "Features" DROP CONSTRAINT "Features_ideaId_fkey";

-- DropForeignKey
ALTER TABLE "Tags" DROP CONSTRAINT "Tags_ideaId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "fname",
DROP COLUMN "lname",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "username" TEXT;

-- DropTable
DROP TABLE "Idea";

-- DropTable
DROP TABLE "Tags";

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" SERIAL NOT NULL,
    "profile" TEXT NOT NULL,
    "type" "ProfileType" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ideas" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "upvotes" INTEGER NOT NULL,

    CONSTRAINT "Ideas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IdeaTags" (
    "id" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,
    "ideaId" INTEGER NOT NULL,

    CONSTRAINT "IdeaTags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Suggestion" (
    "id" SERIAL NOT NULL,
    "suggestion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ideaId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Suggestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projects" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "repositoryURL" TEXT NOT NULL,
    "guidelines" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Technology" (
    "id" SERIAL NOT NULL,
    "technology" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "Technology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectTags" (
    "id" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "ProjectTags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserUpvotedIdeas" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UserInterestedIdeas" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Ideas_title_key" ON "Ideas"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Projects_repositoryURL_key" ON "Projects"("repositoryURL");

-- CreateIndex
CREATE UNIQUE INDEX "_UserUpvotedIdeas_AB_unique" ON "_UserUpvotedIdeas"("A", "B");

-- CreateIndex
CREATE INDEX "_UserUpvotedIdeas_B_index" ON "_UserUpvotedIdeas"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserInterestedIdeas_AB_unique" ON "_UserInterestedIdeas"("A", "B");

-- CreateIndex
CREATE INDEX "_UserInterestedIdeas_B_index" ON "_UserInterestedIdeas"("B");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ideas" ADD CONSTRAINT "Ideas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Features" ADD CONSTRAINT "Features_ideaId_fkey" FOREIGN KEY ("ideaId") REFERENCES "Ideas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdeaTags" ADD CONSTRAINT "IdeaTags_ideaId_fkey" FOREIGN KEY ("ideaId") REFERENCES "Ideas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suggestion" ADD CONSTRAINT "Suggestion_ideaId_fkey" FOREIGN KEY ("ideaId") REFERENCES "Ideas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suggestion" ADD CONSTRAINT "Suggestion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Technology" ADD CONSTRAINT "Technology_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTags" ADD CONSTRAINT "ProjectTags_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserUpvotedIdeas" ADD CONSTRAINT "_UserUpvotedIdeas_A_fkey" FOREIGN KEY ("A") REFERENCES "Ideas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserUpvotedIdeas" ADD CONSTRAINT "_UserUpvotedIdeas_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserInterestedIdeas" ADD CONSTRAINT "_UserInterestedIdeas_A_fkey" FOREIGN KEY ("A") REFERENCES "Ideas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserInterestedIdeas" ADD CONSTRAINT "_UserInterestedIdeas_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
