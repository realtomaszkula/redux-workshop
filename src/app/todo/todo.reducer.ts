import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as TodoActions from './todo.actions';
import { Todo, TodoFilter } from './todo.model';

export const todoFeatureKey = 'todo';

const feature = createFeatureSelector<State>(todoFeatureKey);

export const selectTodos = createSelector(
  feature,
  state => state.todos
);

export const selectFilter = createSelector(
  feature,
  state => state.filter
);

export const selectRemovingIds = createSelector(
  feature,
  state => state.removingIds
);

export const selectTogglingIds = createSelector(
  feature,
  state => state.togglingIds
);

export const selectIsToggling = createSelector(
  selectTogglingIds,
  (ids: string[], { id }: { id: string }) => ids.includes(id)
);

export const selectIsRemoving = createSelector(
  selectRemovingIds,
  (ids: string[], { id }: { id: string }) => ids.includes(id)
);

export const selectIsLocked = createSelector(
  selectIsRemoving,
  selectIsToggling,
  (t, r) => t || r
);

export const selectFilteredTodos = createSelector(
  selectTodos,
  selectFilter,
  (todos, filter) => {
    switch (filter) {
      case 'active':
        return todos.filter(t => t.isDone);
      case 'pending':
        return todos.filter(t => !t.isDone);
      default:
        return todos;
    }
  }
);

export const selectTodosLength = createSelector(
  selectTodos,
  todos => todos.length
);

export interface State {
  todos: Todo[];
  filter: TodoFilter | null;
  removingIds: string[];
  togglingIds: string[];
}

export const initialState: State = {
  todos: [],
  filter: null,
  removingIds: [],
  togglingIds: [],
};

const todoReducer = createReducer(
  initialState,
  on(TodoActions.add, (state, { id, content }) => {
    return {
      ...state,
      todos: [...state.todos, { id, content, isDone: false }]
    };
  }),
  on(TodoActions.remove, (state, { id }) => {
    return {
      ...state,
      removingIds: [...state.removingIds, id]
    };
  }),
  on(TodoActions.removeError, (state, { id }) => {
    return {
      ...state,
      removingIds: state.removingIds.filter(i => i !== id)
    };
  }),
  on(TodoActions.removeSuccess, (state, { id }) => {
    return {
      ...state,
      removingIds: state.removingIds.filter(i => i !== id),
      todos: state.todos.filter(t => t.id !== id)
    };
  }),
  on(TodoActions.toggle, (state, { id }) => {
    return {
      ...state,
      togglingIds: [...state.togglingIds, id],
    };
  }),
  on(TodoActions.toggleError, (state, { id }) => {
    return {
      ...state,
      togglingIds: state.togglingIds.filter(i => i !==id),
    };
  }),
  on(TodoActions.toggleSuccess, (state, { id }) => {
    return {
      ...state,
      togglingIds: state.togglingIds.filter(i => i !==id),
      todos: state.todos.map(t =>
        t.id === id ? { ...t, isDone: !t.isDone } : t
      )
    };
  }),
  on(TodoActions.filterChanged, (state, { filter }) => {
    return {
      ...state,
      filter
    };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return todoReducer(state, action);
}
