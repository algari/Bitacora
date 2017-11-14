import { Component, OnInit } from '@angular/core';
import {Config} from "../../../common/config";
import {Validators, FormBuilder, FormArray} from "@angular/forms";
import {Games} from "../../../common/models/games.model";
import {GamesService} from "../../services/games.service";
import {Router, ActivatedRoute} from "@angular/router";
import {SelectItem} from 'primeng/primeng';
import {StrategiesService} from "../../services/strategies.service";
import {Strategies} from "../../../common/models/strategies.model";
import { AuthenticationService } from '../../../public/services/authentication.service';
import {PriceValidator} from "../priceValidator";
import * as moment from 'moment';
import { Tag } from '../../../common/models/tag';
import { Entry } from '../../../common/models/entry.model';
import { Exit } from '../../../common/models/exit.model';
import {SourcesService} from "../../services/sources.service";
import {Sources} from "../../../common/models/sources.model";
import { TagService } from '../../services/tag.service';

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
      symbol: [ , [ Validators.required] ],
      type: [,Validators.required],
      time_frame: [,Validators.required ],
      strategy: [, [ Validators.required] ],
      source: [, [ Validators.required]],
      commission: [ , [ Validators.required] ],
      comments: [],
      result: '',
      neto:0,
      netoCmm: 0,
      r: [0,],
      netoR: 0,
      percentCaptured:0,
      followed: 'SI',
      chart:[],
      maxMove:[995],
      entries:this._formBuilder.array([
        this.initEntry()
        ]),
      exits:this._formBuilder.array([
        this.initExit()
      ]),
      tags:[[],],
      status:''
    } ),
  } );

  initEntry(){
    return this._formBuilder.group({
      date:[,Validators.required],
      time: [,Validators.required],
      quantity: [340,Validators.required],
      price: [980,Validators.required],
      stopLoss: [977,Validators.required],
    });
  }

  initExit(){
    return this._formBuilder.group({
      date:[],
      time: [],
      quantity: [340],
      price: [985],
    });
  }

  types:SelectItem[];

  timeFrames:SelectItem[];

  strategies:SelectItem[];

  sources:SelectItem[];

  followed:SelectItem[];

  edit:boolean = false;

  tags:SelectItem[];

  constructor( private _formBuilder: FormBuilder,
               private _gameService: GamesService,
               private _router: Router,
               private _strategyService: StrategiesService,
               private _authS: AuthenticationService,
               public _activatedRoute: ActivatedRoute,
               private _sourceService:SourcesService,
               private _tagService:TagService,
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
    this.loadSources();
    this.loadTags();
  }

  ngOnInit() {

    this._activatedRoute.params.subscribe(params => {
      const id: number = params['id'];
      if(id){
        // this.loadEditGame(id);
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

  get entriesFormArray(): FormArray{
    return this.form.get('games.entries') as FormArray;
  }

  addEntry(){
    this.entriesFormArray.push(this.initEntry());
  }

  removeEntry(i: number) {
    this.entriesFormArray.removeAt(i);
  }

  get exitsFormArray(): FormArray{
    return this.form.get('games.exits') as FormArray;
  }

  addExit(){
    this.exitsFormArray.push(this.initExit());
  }

  removeExit(i: number) {
    this.exitsFormArray.removeAt(i);
  }

  loadTags(): void {
    this._tagService.getAllByUsername(this._authS.user.username).subscribe(
      (data: Tag[]) => {
        let tag:SelectItem;
        let tags:Array<SelectItem> = new Array<SelectItem>();
        data.forEach(item=>{
          tag =  {label:item.tag, value:item._id};
          tags.push(tag);
        })
        this.tags = tags;
      },
      err => {
        console.error(err);
      },
      () => {
        console.log('Finished loadTags');

      }
    )
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
        this.strategies = strategies;
      },
      err => {
        console.error(err);
      },
      () => {
        console.log('Finished loadStrategies');

      }
    )
  }

  private loadSources() {
    this._sourceService.getAllByUsername(this._authS.user.username).subscribe(
      (data: Sources[]) => {
        let str:SelectItem;
        let sources:Array<SelectItem> = new Array<SelectItem>();
        sources.push({label:'Select', value:null});
        data.forEach(item=>{
          str =  {label:item.source, value:item._id};
          sources.push(str);
        })
        this.sources = sources;
      },
      err => {
        console.error(err);
      },
      () => {
        console.log('Finished loadSources');

      }
    )
  }

  isRequired(fieldName: string ): boolean {
    return this.form.get( `${fieldName}` ).hasError( 'required' )
      && this.form.get( `${fieldName}` ).touched;
  }

  private createGame() {
    /*let games:Games = this.calcuteValues();
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
    );*/
  }

  private editGame() {
    /*let games:Games = this.calcuteValues();
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
    );*/
  }

  /*private loadEditGame(id: number) {
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
  }*/

  
  loadResumen(){
    let game:Games = this.form.value.games;
    
    let sumaR = 0,riesgo=0;
    let sumaEntry =0, netoEntry = 0;
    let sumaExit =0, netoExit = 0;
    let sumaMaxMov = 0, maxMov = 0;
    let quantityEntry = 0, quantityExit = 0;
    game.entries.forEach(entry => {
      //Calcula Riesgo
      riesgo =  (entry.price - entry.stopLoss)*entry.quantity;
      sumaR += riesgo;
      //Calcula entrada
      netoEntry = entry.quantity * entry.price;
      sumaEntry += netoEntry;
      //Cantidad de compra/venta
      quantityEntry +=entry.quantity; 
    });

    game.exits.forEach(exit => {
      //Calcula Salida
      netoExit = exit.quantity * exit.price;
      sumaExit += netoExit;

      //Calcula Max Movimiento
      maxMov = exit.quantity * game.maxMove;
      sumaMaxMov += maxMov;

      //Cantidad de compra/venta
      quantityExit +=exit.quantity; 
    });


    let neto = 0;
    if(game.type!=null && (game.type.toString()==Config.TYPE_LONG || game.type.toString()==Config.TYPE_CALL || game.type.toString()==Config.TYPE_PUT)){
      // Asigna los valores para los typo Long, Call y put
      this.form.get('games.r').setValue(sumaR.toFixed(2));
      neto = sumaExit-sumaEntry;
      this.form.get('games.neto').setValue(neto);
      let netoCmm = neto-game.commission;
      this.form.get('games.netoCmm').setValue(netoCmm);
      let r = (netoCmm/sumaR).toFixed(2);
      this.form.get('games.netoR').setValue(r);
      let perCap = (neto/(sumaMaxMov-sumaEntry)).toFixed(2);
      this.form.get('games.percentCaptured').setValue(perCap);
    }  
    else if(game.type!=null && (game.type.toString()==Config.TYPE_SHORT)){
      // Asigna los valores para los typo Short
      this.form.get('games.r').setValue(sumaR.toFixed(2));
      neto = sumaEntry-sumaExit;
      this.form.get('games.neto').setValue(neto);
      let netoCmm = neto-game.commission;
      this.form.get('games.netoCmm').setValue(netoCmm);
      let r = (netoCmm/sumaR).toFixed(2);
      this.form.get('games.netoR').setValue(r);
      let perCap = (neto/(sumaEntry-sumaMaxMov)).toFixed(2);
      this.form.get('games.percentCaptured').setValue(perCap);
    }

    //Calcual el resultado dependiendo del neto ganado
    if (neto>0){
      this.form.get('games.result').setValue(Config.RESULT_POSITIVO);
    }
    else if((game.commission-neto)==game.commission){
      this.form.get('games.result').setValue(Config.RESULT_BREAKEVEN);
    }
    else{
      this.form.get('games.result').setValue(Config.RESULT_NEGATIVO);
    }

    //Define el estado del juego
    if (quantityEntry > quantityExit) {
      this.form.get('games.status').setValue(Config.STATUS_OPEN);
    }
    else if (quantityEntry == quantityExit){
      this.form.get('games.status').setValue(Config.STATUS_CLOSED);
    }
  }

  /*private calcuteValues():Games {
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
  }*/
}
