import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodoPagesService } from './todo-pages.service';
import { CreateTodoPageDto } from './dto/create-todo-page.dto';
import { UpdateTodoPageDto } from './dto/update-todo-page.dto';

@Controller('todo-pages')
export class TodoPagesController {
  constructor(private readonly todoPagesService: TodoPagesService) {}

  @Post()
  create(@Body() createTodoPageDto: CreateTodoPageDto) {
    return this.todoPagesService.create(createTodoPageDto);
  }

  @Get()
  findAll() {
    return this.todoPagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoPagesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoPageDto: UpdateTodoPageDto) {
    return this.todoPagesService.update(id, updateTodoPageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoPagesService.remove(id);
  }
}
