import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TodoStatus } from './todo-list.model';

export class CreateTodoDTO {
  @ApiProperty({ description: 'Title of todo item' })
  @IsString()
  @IsNotEmpty()
  title: string;
}

export class UpdateTodoDTO {
  @ApiProperty({ description: 'Title of todo item' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'Status of todo item', enum: TodoStatus })
  @IsEnum(TodoStatus)
  @IsOptional()
  status?: TodoStatus;
}
