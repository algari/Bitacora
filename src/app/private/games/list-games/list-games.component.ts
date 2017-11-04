import { Component, OnInit } from '@angular/core';
import {Games} from "../../../common/models/games.model";
import {GamesService} from "../../services/games.service";
import * as moment from 'moment';

@Component({
  selector: 'app-list-games',
  templateUrl: './list-games.component.html',
  styleUrls: ['./list-games.component.css']
})
export class ListGamesComponent implements OnInit {
  
  games: Array<Games>;
  gamesProgress:Array<Games>;
  isLoading = true;

  constructor(private _gameService: GamesService,
  ) {
  }

  ngOnInit() {
    this.getAllGames();
    this.getAllByDates();
    //this.validateProgress();
    console.log(this.gamesProgress);
  }

  getAllGames() {
    this._gameService.getAll().subscribe(
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

  getAllByDates() {
    let dateI ;
    let dateF = moment().format('L');
    if(moment().format('dddd')=='Friday'){
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
      this._gameService.getAllByDates(dateI,dateF).subscribe(
        (data: Games[]) => {
          this.gamesProgress = data;
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
