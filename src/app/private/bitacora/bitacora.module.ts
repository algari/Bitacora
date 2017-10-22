import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BitacoraComponent} from "./new-bitacora/bitacora.component";
import {BitacoraRoutingModule} from "./bitacora-routing.module";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";

import {CalendarModule} from 'primeng/primeng';
import { ListBitacoraComponent } from './list-bitacora/list-bitacora.component';

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
    ListBitacoraComponent,
  ],
  exports:[
    BitacoraComponent
  ],
})
export class BitacoraModule { }
