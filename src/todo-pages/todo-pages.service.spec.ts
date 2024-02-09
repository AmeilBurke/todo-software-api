import { Test, TestingModule } from '@nestjs/testing';
import { TodoPagesService } from './todo-pages.service';

describe('TodoPagesService', () => {
  let service: TodoPagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoPagesService],
    }).compile();

    service = module.get<TodoPagesService>(TodoPagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
