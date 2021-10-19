import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { AnimalState } from './state/animal-state';
import { Actions, NgxsModule, Store } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsActionsExecutingModule } from '@ngxs-labs/actions-executing';
import { AnimalFacade } from './facade/animal.facade';
import { AnimalNgxsFacade } from './facade/animal-ngxs.facade';

@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([AnimalState], { developmentMode: true }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsActionsExecutingModule.forRoot(),
  ],
  providers: [
    {
      provide: AnimalFacade,
      useFactory: (store: Store, actions: Actions) => {
        return new AnimalNgxsFacade(store, actions);
      },
      deps: [Store, Actions],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
