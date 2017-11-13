import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewGameComponent } from './new-game/new-game.component';
import { ListGamesComponent } from './list-games/list-games.component';
import { EditGameComponent } from './edit-game/edit-game.component';
import {RouterModule} from "@angular/router";
import {GamesRoutingModule} from "./games-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/components/calendar/calendar";
import {GamesService} from "../services/games.service";
import {ConfirmationPopoverModule} from "angular-confirmation-popover";
import {DropdownModule} from 'primeng/primeng';
import {DataTableModule} from 'primeng/primeng';
import {PaginatorModule} from 'primeng/primeng';
import {StrategiesService} from "../services/strategies.service";
import {SharedModule} from "../../common/shared.module";
import {SourcesService} from "../services/sources.service";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    GamesRoutingModule,
    ReactiveFormsModule,
    CalendarModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'confirm' // set defaults here
    }),
    DropdownModule,
    DataTableModule,
    PaginatorModule,
    SharedModule
  ],
  providers: [
    GamesService,StrategiesService, SourcesService

  ],
  declarations: [
    NewGameComponent,
    ListGamesComponent,
    EditGameComponent,
  ],
  exports:[
    ListGamesComponent
  ],
})
export class GamesModule { }
