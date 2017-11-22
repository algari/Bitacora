import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewGameComponent } from './new-game/new-game.component';
import { ListGamesComponent } from './list-games/list-games.component';
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
import {CheckboxModule} from 'primeng/primeng';
import { TagService } from '../services/tag.service';
import {ListboxModule} from 'primeng/primeng';
import {FileUploadModule} from 'primeng/primeng';

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
    SharedModule,
    CheckboxModule,
    ListboxModule,
    FileUploadModule
  ],
  providers: [
    GamesService,StrategiesService, SourcesService,TagService

  ],
  declarations: [
    NewGameComponent,
    ListGamesComponent,
  ],
  exports:[
    ListGamesComponent
  ],
})
export class GamesModule { }
