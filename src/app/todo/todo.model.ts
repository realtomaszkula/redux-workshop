export interface Todo {
  id: string;
  content: string;
  isDone: boolean;
}

export type TodoFilter = 'active' | 'pending';