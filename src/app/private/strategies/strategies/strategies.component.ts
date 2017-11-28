import { Component, OnInit } from '@angular/core';
import {Games} from "../../../common/models/games.model";
import {FormBuilder, Validators} from "@angular/forms";
import {AnalysisService} from "../../services/analysis.service";
import {StrategiesAnalysis} from "../../../common/models/strategiesAnalysis";
import * as moment from 'moment';
import {AuthenticationService} from "../../../public/services/authentication.service";
import {GamesService} from "../../services/games.service";
import {GameAnalysis} from "../../../common/models/gamesAnalysis";
import {Config} from "../../../common/config";

@Component({
  selector: 'app-strategies',
  templateUrl: './strategies.component.html',
  styleUrls: ['./strategies.component.css']
})
export class StrategiesComponent implements OnInit {

  data: any;

  isLoading = true;
  gameAnalysis:GameAnalysis= new GameAnalysis();

  form = this._formBuilder.group( {
    find: this._formBuilder.group( {
      date_in: [ , Validators.required ],
      date_out: [ , Validators.required ],
    } )
  } );

  constructor(public _formBuilder: FormBuilder,
    public _analysisService:AnalysisService,
    public _authS: AuthenticationService,
    public _gameService:GamesService) {

  }

  ngOnInit() {

  }
  onSubmit() {
    this.strategiesAnalysis();
    this.gamesAnalysis();
    console.log(this.data +" "+this.gameAnalysis);
    if(this.data || this.gameAnalysis){
      this.isLoading = false;
      console.log(this.isLoading);
    }
  }

  isRequired( fieldName: string ): boolean {
    return this.form.get( `find.${fieldName}` ).hasError( 'required' )
      && this.form.get( `find.${fieldName}` ).touched;
  }

  private gamesAnalysis(){
    this._gameService.getAllByDates(
      moment(this.form.value.find.date_in).format('L'),
      moment(this.form.value.find.date_out).format('L'),
      this._authS.user.username)
      .subscribe(
      (data: Games[]) => {
        let gameAnalysis:GameAnalysis = new GameAnalysis();
        let contadorB:number = 0;
        let contadorP:number = 0;
        let contadorN:number = 0;
        let r:number = 0;
        let ganado:number = 0;
        let perdido:number = 0;
        data.forEach(game=>{
          gameAnalysis.bruto += Number(game.neto);
          gameAnalysis.comisiones += game.commission;
          gameAnalysis.total += game.netoCmm;
          if(game.result==Config.RESULT_BREAKEVEN){
            contadorB += 1;
          }
          if(game.result==Config.RESULT_POSITIVO){
            contadorP += 1;
            ganado +=game.neto;
          }
          if(game.result==Config.RESULT_NEGATIVO){
            contadorN += 1;
            perdido +=game.neto;
          }
          r += game.r;
        })
        gameAnalysis.total = gameAnalysis.bruto - gameAnalysis.comisiones;
        gameAnalysis.breakeven = contadorB;
        gameAnalysis.positive = contadorP;
        gameAnalysis.negative = contadorN;
        gameAnalysis.efectividad = contadorP/(contadorP+contadorN);
        gameAnalysis.totalOperaciones = contadorB + contadorN + contadorP;
        gameAnalysis.sharpRatio = ((ganado/contadorP)/Math.abs(perdido/contadorN)).toFixed(4);
        gameAnalysis.r = r/data.length;
        gameAnalysis.cantidadR = gameAnalysis.bruto / gameAnalysis.r
        this.gameAnalysis = gameAnalysis;
      },
      err => {
        console.error(err);
      },
      () => {
        console.log('Finished getAllGames');

      }
    )
  }

  private strategiesAnalysis() {
    this._analysisService.strategiesAnalysis(
      moment(this.form.value.find.date_in).format('L'),
      moment(this.form.value.find.date_out).format('L'),
      this._authS.user.username)
      .subscribe((data:StrategiesAnalysis)=>{
        this.data = data;
      },
      err => {
        console.error(err);
      },
      () => {
        console.log('Finished onSubmit - strategiesAnalysis');
      }
    );
  }
}
