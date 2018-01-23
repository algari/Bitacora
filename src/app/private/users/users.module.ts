import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsersRoutingModule} from "./users-routing.module";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {ChartModule} from "primeng/components/chart/chart";
import {DataTableModule} from "primeng/components/datatable/datatable";
import {SharedModule} from "../../common/shared.module";
import {ConfirmationPopoverModule} from "angular-confirmation-popover";
import {PaginatorModule} from "primeng/components/paginator/paginator";
import {UsersService} from "../services/users.service";
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeAlertsComponent } from './change-alerts/change-alerts.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    ChartModule,
    DataTableModule,
    SharedModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'confirm' // set defaults here
    }),
    PaginatorModule
  ],
  providers:[UsersService],
  declarations: [ChangePasswordComponent, ChangeAlertsComponent],
  exports:[
    ChangePasswordComponent
  ],
})
export class UsersModule { }
