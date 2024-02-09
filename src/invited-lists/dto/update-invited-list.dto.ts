import { PartialType } from '@nestjs/mapped-types';
import { CreateInvitedListDto } from './create-invited-list.dto';

export class UpdateInvitedListDto extends PartialType(CreateInvitedListDto) {}
