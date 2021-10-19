import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AddAnimal, EmptyAction, IncCounterAction, ResetAnimals } from './animal.actions';
import produce from 'immer';

export interface IAnimalStateModel {
  animals: string[];
  counter: number;
}

@State<IAnimalStateModel>({
  name: 'animals',
  defaults: {
    animals: [],
    counter: 0,
  },
})
@Injectable()
export class AnimalState {
  @Selector()
  static selectAnimals(state: IAnimalStateModel): string[] {
    return state.animals;
  }

  @Selector()
  static selectCounter(state: IAnimalStateModel): number {
    return state.counter;
  }

  @Selector()
  static selectState(state: IAnimalStateModel): IAnimalStateModel {
    return state;
  }

  @Action(AddAnimal)
  addAnimal({ getState, setState }: StateContext<IAnimalStateModel>, { animal }: AddAnimal): void {
    setState(
      produce((draft) => {
        draft.animals.push(animal);
      })
    );
  }

  @Action(IncCounterAction)
  someEmptyAction({ getState, setState }: StateContext<IAnimalStateModel>): void {
    setState(
      produce((draft) => {
        draft.counter++;
      })
    );
  }

  @Action(ResetAnimals)
  resetAnimals({ getState, setState }: StateContext<IAnimalStateModel>): void {
    setState(
      produce((draft) => {
        draft.animals = [];
      })
    );
  }

  @Action(EmptyAction)
  emptyAction({ getState, setState }: StateContext<IAnimalStateModel>): void {
    setState(
      produce((draft) => {
        return draft;
      })
    );
  }
}
