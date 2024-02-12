export class CreateTodoDto {
  todoContent: string;
  todoIsCompleted: boolean;
  todoDateCompleted?: string;
  todoCompletedBy?: number;
  todoPageId: number;
}
