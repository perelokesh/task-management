import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { ReturnModelType } from '@typegoose/typegoose';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import {JwtService} from '@nestjs/jwt'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.modelName) 
  private readonly userModel: ReturnModelType<typeof User>,
  private readonly jwtService:JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const {username, password} = createUserDto;
    const hashPassword = await this.hashPwd(password);
    const user = new this.userModel({username, password: hashPassword});
    return await user.save();
  }
  async login(loginUserDto: LoginUserDto){
    const {username, password} = loginUserDto;
    const user = await this.userModel.findOne({username})
    if(!user){
      throw new NotFoundException("User Not found")
    }
    const validatePwd = await this.compare(password,user.password)
    if (!validatePwd) {
      throw new NotFoundException("Wrong Password");
    }
    return await this.generateToken(user)

  }

  async findAll():Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    return user;
  }
  

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
   
  async findbyId(id:string){
    return await this.userModel.findById(id);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  async hashPwd(password:string):Promise<string>{
    return bcrypt.hash(password,10)
  }
  async compare(password:string, hash:string):Promise<boolean> {
    return bcrypt.compare(password, hash)
  }

  async generateToken(
    user:Partial<User>
  ):Promise<{accessToken:string}>{
   const accessToken = await this.jwtService.signAsync(
   {
    user: user.username

   },
   {
    secret:"secret",
    expiresIn:'1h'
   }
    );
    return {accessToken};
  }
  async findByName(name:any):Promise<null>{
    return this.userModel.findById({name:name})
  }
}
