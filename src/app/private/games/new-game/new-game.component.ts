import { Component, OnInit } from '@angular/core';
import {Config} from "../../../common/config";
import { Validators, FormBuilder, FormArray, FormGroup } from "@angular/forms";
import {Games} from "../../../common/models/games.model";
import {GamesService} from "../../services/games.service";
import {Router, ActivatedRoute} from "@angular/router";
import {SelectItem} from 'primeng/primeng';
import {StrategiesService} from "../../services/strategies.service";
import {Strategies} from "../../../common/models/strategies.model";
import { AuthenticationService } from '../../../public/services/authentication.service';
import * as moment from 'moment';
import { Tag } from '../../../common/models/tag';
import { Entry } from '../../../common/models/entry.model';
import { Exit } from '../../../common/models/exit.model';
import {SourcesService} from "../../services/sources.service";
import {Sources} from "../../../common/models/sources.model";
import { TagService } from '../../services/tag.service';
import { MessageService } from 'primeng/components/common/messageservice';

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
      followed: 'NO',
      chart:['url/image.jpeg',],
      maxMove:[],
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
      quantity: [,Validators.required],
      price: [,Validators.required],
      stopLoss: [,Validators.required],
    });
  }

  initExit(){
    return this._formBuilder.group({
      date:[],
      time: [],
      quantity: [],
      price: [],
    });
  }

  types:SelectItem[] = Config.TYPES;

  timeFrames:SelectItem[] = Config.TIME_FRAMES;

  followed:SelectItem[] = Config.FOLLOWED;

  strategies:SelectItem[];

  sources:SelectItem[];

  tags:SelectItem[];

  edit:boolean = false;

  constructor( public _formBuilder: FormBuilder,
               public _gameService: GamesService,
               public _router: Router,
               public _strategyService: StrategiesService,
               public _authS: AuthenticationService,
               public _activatedRoute: ActivatedRoute,
               public _sourceService:SourcesService,
               public _tagService:TagService,
               public messageService: MessageService
  )
  {
    this.loadStrategies();
    this.loadSources();
    this.loadTags();
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
          tag =  {label:item.tag, value:item.tag};
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
          str =  {label:item.strategy, value:item.strategy};
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
          str =  {label:item.source, value:item.source};
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
    //Cambia el formato de las fechas

    this._gameService.create(this.form.value.games).subscribe(
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
    this._gameService.update(this.form.value.games).subscribe(
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
        // console.log(game);
        this.form.get('games._id').setValue(game._id);
        this.form.get('games.symbol').setValue(game.symbol);
        this.form.get('games.type').setValue(game.type);
        this.form.get('games.time_frame').setValue(game.time_frame);
        this.form.get('games.strategy').setValue(game.strategy);
        this.form.get('games.source').setValue(game.source);
        this.form.get('games.commission').setValue(game.commission);
        this.form.get('games.comments').setValue(game.comments);
        this.form.get('games.result').setValue(game.result);
        this.form.get('games.neto').setValue(game.neto);
        this.form.get('games.netoCmm').setValue(game.netoCmm);
        this.form.get('games.r').setValue(game.r);
        this.form.get('games.netoR').setValue(game.netoR);
        this.form.get('games.percentCaptured').setValue(game.percentCaptured);
        this.form.get('games.followed').setValue(game.followed);
        this.form.get('games.chart').setValue(game.chart);
        this.form.get('games.maxMove').setValue(game.maxMove);
        this.form.get('games.tags').setValue(game.tags);

        //entries
        game.entries.forEach((item:Entry, i) => {
          let entryForm = this._formBuilder.group({
            date:[new Date(item.date),Validators.required],
            time: [new Date(item.time),Validators.required],
            quantity: [item.quantity,Validators.required],
            price: [item.price,Validators.required],
            stopLoss: [item.stopLoss,Validators.required],
          });
          this.entriesFormArray.setControl(i,entryForm);
        });

        //exits
        game.exits.forEach((item:Exit, i) => {
          let exitForm = this._formBuilder.group({
            date:[new Date(item.date)],
            time: [new Date(item.time)],
            quantity: [item.quantity],
            price: [item.price],
          });
          this.exitsFormArray.setControl(i,exitForm);
        });

        this.form.get('games.status').setValue(game.status);

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


  loadResumen(){
    let game:Games = this.form.value.games;

    let sumaR = 0,riesgo=0;
    let sumaEntry =0, netoEntry = 0;
    let sumaExit =0, netoExit = 0;
    let sumaMaxMov = 0, maxMov = 0;
    let quantityEntry = 0, quantityExit = 0;
    game.entries.forEach(entry => {
      if(game.type!=null && (game.type.toString()==Config.TYPE_LONG)){
        //Calcula Riesgo
        riesgo =  (entry.price - entry.stopLoss)*entry.quantity;
      }else if(game.type!=null && (game.type.toString()==Config.TYPE_SHORT)){
        //Calcula Riesgo
        riesgo =  (entry.stopLoss - entry.price)*entry.quantity;
      }

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
    if(game.type!=null && (game.type.toString()==Config.TYPE_LONG
    //|| game.type.toString()==Config.TYPE_CALL || game.type.toString()==Config.TYPE_PUT
    )){
      // Asigna los valores para los typo Long, Call y put
      this.form.get('games.r').setValue(sumaR);
      neto = sumaExit-sumaEntry;
      this.form.get('games.neto').setValue(neto);
      let netoCmm = neto-game.commission;
      this.form.get('games.netoCmm').setValue(netoCmm);
      let r = (netoCmm/sumaR);
      this.form.get('games.netoR').setValue(isNaN(r)?0:r);
      let perCap = (neto/(sumaMaxMov-sumaEntry));
      this.form.get('games.percentCaptured').setValue(isNaN(perCap)?0:perCap);
    }
    else if(game.type!=null && (game.type.toString()==Config.TYPE_SHORT)){
      // Asigna los valores para los typo Short
      this.form.get('games.r').setValue(sumaR);
      neto = sumaEntry-sumaExit;
      this.form.get('games.neto').setValue(neto);
      let netoCmm = neto-game.commission;
      this.form.get('games.netoCmm').setValue(netoCmm);
      let r = (netoCmm/sumaR);
      this.form.get('games.netoR').setValue(isNaN(r)?0:r);
      let perCap = (neto/(sumaEntry-sumaMaxMov));
      this.form.get('games.percentCaptured').setValue(isNaN(perCap) || perCap< 0 ? 0 : perCap);
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

}
