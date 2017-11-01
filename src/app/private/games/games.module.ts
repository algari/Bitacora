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
import {SortingComponent} from "../../common/sorting/sorting.component";
import {MomentPipePipe} from "../../common/pipes/moment-pipe.pipe";
import {LoaderComponent} from "../../common/loader/loader.component";
import {ConfirmationPopoverModule} from "angular-confirmation-popover";
import {DropdownModule} from 'primeng/primeng';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {PaginatorModule} from 'primeng/primeng';
import {StrategiesService} from "../services/strategies.service";

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
    SharedModule,
    PaginatorModule
  ],
  providers: [
    GamesService,StrategiesService

  ],
  declarations: [
    NewGameComponent,
    ListGamesComponent,
    EditGameComponent,
    SortingComponent,
    MomentPipePipe,
    LoaderComponent
  ],
  exports:[
    ListGamesComponent
  ],
})
export class GamesModule { }
