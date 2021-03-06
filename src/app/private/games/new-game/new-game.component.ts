import { Component, OnInit } from '@angular/core';
import {Config} from "../../../common/config";
import {Validators, FormBuilder} from "@angular/forms";
import {Games} from "../../../common/models/games.model";
import {GamesService} from "../../services/games.service";
import {Router, ActivatedRoute} from "@angular/router";
import {SelectItem} from 'primeng/primeng';
import {StrategiesService} from "../../services/strategies.service";
import {Strategies} from "../../../common/models/strategies.model";
import { AuthenticationService } from '../../../public/services/authentication.service';
import {PriceValidator} from "../priceValidator";
import * as moment from 'moment';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {

  form = this._formBuilder.group( {
    games: this._formBuilder.group( {
      _id:[],
      username: [ this._authS.user.username],
      date_in: [ , Validators.required ],
      quantity: [ , [ Validators.required ] ],
      type: [,Validators.required],
      price_in: [ ,[ Validators.required, PriceValidator.checkPrice] ],
      time_frame: [,Validators.required ],
      price_out: [ , [ Validators.required, PriceValidator.checkPrice ] ],
      date_out: [ , Validators.required ],
      commission: [ , [ Validators.required] ],
      comments: [ , Validators.required ],
      result: '',
      neto:0,
      netoCmm: 0,
      symbol: [ , [ Validators.required] ],
      strategy: [, [ Validators.required] ],
      r: [this._authS.user.r],
      source: 'ME',
      followed: 'NO',
    } )
  } );

  types:SelectItem[];

  timeFrames:SelectItem[];

  strategies:SelectItem[];

  followed:SelectItem[];

  edit:boolean = false;

  constructor( private _formBuilder: FormBuilder,
               private _gameService: GamesService,
               private _router: Router,
               private _strategyService: StrategiesService,
               private _authS: AuthenticationService,
               public _activatedRoute: ActivatedRoute
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

    this.followed = [
      {label:'NO', value:'NO'},
      {label:'SI', value:'SI'},
    ];

    this.loadStrategies();
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      const id: number = params['id'];
      if(id){
        this.loadEditGame(id);
        this.edit = true;
      }
    });
  }

  onSubmit() {
    if(this.edit){
      this.editGame();
    }else{
      this.createGame();
    }
  }

  private loadStrategies() {
    this._strategyService.getAllByUsername(this._authS.user.username).subscribe(
      (data: Strategies[]) => {
        let str:SelectItem;
        let strategies:Array<SelectItem> = new Array<SelectItem>();
        strategies.push({label:'Select', value:null});
        data.forEach(item=>{
          str =  {label:item.strategy, value:item._id};
          strategies.push(str);
        })
        console.log(strategies);
        this.strategies = strategies;
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
    return this.form.get( `games.${fieldName}` ).hasError( 'required' )
      && this.form.get( `games.${fieldName}` ).touched;
  }

  isInvalidPrice(fieldName: string ) {
    const field = `games.${fieldName}`;
    return (
      this.form.get( field ).hasError( 'invalidPrice' )
      &&
      // The user has actually interacted with the field
      this.form.get( field ).dirty &&
      // The user has actually typed
      ! this.isRequired( 'price_in' )
    );
  }

  private createGame() {
    let games:Games = this.calcuteValues();
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

  private editGame() {
    let games:Games = this.calcuteValues();
    this._gameService.update(games).subscribe(
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
        console.log('Finished editGame');
      }
    );
  }

  private loadEditGame(id: number) {
    this._gameService.getSingle(id).subscribe(
      (game: Games) => {
        console.log(game);
        this.form.get('games._id').setValue(game._id);
        this.form.get('games.date_in').setValue(moment(game.date_in).format('L LT'));
        this.form.get('games.quantity').setValue(game.quantity);
        this.form.get('games.type').setValue(game.type);
        this.form.get('games.price_in').setValue(game.price_in);
        this.form.get('games.time_frame').setValue(game.time_frame);
        this.form.get('games.price_out').setValue(game.price_out);
        this.form.get('games.date_out').setValue(moment(game.date_out).format('L LT'));
        this.form.get('games.commission').setValue(game.commission);
        this.form.get('games.comments').setValue(game.comments);
        this.form.get('games.symbol').setValue(game.symbol);
        this.form.get('games.strategy').setValue(game.strategy);
        this.form.get('games.r').setValue(game.r);
        this.form.get('games.source').setValue(game.source);
        this.form.get('games.followed').setValue(game.followed);

      },
      errorResponse => {
        const errorData = errorResponse.json();
        console.error(errorData.error);
      },
      () => {
        console.log('Finished loadEditGame');
      }
    );
  }

  private calcuteValues():Games {
    const games:Games = this.form.value.games;
    if(games.type.toString()==Config.TYPE_LONG || games.type.toString()==Config.TYPE_CALL || games.type.toString()==Config.TYPE_PUT){
      this.form.value.games.neto = ((games.price_out-games.price_in)*this.form.value.games.quantity).toFixed(4);
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
      this.form.value.games.neto = ((games.price_in-games.price_out)*this.form.value.games.quantity).toFixed(4);;
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
    return games;
  }
}
