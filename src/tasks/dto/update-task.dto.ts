import { TaskStatus } from '../task-status.enum';

export class UpdateTaskDto {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}
