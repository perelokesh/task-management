import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStartegy } from './jwt.startegy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[
    ConfigModule.forRoot(),
    MongooseModule.forFeature([User]),
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
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStartegy],
})
export class UsersModule {}
