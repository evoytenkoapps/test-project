import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AddAnimal } from './animal.actions';
import produce from 'immer';

export interface IAnimalStateModel {
  animal: string;
}

@State<IAnimalStateModel>({
  name: 'animals',
  defaults: {
    animal: '',
  },
})
@Injectable()
export class AnimalState {
  @Selector()
  static selectAnimal(state: IAnimalStateModel): string {
    return state.animal;
  }

  @Action(AddAnimal)
  addAnimal({ getState, setState }: StateContext<IAnimalStateModel>, { animal }: AddAnimal): void {
    setState(
      produce((draft) => {
        draft.animal = animal;
      })
    );
  }
}
