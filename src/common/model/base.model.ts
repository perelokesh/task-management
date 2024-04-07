import { buildSchema, getModelForClass, prop } from "@typegoose/typegoose";
import { Schema } from "mongoose";

export abstract class BaseModel{
@prop({timestamps:true})
createdAt?:Date;

@prop()
updatedAt?:Date;

id?:string;

static get Model(){
 return getModelForClass(this as any);
}

static get modelName():string{
 return this.name;
}


static get schema(): Schema{
  return buildSchema(this as any,{
    schemaOptions:{
      timestamps:true,
      toJSON:{
        getters:true, 
        virtuals:true,
      }
    }
  })
}
}