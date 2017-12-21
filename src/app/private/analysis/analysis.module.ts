import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComparisonsComponent } from './comparisons/comparisons.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AnalysisRoutingModule } from './analysis-routing.module';
import {ChartModule} from "primeng/components/chart/chart";
import { SharedModule } from '../../common/shared.module';
import { SummaryComponent } from './summary/summary.component';
import { TagsComponent } from './tags/tags.component';
import { TickerComponent } from './ticker/ticker.component';

import {MessagesModule} from 'primeng/primeng';
import {MessageModule} from 'primeng/primeng';
import { FilterComponent } from './filter/filter.component';
import {CalendarModule} from "primeng/components/calendar/calendar";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AnalysisRoutingModule,
    ChartModule,
    SharedModule,
    CalendarModule,
    MessagesModule,
    MessageModule
  ],
  declarations: [
    ComparisonsComponent,
    SummaryComponent,
    TagsComponent,
    TickerComponent,
    FilterComponent
  ],
  exports:[
    ComparisonsComponent
  ],
})
export class AnalysisModule { }
