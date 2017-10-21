import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from "@angular/router";
import {BitacoraComponent} from "./bitacora.component";

const routes: Routes = [
  {
    path:'',component:BitacoraComponent
  }
  ]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class BitacoraRoutingModule { }
