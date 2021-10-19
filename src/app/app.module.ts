import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { FeatureFlagsService } from './FeatureFlagsService';

// export function onAppInit1() {
//   return () => {
//     return new Promise((resolve, reject) => {
//       return setTimeout(() => reject(true), 5000);
//     });
//   };
// }

@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (featureFlagsService: FeatureFlagsService) => () => featureFlagsService.loadConfig(),
      multi: true,
      deps: [FeatureFlagsService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
