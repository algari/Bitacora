import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { StrategiesComponent } from './strategies/strategies.component';
import {StrategiesRoutingModule} from "./strategies-routing.module";
import {ChartModule, FileUploadModule} from 'primeng/primeng';
import { ListStrategiesComponent } from './list-strategies/list-strategies.component';
import {StrategiesService} from "../services/strategies.service";
import {AnalysisService} from "../services/analysis.service";
import {ReactiveFormsModule} from "@angular/forms";
import { CalendarModule } from 'primeng/components/calendar/calendar';
import {ConfirmationPopoverModule} from "angular-confirmation-popover";
import {PaginatorModule} from 'primeng/primeng';
import {DataTableModule} from 'primeng/primeng';
import {SharedModule} from "../../common/shared.module";
import { NewStrategyComponent } from './new-strategy/new-strategy.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    StrategiesRoutingModule,
    ChartModule,
    CalendarModule,
    DataTableModule,
    SharedModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'confirm' // set defaults here
    }),
    PaginatorModule,
    FileUploadModule
  ],
  providers:[StrategiesService,AnalysisService],
  declarations: [
    StrategiesComponent,
    ListStrategiesComponent,
    NewStrategyComponent,
    ],
  exports:[
    ListStrategiesComponent
  ],
})
export class StrategiesModule { }
