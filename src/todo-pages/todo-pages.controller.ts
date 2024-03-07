import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TodoPagesService } from './todo-pages.service';
import { CreateTodoPageDto } from './dto/create-todo-page.dto';
import { UpdateTodoPageDto } from './dto/update-todo-page.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('todo-pages')
export class TodoPagesController {
  constructor(private readonly todoPagesService: TodoPagesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createTodoPageDto: CreateTodoPageDto) {
    return this.todoPagesService.create(createTodoPageDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.todoPagesService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoPagesService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoPageDto: UpdateTodoPageDto) {
    return this.todoPagesService.update(id, updateTodoPageDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoPagesService.remove(id);
  }
}
