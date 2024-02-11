import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { TodoPagesModule } from './todo-pages/todo-pages.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [AccountsModule, TodoPagesModule, TodosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
