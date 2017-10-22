import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import {AuthenticationService} from "../../../public/services/authentication.service";
import {Bitacora} from "../../../common/models/bitacora.model";
import { Config } from '../../../common/config';

@Component({
  selector: 'app-bitacora',
  templateUrl: 'bitacora.component.html',
  styleUrls: ['bitacora.component.css']
})
export class BitacoraComponent implements OnInit {

  form = this._formBuilder.group( {
    bitacora: this._formBuilder.group( {
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
    const bitacora:Bitacora = this.form.value.bitacora;
    if(bitacora.type.toString()=='Long' || bitacora.type.toString()=='Call' || bitacora.type.toString()=='Put'){
      this.form.value.bitacora.neto = (bitacora.price_out-bitacora.price_in)*this.form.value.bitacora.quantity;
      this.form.value.bitacora.netoCmm = this.form.value.bitacora.neto-bitacora.commission;
      if (this.form.value.bitacora.neto>0){
        this.form.value.bitacora.result = Config.RESULT_POSITIVO
      }
      else if((bitacora.commission-this.form.value.bitacora.neto)==bitacora.commission){
        this.form.value.bitacora.result = Config.RESULT_BREAKEVEN
        this.form.value.bitacora.netoCmm = this.form.value.bitacora.neto-bitacora.commission;
      }
      else{
        this.form.value.bitacora.result = Config.RESULT_NEGATIVO
      }
    }else if(bitacora.type.toString()=='Short'){
      this.form.value.bitacora.neto = (bitacora.price_in-bitacora.price_out)*this.form.value.bitacora.quantity;
      if (this.form.value.bitacora.neto>0){
        this.form.value.bitacora.result = Config.RESULT_POSITIVO
        this.form.value.bitacora.netoCmm = this.form.value.bitacora.neto-bitacora.commission;
      }
      else if((bitacora.commission-this.form.value.bitacora.neto)==bitacora.commission){
        this.form.value.bitacora.result = Config.RESULT_BREAKEVEN
        this.form.value.bitacora.netoCmm = this.form.value.bitacora.neto-bitacora.commission;
      }
      else{
        this.form.value.bitacora.result = Config.RESULT_NEGATIVO
        this.form.value.bitacora.netoCmm = this.form.value.bitacora.neto-bitacora.commission;
      }
    }
  }

  isRequired( fieldName: string ): boolean {
    return this.form.get( `bitacora.${fieldName}` ).hasError( 'required' )
      && this.form.get( `bitacora.${fieldName}` ).touched;
  }

  isNumber(fieldName: string) {
    const field = `bitacora.${fieldName}`;
    return (
      this.form.get( field).hasError( fieldName )
    );
  }
}
