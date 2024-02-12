import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto) {
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
      return error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.todo.findMany();
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.todo.findFirst({
        where: {
          todo_id: Number(id),
        },
      });
    } catch (error) {
      return error;
    }
  }

  async findAllTodosForAPage(todoPageId: string) {
    try {
      return await this.prisma.todo.findMany({
        where: {
          todoPage_id: Number(todoPageId),
        },
      });
    } catch (error) {
      return error;
    }
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
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
      return error;
    }
  }

  async remove(id: string) {
    try {
      return this.prisma.todo.delete({
        where: {
          todo_id: Number(id),
        },
      });
    } catch (error) {
      return error;
    }
  }
}
