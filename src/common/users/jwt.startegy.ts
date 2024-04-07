import { Injectable, UnauthorizedException } from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class JwtStartegy extends PassportStrategy(Strategy){
  constructor(
    private readonly userService: UsersService,
    private readonly configservice: ConfigService,
    ){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configservice.get('JWT_SECRET'),
      
    });
    }
    async validate(payload:any){
      const user =  this.userService.findByName({name:payload.name});
      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }
      
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
}