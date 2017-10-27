import { Component, OnInit } from '@angular/core';
import {Config} from "../../../common/config";
import {Validators, FormBuilder} from "@angular/forms";
import {AuthenticationService} from "../../../public/services/authentication.service";
import {Games} from "../../../common/models/games.model";

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {

  form = this._formBuilder.group( {
    games: this._formBuilder.group( {
      date_in: [ '01/01/2017 9:15:00', Validators.required ],
      quantity: [ 100, [ Validators.required ] ],
      type: [ 'Long', Validators.required ],
      price_in: [ 51.66, [ Validators.required] ],
      time_frame: [ '2M', Validators.required ],
      price_out: [ 51.66, [ Validators.required ] ],
      date_out: [ '01/01/2017 9:50:00', Validators.required ],
      commission: [ 2.00, [ Validators.required] ],
      comments: [ 'Buena entrada', Validators.required ],
      result: '',
      neto:0,
      netoCmm: 0,
      symbol: this._formBuilder.group( {
        symbol_id:1,
        symbol: [ 'TSLA', [ Validators.required] ],
      }),
      strategie: this._formBuilder.group( {
        strategie_id:1,
        strategie: [ 'BS', [ Validators.required] ],
      })
    } )
  } );

  userName = this._auth.user.name;

  constructor( private _formBuilder: FormBuilder,
               public _auth:AuthenticationService) { }

  ngOnInit() {

  }

  onSubmit() {
    const games:Games = this.form.value.games;
    if(games.type.toString()=='Long' || games.type.toString()=='Call' || games.type.toString()=='Put'){
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
    }else if(games.type.toString()=='Short'){
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
