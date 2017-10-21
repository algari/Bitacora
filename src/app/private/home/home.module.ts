import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {BitacoraModule} from "../bitacora/bitacora.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HomeRoutingModule,
    BitacoraModule
    //ProjectModule en este caso seria la modulo principal que se cargara en Home
  ],
  declarations: [
    HomeComponent,

  ]
})
export class HomeModule { }
