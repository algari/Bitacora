import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ComparisonsComponent } from './comparisons/comparisons.component';

const routes: Routes = [
  {
    path: 'comparisons', component: ComparisonsComponent
  },
  // {
  //   path: 'new', component: NewTagComponent, canActivate: [ AuthGuard ]
  // },
  // {
  //   path: 'edit/:id', component: NewTagComponent, canActivate: [ AuthGuard ]
  // },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class AnalysisRoutingModule { }
