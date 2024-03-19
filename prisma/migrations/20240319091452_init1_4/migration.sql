-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "account_id" SET DEFAULT 0,
ALTER COLUMN "account_id" DROP DEFAULT;
DROP SEQUENCE "Account_account_id_seq";

-- AlterTable
ALTER TABLE "TodoPage" ADD COLUMN     "todoPage_createdBy" SERIAL NOT NULL;

-- AddForeignKey
ALTER TABLE "TodoPage" ADD CONSTRAINT "TodoPage_todoPage_createdBy_fkey" FOREIGN KEY ("todoPage_createdBy") REFERENCES "Account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;
