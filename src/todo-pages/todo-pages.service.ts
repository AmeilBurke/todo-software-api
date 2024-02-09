import { Injectable } from '@nestjs/common';
import { CreateTodoPageDto } from './dto/create-todo-page.dto';
import { UpdateTodoPageDto } from './dto/update-todo-page.dto';

@Injectable()
export class TodoPagesService {
  create(createTodoPageDto: CreateTodoPageDto) {
    return 'This action adds a new todoPage';
  }

  findAll() {
    return `This action returns all todoPages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todoPage`;
  }

  update(id: number, updateTodoPageDto: UpdateTodoPageDto) {
    return `This action updates a #${id} todoPage`;
  }

  remove(id: number) {
    return `This action removes a #${id} todoPage`;
  }
}
