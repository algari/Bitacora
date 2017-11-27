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

  winnersLosers:any = {};

  dataOverviewR:any = {};

  dataOverviewPL:any = {};

  dataWinnersLosers:any = {};

  constructor(private _gameService: GamesService,
    private _authS: AuthenticationService,) { }

  ngOnInit() {
    this.getAllGames();
  }

  getAllGames() {
    this._gameService.getAllByUsername(this._authS.user.username)
      .subscribe(
      (data: Games[]) => {

        // this.overviewValues(data);
        this.chartOverview(data);
        this.chartWinnersLosers(data);

        this.isLoading = false;

      },
      err => {
        console.error(err);
      },
      () => {
        console.log('Finished getAllGames');

      })
  }

  chartWinnersLosers(games: Array<Games>){
    let contP = 0;
    let contN = 0;
    let contB = 0;

    let netoWinPL = 0, netoWinR = 0,netoLostPL = 0, netoLostR = 0,commissionsW = 0, 
      commissionsL = 0,commissionsB = 0, brutoWinPL = 0, brutoLostPL = 0;
    games.forEach(game => {
      if (game.result==Config.RESULT_POSITIVO){
        contP += 1;
        brutoWinPL += game.neto;
        netoWinPL += game.netoCmm;
        netoWinR += game.netoR;
        commissionsW += game.commission;
      }else if(game.result==Config.RESULT_NEGATIVO){
        contN += 1;
        brutoLostPL += game.neto;
        netoLostPL += game.netoCmm;
        netoLostR += game.netoR;
        commissionsL += game.commission;
      }
      else if (game.result==Config.RESULT_BREAKEVEN){
        contB += 1;
        commissionsB += game.commission;
      }
    });

    this.winnersLosers.numberTradesW = contP;
    this.winnersLosers.brutoWinPL = brutoWinPL;
    this.winnersLosers.netoWinPL = netoWinPL;
    this.winnersLosers.averageWinPL = netoWinPL/contP;
    this.winnersLosers.netoWinR = netoWinR;
    this.winnersLosers.averageWinR = netoWinR/contP;
    this.winnersLosers.commissionsW = commissionsW;
    this.winnersLosers.numberTradesL = contN;
    this.winnersLosers.brutoLostPL = brutoLostPL;
    this.winnersLosers.netoLostPL = netoLostPL;
    this.winnersLosers.averageLostPL = netoLostPL/contN;
    this.winnersLosers.netoLostR = netoLostR;
    this.winnersLosers.averageLostR = netoLostR/contN;
    this.winnersLosers.commissionsL = commissionsL;

    this.winnersLosers.commissionsB = commissionsB;

    this.dataWinnersLosers = {
      labels: ['Ganadores','Perdedores','Break Even'],
      datasets: [
        {
          data: [contP, contN, contB],
          backgroundColor: [
            "#5b9bd5",
            "#ed7d31",
            "#a5a5a5",
          ],
          hoverBackgroundColor: [
            "#5b9bd5",
            "#ed7d31",
            "#a5a5a5",
          ]
        }]
    };
  }

  /*chartOverview(games: Array<Games>) {
    let labels = [];
    let dataR = [];
    let dataPL = [];

    games.forEach(game => {
      if(game.status==Config.STATUS_CLOSED){
        labels.push(moment(game.entries[0].date).format('L'))
        dataR.push(game.netoCmm);
        dataPL.push(game.netoR);
      }
    });

    this.dataOverviewR = {
      labels: labels,
      datasets: [
        {
          label: 'Resumen R',
          data: dataR,
          fill: false,
          borderColor: '#1E88E5'
        }
      ]
    }

    this.dataOverviewPL = {
      labels: labels,
      datasets: [
        {
          label: 'Resumen $',
          data: dataPL,
          fill: false,
          borderColor: '#1E88E5'
        }
      ]
    }
  }*/

  chartOverview(games: Array<Games>) {
    if (games) {

      this.overview.numberTrades = games.length;
      this.overview.numberTradesDay = this.averageTradesDay(games);
      let profit = 0, commission = 0, neto = 0, netoR = 0, averageR = 0, risk = 0;
      let contP = 0, contN = 0, sumaP = 0, sumaN = 0;

      //chart
      let labels = [];
      let dataR = [];
      let dataPL = [];
      let sumaNetoDiaR = 0,sumaNetoDiaPL =0;
      let fechaAux = '';
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

        //chart
        if(game.status==Config.STATUS_CLOSED){
          if(fechaAux==''){
            labels.push(moment(game.entries[0].date).format('L'))
            sumaNetoDiaPL += game.netoCmm;
            sumaNetoDiaR += game.netoR;
            fechaAux = moment(game.entries[0].date).format('L');
          } else if(fechaAux == moment(game.entries[0].date).format('L')){
            sumaNetoDiaPL += game.netoCmm;
            sumaNetoDiaR += game.netoR;
          }else{
            labels.push(moment(game.entries[0].date).format('L'))
            dataR.push(sumaNetoDiaR);
            dataPL.push(sumaNetoDiaPL);

            sumaNetoDiaR=0;
            sumaNetoDiaPL=0

            sumaNetoDiaPL += game.netoCmm;
            sumaNetoDiaR += game.netoR;
            fechaAux = moment(game.entries[0].date).format('L');
          }
        }
      });
      //agrega el ultimo registro o el 1 en caso que solo exista 1
      dataR.push(sumaNetoDiaR);
      dataPL.push(sumaNetoDiaPL);

      this.overview.profit = profit;
      this.overview.commission = commission;
      this.overview.neto = neto;
      this.overview.netoR = netoR;
      this.overview.risk = risk;
      this.overview.averageR = averageR/games.length;
      this.overview.battingAverage = (contP/games.length)*100;
      this.overview.sharpeRatio = Math.abs((sumaP/contP)/(sumaN/contN));

      //chart
      this.dataOverviewR = {
        labels: labels,
        datasets: [
          {
            label: 'Resumen R',
            data: dataR,
            fill: false,
            borderColor: '#1E88E5'
          }
        ]
      }

      this.dataOverviewPL = {
        labels: labels,
        datasets: [
          {
            label: 'Resumen $',
            data: dataPL,
            fill: false,
            borderColor: '#1E88E5'
          }
        ]
      }
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
    return (suma/aux);
  }
}
