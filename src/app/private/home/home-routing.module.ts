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
  {
     path: 'strategies', loadChildren:'./../strategies/strategies.module#StrategiesModule',
     data: { name: 'Estrategias' }, canActivate: [ AuthGuard ]
   },
  {
    path: 'sources', loadChildren:'./../sources/sources.module#SourcesModule',
    data: { name: 'Sources' }, canActivate: [ AuthGuard ]
  },
  {
    path: 'tags', loadChildren:'./../tags/tags.module#TagsModule',
    data: { name: 'Tags' }, canActivate: [ AuthGuard ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class HomeRoutingModule { }
