import { Injectable } from '@nestjs/common';
import { TaskModel, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
@Injectable()
export class TasksService {
  private tasks: TaskModel[] = [];

  getAllTasks(): TaskModel[] {
    return this.tasks;
  }

  createTask(title: string, description: string) {
    const task: TaskModel = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
}
