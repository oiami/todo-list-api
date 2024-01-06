import { TodoListService } from './todo-list.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Todo, TodoStatus } from './todo-list.model';

describe('TodoListService', () => {
  let todoListService: TodoListService;
  let initiatedTodoList: Todo[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoListService],
    }).compile();

    todoListService = module.get<TodoListService>(TodoListService);
    initiatedTodoList = todoListService.createTodoList({ title: 'Walking do' });
  });

  it('should create todo list', () => {
    const todoList: Todo[] = todoListService.createTodoList({
      title: 'Call a client',
    });

    expect(todoList.length).toEqual(2);
    expect(todoList[1]).toEqual(
      expect.objectContaining({ status: 'OPEN', title: 'Call a client' }),
    );
  });

  it('should return array list', () => {
    const todoList: Todo[] = todoListService.getAllTodoLists();
    expect(todoList).toEqual(initiatedTodoList);
  });

  it('should return a todo item', () => {
    const todo: Todo = todoListService.getTodoListById(initiatedTodoList[0].id);
    expect(todo).toEqual(initiatedTodoList[0]);
  });

  it('should update a target todo status', () => {
    const todo: Todo = todoListService.updateTodo(initiatedTodoList[0].id, {
      status: TodoStatus.DONE,
    });
    expect(todo.status).toEqual('DONE');
  });

  it('should throw and error when update id does not exist', () => {
    expect(() => {
      todoListService.updateTodo('abc', { status: TodoStatus.DONE });
    }).toThrow(/Not Found/);
  });

  it('should delete a target todo from the list', () => {
    const { deletedId }: { deletedId: string } = todoListService.deleteTodo(
      initiatedTodoList[0].id,
    );
    expect(deletedId).toEqual(initiatedTodoList[0].id);

    const restTodo: Todo[] = todoListService.getAllTodoLists();
    expect(restTodo.length).toEqual(0);
  });
});
