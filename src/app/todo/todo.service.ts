import { Injectable } from '@angular/core';
import { Observable, of, throwError, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor() {}

  remove(id: string): Observable<void> {
    return timer(500).pipe(
      switchMap(() =>
        Math.random() > 0.25
          ? of(undefined)
          : throwError(new Error('failed to remove'))
      )
    );
  }

  toggle(id: string): Observable<void> {
    return timer(500).pipe(
      switchMap(() =>
        Math.random() > 0.25
          ? of(undefined)
          : throwError(new Error('failed to toggle'))
      )
    );
  }
}
