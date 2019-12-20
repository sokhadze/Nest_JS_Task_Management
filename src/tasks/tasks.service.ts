import { Injectable } from '@nestjs/common';
import { TaskModel, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Injectable()
export class TasksService {
  private tasks: TaskModel[] = [];

  getAllTasks(): TaskModel[] {
    return this.tasks;
  }

  getTaskById(id: number): TaskModel {
    return this.tasks.find(task => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;
    const task: TaskModel = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  updateTask(id: number, updateTaskStatusDto: UpdateTaskStatusDto): TaskModel {
    const task = this.tasks.find(TASK => TASK.id === id);
    task.status = updateTaskStatusDto.status;
    this.tasks.find(value => {
      if (value.id === id) {
        value.status = updateTaskStatusDto.status;
      }
    });
    return task;
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}
