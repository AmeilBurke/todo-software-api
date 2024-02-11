/*
  Warnings:

  - The primary key for the `InvitedAccounts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `account_id` on the `InvitedAccounts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "InvitedAccounts" DROP CONSTRAINT "InvitedAccounts_account_id_fkey";

-- AlterTable
ALTER TABLE "InvitedAccounts" DROP CONSTRAINT "InvitedAccounts_pkey",
DROP COLUMN "account_id",
ADD CONSTRAINT "InvitedAccounts_pkey" PRIMARY KEY ("todoPage_id");
