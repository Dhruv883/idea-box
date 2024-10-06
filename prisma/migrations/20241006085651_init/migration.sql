-- CreateTable
CREATE TABLE "_UserUpvotedProject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserUpvotedProject_AB_unique" ON "_UserUpvotedProject"("A", "B");

-- CreateIndex
CREATE INDEX "_UserUpvotedProject_B_index" ON "_UserUpvotedProject"("B");

-- AddForeignKey
ALTER TABLE "_UserUpvotedProject" ADD CONSTRAINT "_UserUpvotedProject_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserUpvotedProject" ADD CONSTRAINT "_UserUpvotedProject_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
