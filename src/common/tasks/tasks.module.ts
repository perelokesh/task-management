import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task } from './entities/task.entity';
import { JwtStartegy } from '../users/jwt.startegy';
import { UsersService } from '../users/users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[
    ConfigModule.forRoot(),
    MongooseModule.forFeature([Task, User]),
    JwtModule.registerAsync({
     imports: [ConfigModule],
     inject:[ConfigService],
     useFactory: (config: ConfigService) => ({
      global:true,
      secret: config.get("JWT_SECRET"),
      signOptions:{
        expiresIn:'1h'
      }
     })
    }),
    UsersModule
  ],
  controllers: [TasksController],
  providers: [TasksService, JwtStartegy, UsersService],
})
export class TasksModule {}
