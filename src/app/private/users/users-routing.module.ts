import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from "@angular/router";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {AuthGuard} from "../../common/guards/auth.guard";
import {ChangeAlertsComponent} from "./change-alerts/change-alerts.component";

const routes: Routes = [
  {
    path: 'changepassword', component: ChangePasswordComponent, canActivate: [ AuthGuard ]
  },
  {
    path: 'changealerts', component: ChangeAlertsComponent, canActivate: [ AuthGuard ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class UsersRoutingModule { }
