import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HttpService } from './common/services/http.service';
import { Ng2Webstorage } from 'ngx-webstorage';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { PublicGuard } from './common/guards/public.guard';
import { AuthGuard } from './common/guards/auth.guard';
import { AuthenticationService } from './public/services/authentication.service';
import { HeaderComponent } from './common/header/header.component';
import {NotFoundComponent} from "./common/not-found/not-found.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    Ng2Webstorage,

  ],
  providers: [
    HttpService,
    AuthenticationService,
    PublicGuard,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
