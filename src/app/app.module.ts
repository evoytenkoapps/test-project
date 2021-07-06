import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { GraphModule, NgxGraphModule } from '@swimlane/ngx-graph';

@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [BrowserModule, NgxGraphModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
