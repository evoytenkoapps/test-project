import { APP_INITIALIZER, InjectionToken, NgModule } from '@angular/core';
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
export const APP_TOKEN: InjectionToken<string> = new InjectionToken<string>('APP_TOKEN');

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

    {
      provide: APP_TOKEN,
      useFactory: () => (x: number) => {
        console.log('Object created', +new Date());
        return {
          a: x,
        };
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
