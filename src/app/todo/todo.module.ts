import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromTodo from './todo.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './todo.effects';
import { TodoComponent } from './todo/todo.component';


@NgModule({
  declarations: [TodoComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromTodo.todoFeatureKey, fromTodo.reducer),
    EffectsModule.forFeature([TodoEffects])
  ],
  exports: [TodoComponent]
})
export class TodoModule { }
