import { Injectable } from '@nestjs/common';
import { CreateTodoPageDto } from './dto/create-todo-page.dto';
import { UpdateTodoPageDto } from './dto/update-todo-page.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TodoPagesService {
  constructor(private prisma: PrismaService) {}

  async create(createTodoPage: CreateTodoPageDto) {
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
      if (error.name) {
        return 'you have uploaded the wrong data to the database';
      }
      return error;
    }
  }

  async findAll() {
    try {
      return this.prisma.todoPage.findMany();
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string) {
    try {
      return this.prisma.todoPage.findFirst({
        where: { todoPage_id: Number(id) },
      });
    } catch (error) {
      return error;
    }
  }

  async update(id: string, updateTodoPageDto: UpdateTodoPageDto) {
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
      return error;
    }
  }

  async remove(id: string) {
    try {
      return this.prisma.todoPage.delete({
        where: { todoPage_id: Number(id) },
      });
    } catch (error) {
      return error;
    }
  }
}
