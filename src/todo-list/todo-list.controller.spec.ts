import { Test, TestingModule } from '@nestjs/testing';
import { TodoListController } from './todo-list.controller';
import { TodoListService } from './todo-list.service';
import { Todo, TodoStatus } from './todo-list.model';

describe('TodoListController', () => {
  let todoListController: TodoListController;
  let todoListService: TodoListService;
  const todoList: Todo[] = [
    {
      id: 'd155b925-fbda-4eb3-a418-7ebaba16a8b8',
      title: 'Walking do',
      status: 'OPEN' as TodoStatus,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoListController],
      providers: [TodoListService],
    }).compile();

    todoListController = module.get<TodoListController>(TodoListController);
    todoListService = module.get<TodoListService>(TodoListService);
  });

  it('should be defined', () => {
    expect(todoListController).toBeDefined();
    expect(todoListService).toBeDefined();
  });

  describe('getTodoList', () => {
    it('should return an array of todo list', () => {
      jest
        .spyOn(todoListService, 'getAllTodoLists')
        .mockImplementation(() => todoList);

      expect(todoListController.getTodoList()).toEqual(todoList);
    });
  });

  describe('getTodoListById', () => {
    it('should return a todo item', () => {
      jest
        .spyOn(todoListService, 'getTodoListById')
        .mockImplementation(() => todoList[0]);

      expect(
        todoListController.getTodoById('d155b925-fbda-4eb3-a418-7ebaba16a8b8'),
      ).toEqual(todoList[0]);
    });

    it('should return not found error when data does not found from given ID', () => {
      jest
        .spyOn(todoListService, 'getTodoListById')
        .mockImplementation(() => null);

      expect(() => {
        todoListController.getTodoById('abc');
      }).toThrow();
    });
  });

  describe('createTodoList', () => {
    it('should return created todo list', () => {
      jest
        .spyOn(todoListService, 'createTodoList')
        .mockImplementation(() => todoList);

      expect(todoListController.createTodoList(todoList[0])).toEqual(todoList);
    });
  });

  describe('updateTodo', () => {
    it('should update to todo', () => {
      jest.spyOn(todoListService, 'updateTodo').mockImplementation(() => ({
        ...todoList[0],
        status: 'DONE' as TodoStatus,
      }));

      const updatedTodo: Todo = todoListController.updateTodo(todoList[0].id, {
        status: TodoStatus.DONE,
      });
      expect(updatedTodo.status).toEqual('DONE');
    });
  });

  describe('deleteTodo', () => {
    it('should return deleted todo ID', () => {
      jest.spyOn(todoListService, 'deleteTodo').mockImplementation(() => ({
        deletedId: 'abc',
      }));

      expect(todoListController.deleteTodo('abc')).toEqual({
        deletedId: 'abc',
      });
    });
  });
});
