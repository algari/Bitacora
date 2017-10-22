import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { StrategiesComponent } from './strategies/strategies.component';
import {StrategiesRoutingModule} from "./strategies-routing.module";
import {ChartModule} from 'primeng/primeng';
import { ListStrategiesComponent } from './list-strategies/list-strategies.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    StrategiesRoutingModule,
    ChartModule
  ],
  declarations: [StrategiesComponent, ListStrategiesComponent],
  exports:[
    ListStrategiesComponent
  ],
})
export class StrategiesModule { }
