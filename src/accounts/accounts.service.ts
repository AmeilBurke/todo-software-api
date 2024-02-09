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
          account_username: createAccountDto.account_username
            .toLocaleLowerCase()
            .trim(),
          account_email: createAccountDto.account_email
            .toLocaleLowerCase()
            .trim(),
          account_password: createAccountDto.account_password,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try {
      return await this.prisma.account.findMany();
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.account.findFirstOrThrow({
        where: {
          account_id: id,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        return 'ERROR: Record not found';
      } else {
        // console.log(error);
        return error;
      }
    }
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    try {
      return await this.prisma.account.update({
        where: {
          account_id: id,
        },
        data: {
          account_username: updateAccountDto.account_username.toLocaleLowerCase().trim(),
          account_password: updateAccountDto.account_password,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
