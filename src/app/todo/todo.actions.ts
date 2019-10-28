import { createAction, props } from '@ngrx/store';
import { TodoFilter } from './todo.model';

export const add = createAction(
  '[Todo] Add Todo',
  props<{ id: string; content: string }>()
);

export const remove = createAction(
  '[Todo] Remove Todo',
  props<{ id: string }>()
);

export const toggle = createAction(
  '[Todo] Toggle Todo',
  props<{ id: string }>()
);

export const filterChanged = createAction(
  '[Todo] Todo Filter Changed',
  props<{ filter: TodoFilter | null }>()
);
