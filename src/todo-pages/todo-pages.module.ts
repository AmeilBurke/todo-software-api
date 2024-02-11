import { Module } from '@nestjs/common';
import { TodoPagesService } from './todo-pages.service';
import { TodoPagesController } from './todo-pages.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TodoPagesController],
  providers: [TodoPagesService, PrismaService],
})
export class TodoPagesModule {}
