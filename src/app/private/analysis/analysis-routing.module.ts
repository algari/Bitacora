import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ComparisonsComponent } from './comparisons/comparisons.component';
import { AuthGuard } from '../../common/guards/auth.guard';
import { SummaryComponent } from './summary/summary.component';
import { TagsComponent } from './tags/tags.component';

const routes: Routes = [
  {
    path: 'comparisons', component: ComparisonsComponent, canActivate: [ AuthGuard ]
  },
  {
    path: 'summary', component: SummaryComponent, canActivate: [ AuthGuard ]
  },
  {
    path: 'tags', component: TagsComponent, canActivate: [ AuthGuard ]
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class AnalysisRoutingModule { }
