import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComparisonsComponent } from './comparisons/comparisons.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AnalysisRoutingModule } from './analysis-routing.module';
import {ChartModule} from "primeng/components/chart/chart";
import { SharedModule } from '../../common/shared.module';

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
    ComparisonsComponent
  ],
  exports:[
    ComparisonsComponent
  ],
})
export class AnalysisModule { }
