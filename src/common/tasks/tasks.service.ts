import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '../users/entities/user.entity';
import { Request } from 'express';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.modelName) private readonly taskModel:ReturnModelType<typeof Task>,
    @InjectModel(Task.modelName) private readonly userModel: ReturnModelType<typeof User>
  ){}
  
  async create(createTaskDto: Task):Promise<Task> {
    const {description, dueDate,status,title, user} = createTaskDto
    const task = new this.taskModel({
      title, 
      description,
      dueDate,
      status,
      user
    });
    const savedTask =  await task.save();
    return savedTask;
  }

  findAll() {
    return `This action returns all tasks`;
  }

  async findOne(id: string):Promise<Task> {
    const task =  await this.taskModel.findById(id);
    return task;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
