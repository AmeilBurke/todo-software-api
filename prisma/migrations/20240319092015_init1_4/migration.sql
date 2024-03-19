-- AlterTable
CREATE SEQUENCE account_account_id_seq;
ALTER TABLE "Account" ALTER COLUMN "account_id" SET DEFAULT nextval('account_account_id_seq');
ALTER SEQUENCE account_account_id_seq OWNED BY "Account"."account_id";
