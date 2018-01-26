import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTagsComponent } from './list-tags/list-tags.component';
import { NewTagComponent } from './new-tag/new-tag.component';
import {TagsRoutingModule} from "./tags-routing.module";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {ChartModule} from "primeng/components/chart/chart";
import {CalendarModule} from "primeng/components/calendar/calendar";
import {DataTableModule} from "primeng/components/datatable/datatable";
import {SharedModule} from "../../common/shared.module";
import {ConfirmationPopoverModule} from "angular-confirmation-popover";
import {PaginatorModule} from "primeng/components/paginator/paginator";
import {TagService} from "../services/tag.service";
import {FileUploadModule} from "primeng/primeng";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TagsRoutingModule,
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
  providers:[TagService],
  declarations: [
  ListTagsComponent,
  NewTagComponent
  ],
  exports:[
    ListTagsComponent
  ],
})
export class TagsModule { }
