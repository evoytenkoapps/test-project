import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { FeatureFlagsService, MyConfigType } from './FeatureFlagsService';
import { ViewService } from './view.service';
import { DesktopService } from './desktop.service';
import { MobileService } from './mobile-service';

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
    {
      provide: ViewService,
      useFactory: (service: FeatureFlagsService) => {
        if (service.config === MyConfigType.desktop) {
          return new DesktopService();
        }
        return new MobileService();
      },
      deps: [FeatureFlagsService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
