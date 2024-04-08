import { Ref, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { BaseModel } from "src/common/model/base.model";
import { User } from "src/common/users/entities/user.entity";

export class Task extends BaseModel{
  @prop({required: true})
  title:string;

  @prop({required: true})
  description:string;

  @prop({required: true})
  dueDate:string;

  @prop({enum: ['pending', 'in-progress', 'completed'], default: 'pending'})
  status: string;

  @prop({ type: Types.ObjectId, ref: 'User' }) // Assuming the name of the User model is 'User'
  user: Types.ObjectId;
}
