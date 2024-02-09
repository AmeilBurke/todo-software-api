import { Injectable } from '@nestjs/common';
import { CreateInvitedListDto } from './dto/create-invited-list.dto';
import { UpdateInvitedListDto } from './dto/update-invited-list.dto';

@Injectable()
export class InvitedListsService {
  create(createInvitedListDto: CreateInvitedListDto) {
    return 'This action adds a new invitedList';
  }

  findAll() {
    return `This action returns all invitedLists`;
  }

  findOne(id: number) {
    return `This action returns a #${id} invitedList`;
  }

  update(id: number, updateInvitedListDto: UpdateInvitedListDto) {
    return `This action updates a #${id} invitedList`;
  }

  remove(id: number) {
    return `This action removes a #${id} invitedList`;
  }
}
