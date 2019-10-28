import { Action, createReducer, on } from '@ngrx/store';
import * as TodoActions from './todo.actions';

export const todoFeatureKey = 'todo';

export interface State {}

export const initialState: State = {};

const todoReducer = createReducer(
  initialState,
  on(TodoActions.loadTodos, state => state)
);

export function reducer(state: State | undefined, action: Action) {
  return todoReducer(state, action);
}
