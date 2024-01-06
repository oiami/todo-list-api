import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Todo, TodoStatus } from './todo-list.model';
import { TodoListService } from './todo-list.service';
import { CreateTodoDTO, UpdateTodoDTO } from './todo-list.dto';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('todo-list')
@ApiTags('TodoList')
export class TodoListController {
  constructor(private todoListService: TodoListService) {}

  @Get()
  getTodoList(): Todo[] {
    return this.todoListService.getAllTodoLists();
  }

  @Get('/:id')
  getTodoById(@Param('id') id: string): Todo {
    const todo: Todo = this.todoListService.getTodoListById(id);
    if (!todo) {
      throw new NotFoundException();
    }

    return todo;
  }

  @Post()
  createTodoList(@Body() todo: CreateTodoDTO): Todo[] {
    try {
      return this.todoListService.createTodoList(todo);
    } catch {
      throw new BadRequestException();
    }
  }

  @Patch('/:id')
  updateTodo(@Param('id') id: string, @Body() update: UpdateTodoDTO): Todo {
    try {
      return this.todoListService.updateTodo(id, update);
    } catch {
      throw new BadRequestException();
    }
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string): { deletedId: string } {
    return this.todoListService.deleteTodo(id);
  }
}
