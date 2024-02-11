import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoPageDto } from './create-todo-page.dto';

export class UpdateTodoPageDto extends PartialType(CreateTodoPageDto) {}
