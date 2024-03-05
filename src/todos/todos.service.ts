import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma.service';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library';
import { Todo } from '@prisma/client';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo | string> {
    try {
      await this.prisma.todo.create({
        data: {
          todo_content: createTodoDto.todoContent,
          todo_isCompleted: false,
          todo_completedBy: createTodoDto.todoCompletedBy,
          todoPage_id: createTodoDto.todoPageId,
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

  async findAll(): Promise<Todo[] | string> {
    try {
      return await this.prisma.todo.findMany();
    } catch (error) {
      const defaultError = error as Error;
      return defaultError.message;
    }
  }

  async findOne(id: string): Promise<Todo | string> {
    try {
      return await this.prisma.todo.findFirst({
        where: {
          todo_id: Number(id),
        },
      });
    } catch (error) {
      const defaultError = error as Error;
      return defaultError.message;
    }
  }

  async findAllTodosForAPage(todoPageId: string): Promise<Todo[] | string> {
    try {
      return await this.prisma.todo.findMany({
        where: {
          todoPage_id: Number(todoPageId),
        },
      });
    } catch (error) {
      const defaultError = error as Error;
      return defaultError.message;
    }
  }

  async update(
    id: string,
    updateTodoDto: UpdateTodoDto,
  ): Promise<Todo | string> {
    try {
      const currentDate = new Date();

      return await this.prisma.todo.update({
        where: {
          todo_id: Number(id),
        },
        data: {
          todo_content: updateTodoDto.todoContent,
          todo_isCompleted: updateTodoDto.todoIsCompleted,
          todo_dateCompleted: `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`,
          todo_completedBy: updateTodoDto.todoCompletedBy,
          todoPage_id: updateTodoDto.todoPageId,
        },
      });
    } catch (error) {
      const defaultError = error as Error;
      return defaultError.message;
    }
  }

  async remove(id: string): Promise<Todo | string> {
    try {
      return this.prisma.todo.delete({
        where: {
          todo_id: Number(id),
        },
      });
    } catch (error) {
      const defaultError = error as Error;
      return defaultError.message;
    }
  }
}
