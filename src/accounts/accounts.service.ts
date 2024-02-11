import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async create(createAccountDto: CreateAccountDto) {
    try {
      return await this.prisma.account.create({
        data: {
          account_username: createAccountDto.accountUsername
            .toLocaleLowerCase()
            .trim(),
          account_email: createAccountDto.accountEmail
            .toLocaleLowerCase()
            .trim(),
          account_password: createAccountDto.accountPassword,
        },
      });
    } catch (error) {
      if (error.name) {
        return 'you have uploaded the wrong data to the database';
      }
      return error;
    }
  }

  async findAll() {
    try {
      return this.prisma.account.findMany();
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string) {
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
      return error;
    }
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    try {
      return await this.prisma.account.update({
        where: {
          account_id: Number(id),
        },
        data: {
          account_username: updateAccountDto.accountUsername
            .toLocaleLowerCase()
            .trim(),
          account_password: updateAccountDto.accountPassword
            .toLocaleLowerCase()
            .trim(),
        },
      });
    } catch (error) {
      return error;
    }
  }

  async remove(id: string) {
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
      return error;
    }
  }
}
