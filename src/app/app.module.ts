import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { GraphModule, NgxGraphModule } from '@swimlane/ngx-graph';
import { NgxGraphOrgTreeComponent } from './components/ngx-graph-org-tree/ngx-graph-org-tree.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, MainComponent, NgxGraphOrgTreeComponent],
  imports: [BrowserModule, NgxGraphModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
