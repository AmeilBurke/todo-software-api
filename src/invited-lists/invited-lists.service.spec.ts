import { Test, TestingModule } from '@nestjs/testing';
import { InvitedListsService } from './invited-lists.service';

describe('InvitedListsService', () => {
  let service: InvitedListsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvitedListsService],
    }).compile();

    service = module.get<InvitedListsService>(InvitedListsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
