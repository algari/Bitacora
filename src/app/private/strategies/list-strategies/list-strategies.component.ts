import { Component, OnInit } from '@angular/core';
import {Strategies} from "../../../common/models/strategies.model";
import {AuthenticationService} from "../../../public/services/authentication.service";
import {StrategiesService} from "../../services/strategies.service";
import {MessageService} from "primeng/components/common/messageservice";
import {GamesService} from "../../services/games.service";
import {Games} from "../../../common/models/games.model";

@Component({
  selector: 'app-list-strategies',
  templateUrl: './list-strategies.component.html',
  styleUrls: ['./list-strategies.component.css']
})
export class ListStrategiesComponent implements OnInit {

  strategies: Array<Strategies>;
  isLoading = true;
  private games: Games[];

  constructor(public _authS: AuthenticationService,
    public _straS:StrategiesService,
              public _gameService: GamesService,
              public messageService: MessageService) { }

  ngOnInit() {
    this.getAllStrategies();
    this.getAllGames();
  }

  private getAllStrategies() {
    this._straS.getAllByUsername(this._authS.user.username).subscribe(
      (data: Strategies[]) => {
        //next
        this.strategies = data
        this.isLoading = false;
      },
      err => {
        console.error(err);
      },
      () => {
        console.log('Finished getAllGames');

      }
    )
  }

  onDeleteStrategy(strategy: Strategies) {
    this.isLoading = true;
    console.log(`Estrategia a eliminar: ${strategy.strategy}`);
    let eliminar = true;
    if (this.games){
      this.games.forEach(game => {
        if(game.strategy == strategy.strategy){
          eliminar = false;
        }
      })
      if(eliminar){
        this._straS.onDelete(strategy).subscribe((data) => {
            this.getAllStrategies();
          },
          errorResponse => {
            const errorData = errorResponse.json();
            console.error(errorData.error);
          },
          () => {
            console.log('Finished onDeleteStrategy');
          })
      }else {
        this.messageService.add({severity:'warn', summary:'Estrategia', detail:'No se puede eliminar una estrategia asosiada a un juego!'});
      }

    }else{
      this.messageService.add({severity:'error', summary:'Fuente', detail:'No se puede eliminar la estrategia!'});
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
