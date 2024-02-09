BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Todo] (
    [todo_id] INT NOT NULL IDENTITY(1,1),
    [todo_content] NVARCHAR(1000) NOT NULL,
    [todo_isCompleted] BIT NOT NULL,
    [todo_dateCompleted] NVARCHAR(1000) NOT NULL,
    [todo_completedBy] INT NOT NULL,
    [todoPage_id] INT NOT NULL,
    CONSTRAINT [Todo_pkey] PRIMARY KEY CLUSTERED ([todo_id])
);

-- CreateTable
CREATE TABLE [dbo].[TodoPage] (
    [todoPage_id] INT NOT NULL IDENTITY(1,1),
    [todoPage_heading] NVARCHAR(1000) NOT NULL,
    [todoPage_description] NVARCHAR(1000) NOT NULL,
    [todoPage_createdDate] NVARCHAR(1000) NOT NULL,
    [todoPage_isPageArchived] BIT NOT NULL,
    [todoPage_accountId] INT NOT NULL,
    [todoPage_invitedAccountsId] INT NOT NULL,
    CONSTRAINT [TodoPage_pkey] PRIMARY KEY CLUSTERED ([todoPage_id])
);

-- CreateTable
CREATE TABLE [dbo].[Account] (
    [account_id] INT NOT NULL IDENTITY(1,1),
    [account_username] NVARCHAR(1000) NOT NULL,
    [account_email] NVARCHAR(1000) NOT NULL,
    [account_password] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Account_pkey] PRIMARY KEY CLUSTERED ([account_id]),
    CONSTRAINT [Account_account_username_key] UNIQUE NONCLUSTERED ([account_username]),
    CONSTRAINT [Account_account_email_key] UNIQUE NONCLUSTERED ([account_email])
);

-- AddForeignKey
ALTER TABLE [dbo].[Todo] ADD CONSTRAINT [Todo_todoPage_id_fkey] FOREIGN KEY ([todoPage_id]) REFERENCES [dbo].[TodoPage]([todoPage_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[TodoPage] ADD CONSTRAINT [TodoPage_todoPage_accountId_fkey] FOREIGN KEY ([todoPage_accountId]) REFERENCES [dbo].[Account]([account_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[TodoPage] ADD CONSTRAINT [TodoPage_todoPage_invitedAccountsId_fkey] FOREIGN KEY ([todoPage_invitedAccountsId]) REFERENCES [dbo].[Account]([account_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
