import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WelcomeModule } from './welcome/welcome.module';
import { AppRoutingModule } from './app-routing.module';
import { CharacterDetailsComponent } from './character-details/character-details.component';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    WelcomeModule
  ],
  declarations: [
    AppComponent,
    CharacterDetailsComponent

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
