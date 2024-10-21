/*
  Warnings:

  - A unique constraint covering the columns `[userId,type]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_type_key" ON "UserProfile"("userId", "type");
