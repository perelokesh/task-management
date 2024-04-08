import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './common/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import {ConfigModule, ConfigService} from '@nestjs/config'
import { config } from 'process';
import { TasksModule } from './common/tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(config: ConfigService) => ({
        uri: config.get('MONGO_DB')
      })
    }),
    TasksModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 
