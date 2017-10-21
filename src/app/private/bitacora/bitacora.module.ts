import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BitacoraComponent} from "./bitacora.component";
import {BitacoraRoutingModule} from "./bitacora-routing.module";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";

import {CalendarModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BitacoraRoutingModule,
    ReactiveFormsModule,
    CalendarModule
  ],
  declarations: [
    BitacoraComponent,
  ],
  exports:[
    BitacoraComponent
  ],
})
export class BitacoraModule { }
