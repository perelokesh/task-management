import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDate, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  description:string;

  @ApiProperty()
  @IsDate()
  dueDate:Date;

  @ApiProperty()
  @IsEnum(['pending', 'complete', 'in progress'])
  status:string;

  @ApiProperty()
  userId:string;

 


  
}
