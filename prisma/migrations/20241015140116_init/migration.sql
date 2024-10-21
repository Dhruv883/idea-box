/*
  Warnings:

  - The values [Github] on the enum `ProfileType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProfileType_new" AS ENUM ('Dev', 'Medium', 'Hashnode', 'StackOverflow', 'GitHub', 'LinkedIn', 'Twitter', 'Portfolio');
ALTER TABLE "UserProfile" ALTER COLUMN "type" TYPE "ProfileType_new" USING ("type"::text::"ProfileType_new");
ALTER TYPE "ProfileType" RENAME TO "ProfileType_old";
ALTER TYPE "ProfileType_new" RENAME TO "ProfileType";
DROP TYPE "ProfileType_old";
COMMIT;
