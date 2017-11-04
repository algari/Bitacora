import { Component, OnInit } from '@angular/core';
import {Games} from "../../../common/models/games.model";
import {GamesService} from "../../services/games.service";
import * as moment from 'moment';
import {AuthenticationService} from "../../../public/services/authentication.service";
import {Config} from "../../../common/config";
import {logger} from "codelyzer/util/logger";

@Component({
  selector: 'app-list-games',
  templateUrl: './list-games.component.html',
  styleUrls: ['./list-games.component.css']
})
export class ListGamesComponent implements OnInit {

  games: Array<Games>;
  isLoading = true;
  alert=false;
  perdido:number;
  ganado:number;

  constructor(private _gameService: GamesService,
              private _authS: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.getAllGames();
    this.getProgress();

  }

  getAllGames() {
    this._gameService.getAllByUsername(this._authS.user.username).subscribe(
      (data: Games[]) => {
        //next
        this.games = data
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

  getProgress() {
    let dateI ;
    let dateF = moment().format('L');
    if(moment().format('dddd')=='Sunday'){
      dateI = moment().subtract(6, 'days').format('L');
    }
    else if(moment().format('dddd')=='Saturday'){
      dateI = moment().subtract(5, 'days').format('L');
    }
    else if(moment().format('dddd')=='Friday'){
      dateI = moment().subtract(4, 'days').format('L');
    }
    else if(moment().format('dddd')=='Thursday'){
      dateI = moment().subtract(3, 'days').format('L');
    }
    else if(moment().format('dddd')=='Wednesday'){
      dateI = moment().subtract(2, 'days').format('L');
    }
    else if(moment().format('dddd')=='Tuesday'){
      dateI = moment().subtract(1, 'days').format('L');
    }
    else if(moment().format('dddd')=='Monday'){
      dateI = moment().format('L');
    }
    if(dateI && dateF){
      console.log(dateI+" "+dateF);
      this._gameService.getAllByDates(dateI,dateF,this._authS.user.username).subscribe(
        (data: Games[]) => {
          let ganado = 0;
          let perdido = 0;
          data.forEach((item)=>{
            if(item.result==Config.RESULT_POSITIVO){
              ganado = ganado + item.neto;
            }
            if(item.result==Config.RESULT_NEGATIVO){
              perdido = perdido + item.neto;
            }
          })
          this.perdido = perdido;
          this.ganado = ganado;
          if(perdido<=(-this._authS.user.max_loss_w)){
            this.alert = true;
          }else {
            this.alert = false;
          }
        },
        err => {
          console.error(err);
        },
        () => {
          console.log('Finished getAllByDates');

        }
      )
    }

  }

  onDeleteGame(game: Games) {
    this.isLoading = true;
    console.log(`Proyecto a eliminar: ${game.symbol}`);
    this._gameService.onDelete(game).subscribe((data) => {
        this.getAllGames();
        this.getProgress();
      },
      errorResponse => {
        const errorData = errorResponse.json();
        console.error(errorData.error);
      },
      () => {
        console.log('Finished onDeleteProject');
      })
      this.isLoading = false;
  }

  public setData(sortedData) {
    console.log('sortedData: %o', sortedData);
    this.games = sortedData;
  }

}
