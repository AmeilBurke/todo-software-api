import { Module } from '@nestjs/common';
import { InvitedListsService } from './invited-lists.service';
import { InvitedListsController } from './invited-lists.controller';

@Module({
  controllers: [InvitedListsController],
  providers: [InvitedListsService],
})
export class InvitedListsModule {}
