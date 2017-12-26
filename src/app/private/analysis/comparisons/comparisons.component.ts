import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../public/services/authentication.service';
import { GamesService } from '../../services/games.service';
import { Games } from "../../../common/models/games.model";
import {Config} from "../../../common/config";
import { SourcesService } from '../../services/sources.service';
import { StrategiesService } from '../../services/strategies.service';
import { Sources } from '../../../common/models/sources.model';
import { Strategies } from '../../../common/models/strategies.model';
import * as moment from 'moment';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-comparisons',
  templateUrl: './comparisons.component.html',
  styleUrls: ['./comparisons.component.css']
})
export class ComparisonsComponent implements OnInit {

  form = this._formBuilder.group( {
    find: this._formBuilder.group( {
      initial: [],
      last: [],
    } )
  } );

  isLoading = true;

  dataDirection: any = {};
  dataDirectionR:any = {};
  dataDirectionPL:any = {};

  dataTimeFrameR:any = {};
  dataTimeFramePL:any = {};

  dataSourceR:any = {};
  dataSourcePL:any = {};

  dataStrategyR:any ={};
  dataStrategyPL:any ={};

  dataDayWeekR:any ={}
  dataDayWeekPL:any ={}

  dataMarketPhasesR: any = {};
  dataMarketPhasesPL: any = {};

  constructor(public _gameService: GamesService,
    public _authS: AuthenticationService,
    public _sourceS: SourcesService,
    public _stratS: StrategiesService,
              private _formBuilder: FormBuilder,) {

  }

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
        this.chartDirection(data);

        this.chartDayWeek(data);

        this.chartTimeFrame(data);

        this.chartStrategy(data);

        this.chartSource(data);

        this.marketPhases(data);
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

  onSubmit() {
    this._gameService.getAllByUsername(this._authS.user.username,this.form.value.find.initial,this.form.value.find.last)
      .subscribe(
        (data: Games[]) => {
          this.chartDirection(data);

          this.chartDayWeek(data);

          this.chartTimeFrame(data);

          this.chartStrategy(data);

          this.chartSource(data);

          this.marketPhases(data);
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

  chartSource(games: Array<Games>){
    let labels = [];
    let dataR = [];
    let dataPL = [];

    this._sourceS.getAllByUsername(this._authS.user.username).subscribe(
      (data: Sources[]) => {
        data.forEach(source => {
          let contR = 0;
          let contPL = 0;
          for (var index = 0; index < games.length; index++) {
            var game = games[index];
            if (game.source == source.source) {
              contR += game.netoR;
              contPL += game.netoCmm;
            }
          }
          labels.push(source.source)
          dataR.push(contR);
          dataPL.push(contPL);
        });

        this.dataSourceR = {
          labels: labels,
          datasets: [
              {
                  label: 'Fuente',
                  backgroundColor: '#42A5F5',
                  borderColor: '#1E88E5',
                  data: dataR
              }
          ]
        }

        this.dataSourcePL = {
          labels: labels,
          datasets: [
              {
                  label: 'Fuente',
                  backgroundColor: '#42A5F5',
                  borderColor: '#1E88E5',
                  data: dataPL
              }
          ]
        }
      },
      err => {
        console.error(err);
      },
      () => {
        console.log('Finished getAllSources');

      }
   )

  }

  chartStrategy(games: Array<Games>){
    let labels = [];
    let dataR = [];
    let dataPL = [];

    this._stratS.getAllByUsername(this._authS.user.username).subscribe(
      (data: Strategies[]) => {
        data.forEach(strat => {
          let contR = 0;
          let contPL = 0;
          for (var index = 0; index < games.length; index++) {
            var game = games[index];
            if (game.strategy == strat.strategy) {
              contR += game.netoR;
              contPL += game.netoCmm;
            }
          }
          labels.push(strat.strategy)
          dataR.push(contR);
          dataPL.push(contPL);
        });

        this.dataStrategyR = {
          labels: labels,
          datasets: [
              {
                  label: 'Estrategia',
                  backgroundColor: '#42A5F5',
                  borderColor: '#1E88E5',
                  data: dataR
              }
          ]
        }

        this.dataStrategyPL = {
          labels: labels,
          datasets: [
              {
                  label: 'Estrategia',
                  backgroundColor: '#42A5F5',
                  borderColor: '#1E88E5',
                  data: dataPL
              }
          ]
        }
      },
      err => {
        console.error(err);
      },
      () => {
        console.log('Finished getAllStrategies');

      }
   )

  }

  chartTimeFrame(games: Array<Games>){
    let labels = [];
    let dataR = [];
    let dataPL = [];
    Config.TIME_FRAMES.forEach(tf => {
      let contR = 0;
      let contPL = 0;
      games.forEach(game => {
        if (game.time_frame == tf.value) {
          contR += game.netoR;
          contPL += game.netoCmm;
        }
      });
       //Agrega los labels y los data para los graficos
      if (tf.value!= null) {
        labels.push(tf.value)
        dataR.push(contR);
        dataPL.push(contPL);
      }
    })


    this.dataTimeFrameR = {
      labels: labels,
      datasets: [
          {
              label: 'Marco de Tiempo',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: dataR
          }
      ]
    }

    this.dataTimeFramePL = {
      labels: labels,
      datasets: [
          {
              label: 'Marco de Tiempo',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: dataPL
          }
      ]
    }


  }

  chartDayWeek(games: Array<Games>){
    let labels = [];
    let dataR = [];
    let dataPL = [];
    Config.DAYS_WEEK.forEach(day => {
      let contR = 0;
      let contPL = 0;
      games.forEach(game => {
        if (moment(game.entries[0].date).format('dddd')==day.value) {
          contR += game.netoR;
          contPL += game.netoCmm;
        }
      });
      labels.push(day.label)
      dataR.push(contR);
      dataPL.push(contPL);

    });

    this.dataDayWeekR = {
      labels: labels,
      datasets: [
          {
              label: 'Dia de la Semana',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: dataR
          }
      ]
    }

    this.dataDayWeekPL = {
      labels: labels,
      datasets: [
          {
              label: 'Dia de la Semana',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: dataPL
          }
      ]
    }
  }

  chartDirection(games: Array<Games>) {
    if (games) {

      let cantLong:number = 0;
      let cantShort:number = 0;

      let plLong:number = 0;
      let plShort:number = 0;

      let rLong:number = 0;
      let rShort:number = 0;

      games.forEach(game => {
        if (game.type == Config.TYPE_LONG) {
          cantLong +=1;
          plLong += game.netoCmm;
          rLong += game.netoR;

        }else if (game.type == Config.TYPE_SHORT){
          cantShort +=1;
          plShort += game.netoCmm;
          rShort += game.netoR;
        }
      });

      this.dataDirection = {
        labels: ['Long', 'Short'],
        datasets: [
          {
            data: [cantLong,cantShort],
            backgroundColor: [
              "#42A5F5",
              "#9CCC65"
            ],
            hoverBackgroundColor: [
              "#42A5F5",
              "#9CCC65"
            ]
          }
        ]
      }

      this.dataDirectionR = {
        labels: ['Long', 'Short'],
        datasets: [
          {
            label: 'Long',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: [rLong]
          },
          {
            label: 'Short',
            backgroundColor: '#9CCC65',
            borderColor: '#7CB342',
            data: [rShort]
          }
        ]
      }

      this.dataDirectionPL = {
        labels: ['Long', 'Short'],
        datasets: [
          {
            label: 'Long',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: [plLong]
          },
          {
            label: 'Short',
            backgroundColor: '#9CCC65',
            borderColor: '#7CB342',
            data: [plShort]
          }
        ]
      }
    }

  }

  private marketPhases(data: Games[]) {
    let labels = ['Fase I (9:30 a 10:15)','Fase II (10:16 a 12:00)','Fase III (12:01 a 4:30)'];
    let dataP_R = [];
    let dataN_R = [];
    let dataP_PL = [];
    let dataN_PL = [];
    let contPI_R = 0, contNI_R = 0,contPII_R = 0, contNII_R = 0,contPIII_R = 0, contNIII_R = 0;
    let contPI_PL = 0, contNI_PL = 0,contPII_PL = 0, contNII_PL = 0,contPIII_PL = 0, contNIII_PL = 0;

    let fechaActual = moment().format('YYYY-MM-DD');
    let faseIInitial = moment(fechaActual+' 09:30');
    let faseIFinal = moment(fechaActual+' 10:15');
    let faseIIInitial = moment(fechaActual+' 10:16');
    let faseIIFinal = moment(fechaActual+' 12:00');
    let faseIIIInitial = moment(fechaActual+' 12:01');
    let faseIIIFinal = moment(fechaActual+' 16:30');
    debugger
    data.forEach(game => {
      let dateTime = moment(game.entries[0].time).format('LT');
      let time = moment(fechaActual+' '+dateTime);
      if (game.status == Config.STATUS_CLOSED && game.result == Config.RESULT_POSITIVO) {
        if (time>= faseIInitial
          && time<= faseIFinal){
          contPI_PL += game.netoCmm;
          contPI_R += game.netoR;
        }else if(time>= faseIIInitial
          && time<= faseIIFinal){
          contPII_PL += game.netoCmm;
          contPII_R += game.netoR;
        }else if(time>= faseIIIInitial
          && time<= faseIIIFinal){
          contPIII_PL += game.netoCmm;
          contPIII_R += game.netoR;
        }


      } else if (game.status == Config.STATUS_CLOSED && (game.result == Config.RESULT_NEGATIVO || game.result == Config.RESULT_BREAKEVEN)) {
        if (time>= faseIInitial
          && time<= faseIFinal){
          contNI_PL += game.netoCmm;
          contNI_R += game.netoR;
        }else if(time>= faseIIInitial
          && time<= faseIIFinal){
          contNII_PL += game.netoCmm;
          contNII_R += game.netoR;
        }else if(time>= faseIIIInitial
          && time<= faseIIIFinal){
          contNIII_PL += game.netoCmm;
          contNIII_R += game.netoR;
        }
      }
    });
    dataP_R.push(contPI_R);
    dataP_R.push(contPII_R);
    dataP_R.push(contPIII_R);
    dataN_R.push(contNI_R);
    dataN_R.push(contNII_R);
    dataN_R.push(contNIII_R);

    dataP_PL.push(contPI_PL);
    dataP_PL.push(contPII_PL);
    dataP_PL.push(contPIII_PL);
    dataN_PL.push(contNI_PL);
    dataN_PL.push(contNII_PL);
    dataN_PL.push(contNIII_PL);
    //chart

    console.log(dataP_R,dataN_PL);
    this.dataMarketPhasesR = {
      labels:labels,
      datasets: [
        {
          label: 'Ganadores',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: dataP_R
        },
        {
          label: 'Perdedores',
          backgroundColor: '#ed7d31',
          borderColor: '#ed7d31',
          data: dataN_R
        }
      ]
    }
    this.dataMarketPhasesPL = {
      labels:labels,
      datasets: [
        {
          label: 'Ganadores',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: dataP_PL
        },
        {
          label: 'Perdedores',
          backgroundColor: '#ed7d31',
          borderColor: '#ed7d31',
          data: dataN_PL
        }
      ]
    }
  }
}
