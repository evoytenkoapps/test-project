import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SomeService {
  public getData(): Observable<string> {
    return interval(2000).pipe(map(() => new Date().toISOString()));
  }
}
