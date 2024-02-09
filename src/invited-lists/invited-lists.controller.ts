import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvitedListsService } from './invited-lists.service';
import { CreateInvitedListDto } from './dto/create-invited-list.dto';
import { UpdateInvitedListDto } from './dto/update-invited-list.dto';

@Controller('invited-lists')
export class InvitedListsController {
  constructor(private readonly invitedListsService: InvitedListsService) {}

  @Post()
  create(@Body() createInvitedListDto: CreateInvitedListDto) {
    return this.invitedListsService.create(createInvitedListDto);
  }

  @Get()
  findAll() {
    return this.invitedListsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invitedListsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvitedListDto: UpdateInvitedListDto) {
    return this.invitedListsService.update(+id, updateInvitedListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invitedListsService.remove(+id);
  }
}
