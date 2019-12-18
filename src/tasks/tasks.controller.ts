import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskModel } from './task.model';

@Controller('tasks')
export class TasksController {

  constructor(private tasksService: TasksService) {
  }

  @Get()
  getAllTasks(): TaskModel[] {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(@Body('title') title: string,
             @Body('description') description: string) {
    return this.tasksService.createTask(title, description);
  }

}
