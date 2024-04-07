import { Ref, prop } from "@typegoose/typegoose";
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

  @prop({ref: User})
  user: Ref<User>
}
