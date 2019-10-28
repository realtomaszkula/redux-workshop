import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TodoEffects } from './todo.effects';
import * as fromTodo from './todo.reducer';
import { TodoComponent } from './todo/todo.component';

@NgModule({
  declarations: [TodoComponent],
  imports: [
    FormsModule,
    CommonModule,
    StoreModule.forFeature(fromTodo.todoFeatureKey, fromTodo.reducer),
    EffectsModule.forFeature([TodoEffects])
  ],
  exports: [TodoComponent]
})
export class TodoModule {}
