import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import uuid from 'uuid';
import * as TodoAction from '../todo.actions';
import { Todo, TodoFilter } from '../todo.model';
import {
  selectFilter,
  selectFilteredTodos,
  selectIsLocked,
  selectIsRemoving,
  selectIsToggling,
  selectTodosLength
} from '../todo.reducer';

@Component({
  selector: 'app-todo',
  template: `
    <input [(ngModel)]="value" (keydown.enter)="add()" />
    <ul>
      <li *ngFor="let todo of todos$ | async" [class.done]="todo.isDone">
        {{ todo.content }}
        <button
          (click)="toggle(todo.id)"
          [disabled]="isLocked(todo.id) | async"
        >
          {{ (isToggling(todo.id) | async) ? 'Toggling...' : 'Toggle' }}
        </button>
        <button
          (click)="remove(todo.id)"
          [disabled]="isLocked(todo.id) | async"
        >
          {{ (isRemoving(todo.id) | async) ? 'Removing...' : 'Remove' }}
        </button>
      </li>
    </ul>

    <button (click)="filterChanged(null)">All</button>
    <button (click)="filterChanged('pending')">Pending</button>
    <button (click)="filterChanged('active')">Active</button>
    <div>Todos length: {{ length$ | async }}</div>
    <div>Current filter: {{ (filter$ | async) || 'All' }}</div>
  `,
  styles: [
    `
      .done {
        text-decoration: line-through;
      }
    `
  ]
})
export class TodoComponent {
  todos$: Observable<Todo[]> = this.store.pipe(select(selectFilteredTodos));
  length$: Observable<number> = this.store.pipe(select(selectTodosLength));
  filter$: Observable<TodoFilter | null> = this.store.pipe(
    select(selectFilter)
  );
  value: string;

  constructor(private store: Store<any>) {}

  add() {
    if (!this.value) {
      return;
    }
    this.store.dispatch(TodoAction.add({ id: uuid(), content: this.value }));
    this.value = '';
  }
  remove(id: string) {
    this.store.dispatch(TodoAction.remove({ id }));
  }
  toggle(id: string) {
    this.store.dispatch(TodoAction.toggle({ id }));
  }
  filterChanged(filter: TodoFilter | null) {
    this.store.dispatch(TodoAction.filterChanged({ filter }));
  }
  isLocked(id: string) {
    return this.store.pipe(select(selectIsLocked, { id }));
  }
  isRemoving(id: string) {
    return this.store.pipe(select(selectIsRemoving, { id }));
  }
  isToggling(id: string) {
    return this.store.pipe(select(selectIsToggling, { id }));
  }
}
