-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "account_id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "TodoPage" ALTER COLUMN "todoPage_createdBy" DROP DEFAULT;
DROP SEQUENCE "TodoPage_todoPage_createdBy_seq";
