import { Component, OnInit } from '@angular/core';
import {Sources} from "../../../common/models/sources.model";
import {AuthenticationService} from "../../../public/services/authentication.service";
import {SourcesService} from "../../services/sources.service";
import {GamesService} from "../../services/games.service";
import {Games} from "../../../common/models/games.model";
import {MessageService} from "primeng/components/common/messageservice";

@Component({
  selector: 'app-list-sources',
  templateUrl: './list-sources.component.html',
  styleUrls: ['./list-sources.component.css']
})
export class ListSourcesComponent implements OnInit {

  sources: Array<Sources>;
  isLoading = true;
  private games: Games[];

  constructor(public _authS: AuthenticationService,
    public _sourceS:SourcesService,
              public _gameService: GamesService,
              public messageService: MessageService) { }

  ngOnInit() {
    this.getAllSources();
    this.getAllGames();
  }

  private getAllSources() {
    this._sourceS.getAllByUsername(this._authS.user.username).subscribe(
      (data: Sources[]) => {
        //next
        this.sources = data
        this.isLoading = false;
      },
      err => {
        console.error(err);
      },
      () => {
        console.log('Finished getAllSources');

      }
    )
  }

  onDeleteSource(source: Sources) {
    this.isLoading = true;
    console.log(`Fuente a eliminar: ${source.source}`);
    let eliminar = true;
    if (this.games){
      this.games.forEach(game => {
          if(game.source == source.source){
            eliminar = false;
          }
      })
      if(eliminar){
        this._sourceS.onDelete(source).subscribe((data) => {
            this.getAllSources();
          },
          errorResponse => {
            const errorData = errorResponse.json();
            console.error(errorData.error);
          },
          () => {
            console.log('Finished onDeleteSource');
          })
      }else {
        this.messageService.add({severity:'warn', summary:'Fuente', detail:'No se puede eliminar una fuente asosiada a un juego!'});
      }

    }else{
      this.messageService.add({severity:'error', summary:'Fuente', detail:'No se puede eliminar la fuente!'});
    }

    this.isLoading = false;
  }

  getAllGames() {
    this._gameService.getAllByUsername(this._authS.user.username,
      // moment('10/01/2017').format('L'),
      // moment('11/22/2017').format('L')
    )
      .subscribe(
        (data: Games[]) => {
          this.games = data;
        },
        err => {
          console.error(err);
        },
        () => {
          console.log('Finished getAllGames');

        }
      );
  }

}
