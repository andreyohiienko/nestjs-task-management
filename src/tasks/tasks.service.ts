import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/auth/user.entity'
import { CreateTaskDto } from './dto/create-task-dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'
import { TaskStatus } from './task-status.enam'
import { Task } from './task.entity'
import { TaskRepository } from './task.repositoty'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private TaskRepository: TaskRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.TaskRepository.getTasks(filterDto)
  }

  // getAllTasks(): Task[] {
  //   return this.tasks
  // }
  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto
  //   let tasks = this.getAllTasks()
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status)
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.includes(search) || task.description.includes(search),
  //     )
  //   }
  //   return tasks
  // }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.TaskRepository.findOne(id)

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`)
    }

    return found
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.TaskRepository.createTask(createTaskDto, user)
  }

  async deleteTask(id: number): Promise<number> {
    const result = await this.TaskRepository.delete(id) // delete() is better for performance
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`)
    }
    return id
  }

  // async deleteTask(id: number): Promise<number> {
  //   const found = await this.getTaskById(id)
  //   await this.TaskRepository.remove(found)

  //   return id
  // }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id)
    task.status = status
    await task.save()
    return task
  }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id)
  //   task.status = status
  //   return task
  // }
}
