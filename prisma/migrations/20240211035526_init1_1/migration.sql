/*
  Warnings:

  - The primary key for the `InvitedAccounts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `account_id` to the `InvitedAccounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InvitedAccounts" DROP CONSTRAINT "InvitedAccounts_pkey",
ADD COLUMN     "account_id" INTEGER NOT NULL,
ADD CONSTRAINT "InvitedAccounts_pkey" PRIMARY KEY ("todoPage_id", "account_id");

-- AddForeignKey
ALTER TABLE "InvitedAccounts" ADD CONSTRAINT "InvitedAccounts_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;
