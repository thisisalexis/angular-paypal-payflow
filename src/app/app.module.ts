import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgGtcPayflowModule} from './ngGtcPayflow/ng-payflow.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgGtcPayflowModule
  ],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
