import { EntityRepository, Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
  async getTasks(filterDto: GetTasksFilterDto): Promise<TaskEntity[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('taskEntity');

    if (status) {
      query.andWhere('taskEntity.status = :status', { status });
    }

    if (search) {
      query.andWhere('taskEntity.status LIKE :search OR taskEntity.description LIKE :search', { search: `%${search}%` });
    }

    return await query.getMany();
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const { title, description } = createTaskDto;

    const task = new TaskEntity();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();

    return task;
  }

}
