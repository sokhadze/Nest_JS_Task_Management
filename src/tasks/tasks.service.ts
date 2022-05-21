import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskModel, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: TaskModel[] = [];

  getAllTasks(): TaskModel[] {
    return this.tasks;
  }

  getTasksWithFilter(filterDto: GetTasksFilterDto): TaskModel[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(task =>
        task.title.includes(search) ||
        task.description.includes(search),
      );
    }

    return tasks;
  }

  getTaskById(id: number): TaskModel {
    const found = this.tasks.find(task => task.id === id);

    if (!found) {
      throw new NotFoundException(`Task with ID - ${id} not found`);
    }

    return found;
  }

  createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;
    const task: TaskModel = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  updateTaskStatus(id: number, status: TaskStatus): TaskModel {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  deleteTask(id: number): any {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter(task => task.id !== found.id);

    return {status: 'success', message: `Deleted Task - ID ${id}`};
  }
}
