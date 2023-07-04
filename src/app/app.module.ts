import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import '@aotw/components';
import { AotwIconRegistry } from '@aotw/components';

import { icons } from '../assets/icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer';
import { HeaderComponent } from './components/header';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FooterComponent,
    HeaderComponent,
    HttpClientModule,
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
