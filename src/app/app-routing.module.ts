import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PublicGuard } from './common/guards/public.guard';
import { AuthGuard } from './common/guards/auth.guard';
import { HomeComponent } from './private/home/home.component';
import {NotFoundComponent} from "./common/not-found/not-found.component";


export const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: '/login'
  },
   {
     path: 'login',
     loadChildren:'./public/login/login.module#LoginModule',
     pathMatch: 'full',
     canActivate: [ PublicGuard ]
   },
  {
    path: 'private', loadChildren:'./private/home/home.module#HomeModule',
    data: { name: 'Home' },canActivate: [ AuthGuard ]
  },
  {
    path: '**', component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  declarations: []
})
export class AppRoutingModule { }
