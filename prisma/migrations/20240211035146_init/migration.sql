-- CreateTable
CREATE TABLE "Todo" (
    "todo_id" SERIAL NOT NULL,
    "todo_content" TEXT NOT NULL,
    "todo_isCompleted" BOOLEAN NOT NULL,
    "todo_dateCompleted" TEXT,
    "todo_completedBy" INTEGER,
    "todoPage_id" INTEGER NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("todo_id")
);

-- CreateTable
CREATE TABLE "TodoPage" (
    "todoPage_id" SERIAL NOT NULL,
    "todoPage_heading" TEXT NOT NULL,
    "todoPage_description" TEXT NOT NULL,
    "todoPage_createdDate" TEXT NOT NULL,
    "todoPage_isPageArchived" BOOLEAN NOT NULL,

    CONSTRAINT "TodoPage_pkey" PRIMARY KEY ("todoPage_id")
);

-- CreateTable
CREATE TABLE "Account" (
    "account_id" SERIAL NOT NULL,
    "account_username" TEXT NOT NULL,
    "account_email" TEXT NOT NULL,
    "account_password" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "InvitedAccounts" (
    "todoPage_id" INTEGER NOT NULL,
    "account_id" INTEGER NOT NULL,

    CONSTRAINT "InvitedAccounts_pkey" PRIMARY KEY ("todoPage_id","account_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_account_username_key" ON "Account"("account_username");

-- CreateIndex
CREATE UNIQUE INDEX "Account_account_email_key" ON "Account"("account_email");

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_todoPage_id_fkey" FOREIGN KEY ("todoPage_id") REFERENCES "TodoPage"("todoPage_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvitedAccounts" ADD CONSTRAINT "InvitedAccounts_todoPage_id_fkey" FOREIGN KEY ("todoPage_id") REFERENCES "TodoPage"("todoPage_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvitedAccounts" ADD CONSTRAINT "InvitedAccounts_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;
