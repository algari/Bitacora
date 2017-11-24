import { Component, OnInit } from '@angular/core';
import { Games } from '../../../common/models/games.model';
import { GamesService } from '../../services/games.service';
import { AuthenticationService } from '../../../public/services/authentication.service';
import { Config } from '../../../common/config';
import * as moment from 'moment';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  isLoading = true;

  overview:any = {};

  constructor(private _gameService: GamesService,
    private _authS: AuthenticationService,) { }

  ngOnInit() {
    this.getAllGames();
  }

  getAllGames() {
    this._gameService.getAllByUsername(this._authS.user.username)
      .subscribe(
      (data: Games[]) => {
        
        this.chartOverview(data);

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

  chartOverview(games: Array<Games>) {
    if (games) {
      
      this.overview.numberTrades = games.length;
      this.overview.averageTradesDay = this.averageTradesDay(games);
      let profit = 0, commission = 0, neto = 0, netoR = 0, averageR = 0, risk = 0;
      let contP = 0, contN = 0, sumaP = 0, sumaN = 0;
      games.forEach(game => {
        profit += game.neto;
        commission += game.commission;
        neto += game.netoCmm; 
        netoR += game.netoR;
        risk += game.r; 
        averageR += game.r; 
        if (game.result == Config.RESULT_POSITIVO) {
          contP += 1;
          sumaP += game.netoCmm;
        } else if (game.result == Config.RESULT_NEGATIVO) {
          contN += 1;
          sumaN += game.netoCmm;
        }
      });

      this.overview.profit = profit;
      this.overview.commission = commission;
      this.overview.neto = neto; 
      this.overview.netoR = netoR;
      this.overview.risk = risk;
      this.overview.averageR = averageR/games.length;
      console.log(sumaP);
      console.log(contP);
      
      this.overview.averageTradesDay = (sumaP/contP)/(sumaN/contN);
    }
  }

  averageTradesDay(games: Array<Games>){
    let aux = 0;
    let suma = 0;
    Config.DAYS_WEEK.forEach(day => {
      let cont = 0;
      games.forEach(game => {
        if (moment(game.entries[0].date).format('dddd')==day.value) {
          cont += 1;
        }
      });
      //Solo toma en cuenta los dias que tienen juegos
      if (cont>0) {
        suma += cont;
        aux += 1;  
      }
    });
    return suma/aux;
  }
}
