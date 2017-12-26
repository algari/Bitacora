import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { AuthenticationService } from '../../../public/services/authentication.service';
import { Games } from '../../../common/models/games.model';
import { Config } from '../../../common/config';
import * as moment from 'moment';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.css']
})
export class TickerComponent implements OnInit {

  form = this._formBuilder.group( {
    find: this._formBuilder.group( {
      initial: [],
      last: [],
    } )
  } );

  isLoading = true;

  dataTickers: any = {};

  constructor(public _gameService: GamesService,
    public _authS: AuthenticationService,
              private _formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.getAllGames();
  }

  getAllGames() {
    var date = new Date();
    var primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
    var ultimoDia = new Date();

    this.form.get('find.initial').setValue(primerDia);
    this.form.get('find.last').setValue(ultimoDia);

    this._gameService.getAllByUsername(this._authS.user.username,moment(primerDia).format('L'),moment(ultimoDia).format('L'))
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

  onSubmit() {
    this._gameService.getAllByUsername(this._authS.user.username,this.form.value.find.initial,this.form.value.find.last)
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

        }
      )
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
           ticker == game.ticker) {
           contP += 1;
        } else if (game.status == Config.STATUS_CLOSED && game.result == Config.RESULT_NEGATIVO &&
          ticker == game.ticker) {
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
      tickers.add(game.ticker);
    });
    return tickers;
  }

}
