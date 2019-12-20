import { TaskStatus } from '../task.model';

export class UpdateTaskDto {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}
