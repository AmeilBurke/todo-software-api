import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from 'src/prisma.service';

@Controller('accounts')
export class AccountsController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async create(@Body() createAccountDto: CreateAccountDto) {
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

  @Get()
  async findAll() {
    try {
      return this.prisma.account.findMany();
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
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

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
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

  @Delete(':id')
  async remove(@Param('id') id: string) {
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
