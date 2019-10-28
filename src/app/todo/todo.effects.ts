import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions) {}
}
