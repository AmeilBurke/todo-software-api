import { Test, TestingModule } from '@nestjs/testing';
import { TodoPagesController } from './todo-pages.controller';
import { TodoPagesService } from './todo-pages.service';

describe('TodoPagesController', () => {
  let controller: TodoPagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoPagesController],
      providers: [TodoPagesService],
    }).compile();

    controller = module.get<TodoPagesController>(TodoPagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
