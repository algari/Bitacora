import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HomeRoutingModule,
    //ProjectModule en este caso seria la modulo principal que se cargara en Home
  ],
  declarations: [
    HomeComponent,
  ]
})
export class HomeModule { }
