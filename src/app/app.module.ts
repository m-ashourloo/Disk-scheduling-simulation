import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ChooseComponent } from './choose/choose.component';
import { UserComponent } from './user/user.component';
import { RandomComponent } from './random/random.component';






@NgModule({
  declarations: [
    AppComponent,
    ChooseComponent,
    UserComponent,
    RandomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
