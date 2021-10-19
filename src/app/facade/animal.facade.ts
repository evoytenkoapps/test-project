import { Observable } from 'rxjs';
import { IAnimalStateModel } from '../state/animal-state';

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
  public abstract addAnimal(animal: string): void;
  // КР нужны ли статусы для каждого акшина? Как их получить
  public abstract resetAnimals(): void;
  public abstract getAnimals(): Observable<IAnimals>;
  public abstract getAddAnimalStatus(): Observable<MyStatus>;
  public abstract incrementAction(): void;
  public abstract getCounter(): Observable<number>;
  public abstract getAllState(): Observable<IAnimalStateModel>;
  public abstract empty(): void;
}
