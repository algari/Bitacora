import { Component, OnInit } from '@angular/core';
import {Config} from "../../../common/config";
import {Validators, FormBuilder} from "@angular/forms";
import {AuthenticationService} from "../../../public/services/authentication.service";
import {Games} from "../../../common/models/games.model";
import {GamesService} from "../../services/games.service";
import {Router} from "@angular/router";
import * as moment from 'moment';
import {SelectItem} from 'primeng/primeng';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {

  form = this._formBuilder.group( {
    games: this._formBuilder.group( {
      date_in: [ , Validators.required ],
      quantity: [ 100, [ Validators.required ] ],
      type: [,Validators.required],
      price_in: [ 51.66, [ Validators.required] ],
      time_frame: [,Validators.required ],
      price_out: [ 51.66, [ Validators.required ] ],
      date_out: [ , Validators.required ],
      commission: [ 2.00, [ Validators.required] ],
      comments: [ 'Buena entrada', Validators.required ],
      result: '',
      neto:0,
      netoCmm: 0,
      symbol: [ 'TSLA', [ Validators.required] ],
      strategy: [ 'BS', [ Validators.required] ],
    } )
  } );

  types:SelectItem[];

  timeFrames:SelectItem[];

  constructor( private _formBuilder: FormBuilder,
               private _gameService: GamesService,
               private _router: Router,
  ) 
  { 
    this.types = [
      {label:'Select', value:null},
      {label:'Long', value:'Long'},
      {label:'Short', value:'Short'},
      {label:'Call', value:'Call'},
      {label:'Put', value:'Put'}
    ];

    this.timeFrames = [
      {label:'Select', value:null},
      {label:'1 Minuto', value:'1M'},
      {label:'2 Minutos', value:'2M'},
      {label:'5 Minutos', value:'5M'},
      {label:'15 Minutos', value:'15M'},
      {label:'1 Hora', value:'1H'},
      {label:'1 Dia', value:'1D'},
      {label:'1 Semana', value:'1W'}
    ];
  }

  ngOnInit() {
    
  }

  onSubmit() {
    const games:Games = this.form.value.games;
    if(games.type.toString()==Config.TYPE_LONG || games.type.toString()==Config.TYPE_CALL || games.type.toString()==Config.TYPE_PUT){
      this.form.value.games.neto = (games.price_out-games.price_in)*this.form.value.games.quantity;
      this.form.value.games.netoCmm = this.form.value.games.neto-games.commission;
      if (this.form.value.games.neto>0){
        this.form.value.games.result = Config.RESULT_POSITIVO
      }
      else if((games.commission-this.form.value.games.neto)==games.commission){
        this.form.value.games.result = Config.RESULT_BREAKEVEN
        this.form.value.games.netoCmm = this.form.value.games.neto-games.commission;
      }
      else{
        this.form.value.games.result = Config.RESULT_NEGATIVO
      }
    }else if(games.type.toString()==Config.TYPE_SHORT){
      this.form.value.games.neto = (games.price_in-games.price_out)*this.form.value.games.quantity;
      if (this.form.value.games.neto>0){
        this.form.value.games.result = Config.RESULT_POSITIVO
        this.form.value.games.netoCmm = this.form.value.games.neto-games.commission;
      }
      else if((games.commission-this.form.value.games.neto)==games.commission){
        this.form.value.games.result = Config.RESULT_BREAKEVEN
        this.form.value.games.netoCmm = this.form.value.games.neto-games.commission;
      }
      else{
        this.form.value.games.result = Config.RESULT_NEGATIVO
        this.form.value.games.netoCmm = this.form.value.games.neto-games.commission;
      }
    }
    this._gameService.create(games).subscribe(
      (game: Games) => {
        setTimeout(() => {
          this._router.navigate(['/private/games']);
        }, 3000);
      },
      errorResponse => {
        const errorData = errorResponse.json();
        console.error(errorData.error);
      },
      () => {
        console.log('Finished creation request');
      }
    );
  }

  isRequired( fieldName: string ): boolean {
    return this.form.get( `games.${fieldName}` ).hasError( 'required' )
      && this.form.get( `games.${fieldName}` ).touched;
  }

  isNumber(fieldName: string) {
    const field = `games.${fieldName}`;
    return (
      this.form.get( field).hasError( fieldName )
    );
  }

}