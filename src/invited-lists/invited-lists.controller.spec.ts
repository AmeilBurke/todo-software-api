import { Test, TestingModule } from '@nestjs/testing';
import { InvitedListsController } from './invited-lists.controller';
import { InvitedListsService } from './invited-lists.service';

describe('InvitedListsController', () => {
  let controller: InvitedListsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvitedListsController],
      providers: [InvitedListsService],
    }).compile();

    controller = module.get<InvitedListsController>(InvitedListsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
