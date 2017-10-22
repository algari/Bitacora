import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {StrategiesComponent} from "./strategies/strategies.component";
import {ListStrategiesComponent} from "./list-strategies/list-strategies.component";
import {AuthGuard} from "../../common/guards/auth.guard";

const routes: Routes = [
  {
    path: '', component: ListStrategiesComponent
  },
  {
    path: 'analysis', component: StrategiesComponent, canActivate: [ AuthGuard ]
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class StrategiesRoutingModule { }
