import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { TodoPagesModule } from './todo-pages/todo-pages.module';
import { InvitedListsModule } from './invited-lists/invited-lists.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [TodosModule, TodoPagesModule, InvitedListsModule, AccountsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
