import { AnimalFacade } from './animal.facade';
import { Actions, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AnimalState } from '../state/animal-state';
import { AddAnimal } from '../state/animal.actions';

export class AnimalNgxsFacade extends AnimalFacade {
  constructor(private store: Store, private actions$: Actions) {
    super();
  }

  getAnimal(): Observable<string> {
    return this.store.select(AnimalState.selectAnimal);
  }

  updateAnimal(animal: string): Observable<string> {
    return this.store.dispatch(new AddAnimal(animal));
  }
}
