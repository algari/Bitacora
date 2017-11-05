import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from "@angular/router";
import {AuthGuard} from "../../common/guards/auth.guard";
import {NewGameComponent} from "./new-game/new-game.component";
import {ListGamesComponent} from "./list-games/list-games.component";
import {EditGameComponent} from "./edit-game/edit-game.component";

const routes: Routes = [
  {
    path:'',component:ListGamesComponent
  },
  {
    path: 'new', component: NewGameComponent, canActivate: [ AuthGuard ]
  },
  {
    path: 'edit/:id', component: NewGameComponent, canActivate: [ AuthGuard ]
  },
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class GamesRoutingModule { }
