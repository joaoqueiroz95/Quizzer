-- DropIndex
DROP INDEX "Quiz_urlId_key";

-- AlterTable
ALTER TABLE "Quiz" ALTER COLUMN "urlId" SET DEFAULT '',
ALTER COLUMN "isOnline" SET DEFAULT false;
