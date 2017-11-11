import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ListSourcesComponent} from "./list-sources/list-sources.component";
import {NewSourceComponent} from "./new-source/new-source.component";
import {AuthGuard} from "../../common/guards/auth.guard";

const routes: Routes = [
  {
    path: '', component: ListSourcesComponent
  },
  {
    path: 'new', component: NewSourceComponent, canActivate: [ AuthGuard ]
  },
  {
    path: 'edit/:id', component: NewSourceComponent, canActivate: [ AuthGuard ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class SourcesRoutingModule { }
