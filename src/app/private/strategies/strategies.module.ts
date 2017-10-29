import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { StrategiesComponent } from './strategies/strategies.component';
import {StrategiesRoutingModule} from "./strategies-routing.module";
import {ChartModule} from 'primeng/primeng';
import { ListStrategiesComponent } from './list-strategies/list-strategies.component';
import {StrategiesService} from "../services/strategies.service";
import {AnalysisService} from "../services/analysis.service";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    StrategiesRoutingModule,
    ChartModule
  ],
  providers:[StrategiesService,AnalysisService],
  declarations: [StrategiesComponent, ListStrategiesComponent],
  exports:[
    ListStrategiesComponent
  ],
})
export class StrategiesModule { }
