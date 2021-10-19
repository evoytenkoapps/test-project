import { Observable } from 'rxjs';

export interface IAnimals {
  animals: string[];
}

export enum MyStatus {
  PENDING = 'PENDING',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  ERROR = 'ERROR',
  CANCEL = 'CANCEL',
}

export abstract class AnimalFacade {
  public abstract getAnimal(): Observable<string>;
  public abstract updateAnimal(animal: string): Observable<string>;
}
