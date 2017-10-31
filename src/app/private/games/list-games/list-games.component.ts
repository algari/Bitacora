import { Component, OnInit } from '@angular/core';
import {Games} from "../../../common/models/games.model";
import {GamesService} from "../../services/games.service";

@Component({
  selector: 'app-list-games',
  templateUrl: './list-games.component.html',
  styleUrls: ['./list-games.component.css']
})
export class ListGamesComponent implements OnInit {

  games: Array<Games>;
  isLoading = true;

  constructor(private _gameService: GamesService,
  ) {
  }

  ngOnInit() {
    this.getAllGames();
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

  onDeleteGame(game: Games) {
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
  }

  public setData(sortedData) {
    console.log('sortedData: %o', sortedData);
    this.games = sortedData;
  }

}
