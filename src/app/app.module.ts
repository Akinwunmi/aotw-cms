import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import '@aotw/components';
import { AotwIconRegistry } from '@aotw/components';

import { icons } from '../assets/icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer';
import { HeaderComponent } from './header';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FooterComponent,
    HeaderComponent,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  public constructor() {
    AotwIconRegistry.register(icons);
  }
}
