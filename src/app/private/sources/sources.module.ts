import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSourcesComponent } from './list-sources/list-sources.component';
import { NewSourceComponent } from './new-source/new-source.component';
import {SourcesRoutingModule} from "./sources-routing.module";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {ChartModule} from "primeng/components/chart/chart";
import {CalendarModule} from "primeng/components/calendar/calendar";
import {DataTableModule} from "primeng/components/datatable/datatable";
import {SharedModule} from "../../common/shared.module";
import {ConfirmationPopoverModule} from "angular-confirmation-popover";
import {PaginatorModule} from "primeng/components/paginator/paginator";
import {SourcesService} from "../services/sources.service";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SourcesRoutingModule,
    ChartModule,
    CalendarModule,
    DataTableModule,
    SharedModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'confirm' // set defaults here
    }),
    PaginatorModule
  ],
  providers:[SourcesService],
  declarations: [
    ListSourcesComponent,
    NewSourceComponent
  ],
  exports:[
    ListSourcesComponent
  ],
})
export class SourcesModule { }
