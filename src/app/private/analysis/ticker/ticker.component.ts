import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { AuthenticationService } from '../../../public/services/authentication.service';
import { Games } from '../../../common/models/games.model';
import { Config } from '../../../common/config';

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.css']
})
export class TickerComponent implements OnInit {

  isLoading = true;
  
  dataTickers: any = {};

  constructor(public _gameService: GamesService,
    public _authS: AuthenticationService) { }

  ngOnInit() {
    this.getAllGames();
  }

  getAllGames() {
    this._gameService.getAllByUsername(this._authS.user.username)
      .subscribe(
      (data: Games[]) => {
        this.chartTickers(data);
        this.isLoading = false;
      },
      err => {
        console.error(err);
      },
      () => {
        console.log('Finished getAllGames');

      })
  }

  chartTickers(games: Array<Games>){
    let tickers = this.getTickers(games);
    let labels = [];
    let dataP = [];
    let dataN = [];
    tickers.forEach(ticker => {
      let contP = 0, contN = 0;
      games.forEach(game => {
        if (game.status == Config.STATUS_CLOSED && game.result == Config.RESULT_POSITIVO &&
           ticker == game.symbol) {
           contP += 1; 
        } else if (game.status == Config.STATUS_CLOSED && game.result == Config.RESULT_NEGATIVO &&
          ticker == game.symbol) {
          contN += 1; 
       }
      });
      labels.push(ticker);
      dataP.push(contP);
      dataN.push(contN); 
    });
    //chart
    this.dataTickers = {
      labels:labels,
      datasets: [
        {
          label: 'Ganadores',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: dataP
        },
        {
          label: 'Perdedores',
          backgroundColor: '#ed7d31',
          borderColor: '#ed7d31',
          data: dataN
        }
      ]
    }
  }

  getTickers(games: Array<Games>){
    let tickers:Set<String> = new Set<String>();
    games.forEach(game => {
      tickers.add(game.symbol);
    });
    return tickers;
  }

}
