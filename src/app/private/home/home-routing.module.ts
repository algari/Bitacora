import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../common/guards/auth.guard';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent, pathMatch: 'full', canActivate: [ AuthGuard ]
  },
  {
     path: 'games', loadChildren:'./../games/games.module#GamesModule',
     data: { name: 'Juegos' }, canActivate: [ AuthGuard ]
  },
  // {
  //   path: 'issues', loadChildren:'./../issue/issue.module#IssueModule',
  //   data: { name: 'Issues' }, canActivate: [ AuthGuard ]
  // },
  // {
  //   path: 'usuarios', loadChildren:'./../user/user.module#UserModule',
  //   data: { name: 'Usuarios' }, canActivate: [ AuthGuard ]
  // }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class HomeRoutingModule { }
