/*
  Warnings:

  - You are about to drop the column `todoPage_accountId` on the `TodoPage` table. All the data in the column will be lost.
  - You are about to drop the column `todoPage_invitedAccountsId` on the `TodoPage` table. All the data in the column will be lost.
  - Added the required column `accountId` to the `TodoPage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invitedPages_id` to the `TodoPage` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[TodoPage] DROP CONSTRAINT [TodoPage_todoPage_accountId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[TodoPage] DROP CONSTRAINT [TodoPage_todoPage_invitedAccountsId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Account] ADD [invitedPagesInvitedPages_id] INT;

-- AlterTable
ALTER TABLE [dbo].[Todo] ALTER COLUMN [todo_dateCompleted] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[Todo] ALTER COLUMN [todo_completedBy] INT NULL;

-- AlterTable
ALTER TABLE [dbo].[TodoPage] DROP COLUMN [todoPage_accountId],
[todoPage_invitedAccountsId];
ALTER TABLE [dbo].[TodoPage] ADD [accountId] INT NOT NULL,
[invitedPages_id] INT NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[InvitedPages] (
    [invitedPages_id] INT NOT NULL IDENTITY(1,1),
    [invitedPages_todoPage_id] INT NOT NULL,
    CONSTRAINT [InvitedPages_pkey] PRIMARY KEY CLUSTERED ([invitedPages_id])
);

-- AddForeignKey
ALTER TABLE [dbo].[TodoPage] ADD CONSTRAINT [TodoPage_accountId_fkey] FOREIGN KEY ([accountId]) REFERENCES [dbo].[Account]([account_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[TodoPage] ADD CONSTRAINT [TodoPage_invitedPages_id_fkey] FOREIGN KEY ([invitedPages_id]) REFERENCES [dbo].[InvitedPages]([invitedPages_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Account] ADD CONSTRAINT [Account_invitedPagesInvitedPages_id_fkey] FOREIGN KEY ([invitedPagesInvitedPages_id]) REFERENCES [dbo].[InvitedPages]([invitedPages_id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
