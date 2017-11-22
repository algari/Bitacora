import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../public/services/authentication.service';
import { GamesService } from '../../services/games.service';
import {Games} from "../../../common/models/games.model";

@Component({
  selector: 'app-comparisons',
  templateUrl: './comparisons.component.html',
  styleUrls: ['./comparisons.component.css']
})
export class ComparisonsComponent implements OnInit {
  
  games: Array<Games>;
  isLoading = true;

  data: any = {};
  
  constructor(private _gameService: GamesService,
              private _authS: AuthenticationService) {

               }

  ngOnInit() {
    this.getAllGames();

    this.data = {
      datasets: [
          {
              label: 'Long',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: [65]
          },
          {
              label: 'Short',
              backgroundColor: '#9CCC65',
              borderColor: '#7CB342',
              data: [28]
          }
      ]
  }
  }

  getAllGames() {
    this._gameService.getAllByUsername(this._authS.user.username)
    .subscribe(
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

}
