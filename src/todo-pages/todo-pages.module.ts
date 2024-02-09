import { Module } from '@nestjs/common';
import { TodoPagesService } from './todo-pages.service';
import { TodoPagesController } from './todo-pages.controller';

@Module({
  controllers: [TodoPagesController],
  providers: [TodoPagesService],
})
export class TodoPagesModule {}
