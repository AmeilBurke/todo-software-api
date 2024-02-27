-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "account_role" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_account_role_fkey" FOREIGN KEY ("account_role") REFERENCES "Role"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;
