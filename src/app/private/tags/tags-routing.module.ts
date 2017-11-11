import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ListTagsComponent} from "./list-tags/list-tags.component";
import {NewTagComponent} from "./new-tag/new-tag.component";
import {AuthGuard} from "../../common/guards/auth.guard";

const routes: Routes = [
  {
    path: '', component: ListTagsComponent
  },
  {
    path: 'new', component: NewTagComponent, canActivate: [ AuthGuard ]
  },
  {
    path: 'edit/:id', component: NewTagComponent, canActivate: [ AuthGuard ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class TagsRoutingModule { }
