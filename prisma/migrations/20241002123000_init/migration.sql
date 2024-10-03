/*
  Warnings:

  - You are about to drop the `_UserInterestedIdeas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserUpvotedIdeas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserInterestedIdeas" DROP CONSTRAINT "_UserInterestedIdeas_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserInterestedIdeas" DROP CONSTRAINT "_UserInterestedIdeas_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserUpvotedIdeas" DROP CONSTRAINT "_UserUpvotedIdeas_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserUpvotedIdeas" DROP CONSTRAINT "_UserUpvotedIdeas_B_fkey";

-- DropTable
DROP TABLE "_UserInterestedIdeas";

-- DropTable
DROP TABLE "_UserUpvotedIdeas";

-- CreateTable
CREATE TABLE "_UserUpvotedIdea" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UserInterestedIdea" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserUpvotedIdea_AB_unique" ON "_UserUpvotedIdea"("A", "B");

-- CreateIndex
CREATE INDEX "_UserUpvotedIdea_B_index" ON "_UserUpvotedIdea"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserInterestedIdea_AB_unique" ON "_UserInterestedIdea"("A", "B");

-- CreateIndex
CREATE INDEX "_UserInterestedIdea_B_index" ON "_UserInterestedIdea"("B");

-- AddForeignKey
ALTER TABLE "_UserUpvotedIdea" ADD CONSTRAINT "_UserUpvotedIdea_A_fkey" FOREIGN KEY ("A") REFERENCES "Idea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserUpvotedIdea" ADD CONSTRAINT "_UserUpvotedIdea_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserInterestedIdea" ADD CONSTRAINT "_UserInterestedIdea_A_fkey" FOREIGN KEY ("A") REFERENCES "Idea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserInterestedIdea" ADD CONSTRAINT "_UserInterestedIdea_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
