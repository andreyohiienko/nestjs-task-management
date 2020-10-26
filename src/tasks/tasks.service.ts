import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateTaskDto } from './dto/create-task-dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'
import { Task } from './task.entity'
import { TaskRepository } from './task.repositoty'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private TaskRepository: TaskRepository,
  ) {}

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

  // getTaskById(id: string): Task {
  //   const found = this.tasks.find((task) => task.id === id)
  //   if (!found) {
  //     throw new NotFoundException(`Task with ID "${id}" not found`)
  //   }
  //   return found
  // }
  // createTask(createTaskDto: CreateTaskDto) {
  //   const { title, description } = createTaskDto
  //   const task: Task = {
  //     id: v1(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   }
  //   this.tasks.push(task)
  //   return task
  // }
  // deleteTask(id: string): string {
  //   this.getTaskById(id) // checks existing of task
  //   this.tasks = this.tasks.filter((task) => task.id !== id)
  //   return id
  // }
  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id)
  //   task.status = status
  //   return task
  // }
}
