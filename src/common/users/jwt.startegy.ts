import { Injectable, UnauthorizedException } from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from './users.service';
@Injectable()
export class JwtStartegy extends PassportStrategy(Strategy){
  constructor(private readonly userService: UsersService){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:'my_secret_key',
      
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