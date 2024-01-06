export interface Todo {
  id: string;
  title: string;
  status: TodoStatus;
}

export enum TodoStatus {
  OPEN = 'OPEN',
  DONE = 'DONE',
}
