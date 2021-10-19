import { AnimalFacade } from './animal.facade';
import { Actions, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AnimalState } from '../state/animal-state';

export class AnimalNgxsFacade extends AnimalFacade {
  constructor(private store: Store, private actions$: Actions) {
    super();
  }

  updateData(): Observable<string> {
    return this.store.select(AnimalState.selectAnimal);
  }
}
