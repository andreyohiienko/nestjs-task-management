import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { TaskStatus } from './task-status.enam'

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  status: TaskStatus
}