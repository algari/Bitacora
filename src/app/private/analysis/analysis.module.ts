import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComparisonsComponent } from './comparisons/comparisons.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AnalysisRoutingModule } from './analysis-routing.module';
import {ChartModule} from "primeng/components/chart/chart";
import { SharedModule } from '../../common/shared.module';
import { SummaryComponent } from './summary/summary.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AnalysisRoutingModule,
    ChartModule,
    SharedModule,
  ],
  declarations: [
    ComparisonsComponent,
    SummaryComponent
  ],
  exports:[
    ComparisonsComponent
  ],
})
export class AnalysisModule { }
