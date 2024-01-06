import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo, TodoStatus } from './todo-list.model';
import { CreateTodoDTO, UpdateTodoDTO } from './todo-list.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TodoListService {
  private todolist: Todo[] = [];

  getAllTodoLists(): Todo[] {
    return this.todolist;
  }

  getTodoListById(id: string): Todo {
    return this.todolist.find((todo) => todo.id === id);
  }

  createTodoList(todolist: CreateTodoDTO): Todo[] {
    const todo: Todo = {
      id: uuid(),
      title: todolist.title,
      status: TodoStatus.OPEN,
    };

    this.todolist.push(todo);

    return this.todolist;
  }

  updateTodo(id: string, update: UpdateTodoDTO): Todo {
    const todo: Todo = this.getTodoListById(id);
    if (!todo) {
      throw new NotFoundException();
    }
    todo.title = update.title ?? todo.title;

    todo.status = update.status ?? todo.status;

    return todo;
  }

  deleteTodo(id: string): { deletedId: string } {
    const todo: Todo = this.getTodoListById(id);
    if (!todo) {
      throw new NotFoundException();
    }

    this.todolist = this.todolist.filter((todo) => todo.id !== id);

    return { deletedId: id };
  }
}
