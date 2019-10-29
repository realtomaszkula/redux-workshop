import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor() {}

  remove(id: string): Observable<void> {
    return of({}).pipe(
      delay(500),
      mapTo(undefined)
    );
  }

  toggle(id: string): Observable<void> {
    return of({}).pipe(
      delay(500),
      mapTo(undefined)
    );
  }
}
