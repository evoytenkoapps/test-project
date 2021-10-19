import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export enum MyConfigType {
  desktop = 'desktop',
  mobile = 'mobile',
}

@Injectable({ providedIn: 'root' })
export class FeatureFlagsService {
  constructor(private http: HttpClient) {}

  public loadConfig(): Promise<MyConfigType> {
    return of(MyConfigType.desktop).pipe(delay(3000)).toPromise();
  }
}
