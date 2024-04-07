import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStartegy } from './jwt.startegy';

@Module({
  imports:[
    MongooseModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret:"secret",
      signOptions:{
        expiresIn:'1h'
      }
    })
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStartegy],
})
export class UsersModule {}
