import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from 'src/prisma.service';
import { encryptPassword } from 'src/bcrypt/encryptPassword';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { Account } from '@prisma/client';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account | string> {
    try {
      const encryptedPassword = await encryptPassword(
        createAccountDto.accountPassword.trim(),
      );

      return await this.prisma.account.create({
        data: {
          account_username: createAccountDto.accountUsername
            .toLocaleLowerCase()
            .trim(),
          account_email: createAccountDto.accountEmail
            .toLocaleLowerCase()
            .trim(),
          account_password: encryptedPassword,
          account_role: createAccountDto.accountRole,
        },
      });
    } catch (error: any) {
      if (error?.name === 'PrismaClientKnownRequestError') {
        const prismaKnownRequestError = error as PrismaClientKnownRequestError;

        if (prismaKnownRequestError.code === 'P2002') {
          return "the account you are trying to create doesn't have a unique email";
        }
        return prismaKnownRequestError.code;
      }

      if (error?.name === 'PrismaClientUnknownRequestError') {
        const prismaUnknownRequestError =
          error as PrismaClientUnknownRequestError;
        return prismaUnknownRequestError.message;
      }

      if (error?.name === 'PrismaClientValidationError') {
        return 'there was an error with data validation, check your spelling or if fields are missing & try again';
      }

      const defaultError = error as Error;
      return defaultError.message;
    }
  }

  async findAll(): Promise<Account[] | string> {
    try {
      return this.prisma.account.findMany();
    } catch (error) {
      const defaultError = error as Error;
      return defaultError.message;
    }
  }

  async findOne(id: string): Promise<Account | string> {
    try {
      if (id.includes('@')) {
        return this.prisma.account.findFirst({
          where: { account_email: id },
        });
      } else {
        return this.prisma.account.findFirst({
          where: { account_id: Number(id) },
        });
      }
    } catch (error) {
      const defaultError = error as Error;
      return defaultError.message;
    }
  }

  async update(
    id: string,
    updateAccountDto: UpdateAccountDto,
  ): Promise<Account | string> {
    try {
      return await this.prisma.account.update({
        where: {
          account_id: Number(id),
        },
        data: {
          account_username: updateAccountDto.accountUsername
            .toLocaleLowerCase()
            .trim(),
          account_password: updateAccountDto.accountPassword.trim(),
        },
      });
    } catch (error) {
      const defaultError = error as Error;
      return defaultError.message;
    }
  }

  async remove(id: string): Promise<Account | string> {
    try {
      if (id.includes('@')) {
        return this.prisma.account.delete({
          where: { account_email: id },
        });
      } else {
        return this.prisma.account.delete({
          where: { account_id: Number(id) },
        });
      }
    } catch (error) {
      const defaultError = error as Error;
      return defaultError.message;
    }
  }
}
