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
      },
      err => {
        console.error(err);
      },
      () => {
        console.log('Finished getAllGames');

      }
    )
  }

}
