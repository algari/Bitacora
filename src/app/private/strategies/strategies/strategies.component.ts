import { Component, OnInit } from '@angular/core';
import {GamesService} from "../../services/games.service";
import {StrategiesService} from "../../services/strategies.service";
import {Strategies} from "../../../common/models/strategies.model";
import {isNull} from "util";
import {Games} from "../../../common/models/games.model";
import {FormBuilder, Validators} from "@angular/forms";
import {AnalysisService} from "../../services/analysis.service";
import {StrategiesAnalysis} from "../../../common/models/strategiesAnalysis";
import * as moment from 'moment';

@Component({
  selector: 'app-strategies',
  templateUrl: './strategies.component.html',
  styleUrls: ['./strategies.component.css']
})
export class StrategiesComponent implements OnInit {

  data: any;

  isLoading = true;
  games : Array<Games>;
  strategies:Array<Strategies>;

  form = this._formBuilder.group( {
    find: this._formBuilder.group( {
      date_in: [ , Validators.required ],
      date_out: [ , Validators.required ],
    } )
  } );

  constructor(private _formBuilder: FormBuilder,
              private _gameService:GamesService,
              private _strategiesService:StrategiesService,
              private _analysisService:AnalysisService) {

  }

  ngOnInit() {
    this.getAllStrategies();
    this.getAllGames();
    if(!isNull(this.games) && !isNull(this.strategies)){

    }
  }
  onSubmit() {
    this._analysisService.strategiesAnalysis(moment(this.form.value.find.date_in).format('L') ,moment(this.form.value.find.date_out).format('L')).subscribe((data:StrategiesAnalysis)=>{
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


  getAllStrategies(){
    this._strategiesService.getAll().subscribe((data:Strategies[])=>{
        this.strategies = data;
    },
      err => {
        console.error(err);
      },
      () => {
        console.log('Finished getAllStrategies');
      }
    );
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

  isRequired( fieldName: string ): boolean {
    return this.form.get( `find.${fieldName}` ).hasError( 'required' )
      && this.form.get( `find.${fieldName}` ).touched;
  }
}
