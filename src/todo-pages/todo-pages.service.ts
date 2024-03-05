import { Injectable } from '@nestjs/common';
import { CreateTodoPageDto } from './dto/create-todo-page.dto';
import { UpdateTodoPageDto } from './dto/update-todo-page.dto';
import { PrismaService } from 'src/prisma.service';
import { TodoPage } from '@prisma/client';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library';

@Injectable()
export class TodoPagesService {
  constructor(private prisma: PrismaService) {}

  async create(createTodoPage: CreateTodoPageDto): Promise<TodoPage | string> {
    try {
      const currentDate = new Date();

      return await this.prisma.todoPage.create({
        data: {
          todoPage_heading: createTodoPage.todoPageHeading
            .toLocaleLowerCase()
            .trim(),
          todoPage_description: createTodoPage.todoPageDescription
            .toLocaleLowerCase()
            .trim(),
          todoPage_isPageArchived: false,
          todoPage_createdDate: `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`,
        },
      });
    } catch (error) {
      if (error?.name === 'PrismaClientKnownRequestError') {
        const prismaKnownRequestError = error as PrismaClientKnownRequestError;
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

  async findAll(): Promise<TodoPage[] | string> {
    try {
      return this.prisma.todoPage.findMany();
    } catch (error) {
      const defaultError = error as Error;
      return defaultError.message;
    }
  }

  async findOne(id: string): Promise<TodoPage | string> {
    try {
      return this.prisma.todoPage.findFirst({
        where: { todoPage_id: Number(id) },
      });
    } catch (error) {
      const defaultError = error as Error;
      return defaultError.message;
    }
  }

  async update(id: string, updateTodoPageDto: UpdateTodoPageDto): Promise<TodoPage | string> {
    try {
      return await this.prisma.todoPage.update({
        where: {
          todoPage_id: Number(id),
        },
        data: {
          todoPage_heading: updateTodoPageDto.todoPageHeading
            .toLocaleLowerCase()
            .trim(),
          todoPage_description: updateTodoPageDto.todoPageDescription
            .toLocaleLowerCase()
            .trim(),
          todoPage_isPageArchived: updateTodoPageDto.todoPageIsPageArchived,
        },
      });
    } catch (error) {
      const defaultError = error as Error;
      return defaultError.message;
    }
  }

  async remove(id: string): Promise<TodoPage | string> {
    try {
      return this.prisma.todoPage.delete({
        where: { todoPage_id: Number(id) },
      });
    } catch (error) {
      const defaultError = error as Error;
      return defaultError.message;
    }
  }
}
