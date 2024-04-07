import {prop} from '@typegoose/typegoose'
import { BaseModel } from 'src/common/model/base.model';

export class User extends BaseModel {
  @prop({unique:true})
  username: string;

  @prop()
  password: string;

}
