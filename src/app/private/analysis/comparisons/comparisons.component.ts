import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../public/services/authentication.service';
import { GamesService } from '../../services/games.service';
import { Games } from "../../../common/models/games.model";
import {Config} from "../../../common/config";

@Component({
  selector: 'app-comparisons',
  templateUrl: './comparisons.component.html',
  styleUrls: ['./comparisons.component.css']
})
export class ComparisonsComponent implements OnInit {

  games: Array<Games> = new Array<Games>();
  isLoading = true;

  dataDirection: any = {};
  dataDirectionR:any = {};
  dataDirectionPL:any = {};

  dataTimeFrameR:any = {};
  dataTimeFramePL:any = {};

  constructor(private _gameService: GamesService,
    private _authS: AuthenticationService) {

  }

  ngOnInit() {
    this.getAllGames();
  }

  getAllGames() {
    return this._gameService.getAllByUsername(this._authS.user.username)
      .subscribe(
      (data: Games[]) => {
        this.chartDirection(data);
        
        this.chartDayWeek(data);

        this.chartTimeFrame(data);

        this.chartStrategy(data);

        this.chartSource(data);
        this.isLoading = false;
        return data;
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

  }

  chartStrategy(games: Array<Games>){

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
    // this.dataTimeFramePL = {
    //   labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
    //   datasets: [
    //       {
    //           label: 'Dias',
    //           backgroundColor: '#42A5F5',
    //           borderColor: '#1E88E5',
    //           data: [65, 59, 80, 81, 56, 90, 98]
    //       }
    //   ]
    // }

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

        }else if (game.type == Config.TYPE_LONG){
          cantShort +=1;
          plShort += game.netoCmm;
          rShort += game.netoR;
        }
      });
      
      this.dataDirection = {
        datasets: [
          {
            label: 'Long',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: [cantLong]
          },
          {
            label: 'Short',
            backgroundColor: '#9CCC65',
            borderColor: '#7CB342',
            data: [cantShort]
          }
        ]
      }

      this.dataDirectionR = {
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

}
