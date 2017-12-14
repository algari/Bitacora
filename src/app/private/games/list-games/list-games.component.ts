import { Component, OnInit } from '@angular/core';
import {Games} from "../../../common/models/games.model";
import {GamesService} from "../../services/games.service";
import * as moment from 'moment';
import {AuthenticationService} from "../../../public/services/authentication.service";
import {Config} from "../../../common/config";
import {Validators, FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-list-games',
  templateUrl: './list-games.component.html',
  styleUrls: ['./list-games.component.css']
})
export class ListGamesComponent implements OnInit {

  games: Array<Games>;
  isLoading = true;
  // alert=false;
  // perdido:number;
  // ganado:number;

  form = this._formBuilder.group( {
    find: this._formBuilder.group( {
      date_in: [ , Validators.required ],
      date_out: [ , Validators.required ],
    } )
  } );

  constructor(public _formBuilder: FormBuilder,
              public _gameService: GamesService,
              public _authS: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.getAllGames();
    this.isLoading = false;
    //this.getProgress();

  }

  onSubmit() {
    // this.gamesByDate();
  }

  getAllGames() {
    this._gameService.getAllByUsername(this._authS.user.username,
      // moment('10/01/2017').format('L'),
      // moment('11/22/2017').format('L')
    )
    .subscribe(
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

  /*getProgress() {
    let dateI ;
    let dateF = moment().format('L');
    if(moment().format('dddd')=='Sunday'){
      dateI = moment().subtract(6, 'days').format('L');
    }
    else if(moment().format('dddd')=='Saturday'){
      dateI = moment().subtract(5, 'days').format('L');
    }
    else if(moment().format('dddd')=='Friday'){
      dateI = moment().subtract(4, 'days').format('L');
    }
    else if(moment().format('dddd')=='Thursday'){
      dateI = moment().subtract(3, 'days').format('L');
    }
    else if(moment().format('dddd')=='Wednesday'){
      dateI = moment().subtract(2, 'days').format('L');
    }
    else if(moment().format('dddd')=='Tuesday'){
      dateI = moment().subtract(1, 'days').format('L');
    }
    else if(moment().format('dddd')=='Monday'){
      dateI = moment().format('L');
    }
    if(dateI && dateF){
      console.log(dateI+" "+dateF);
      this._gameService.getAllByDates(dateI,dateF,this._authS.user.username).subscribe(
        (data: Games[]) => {
          let ganado = 0;
          let perdido = 0;
          data.forEach((item)=>{
            if(item.result==Config.RESULT_POSITIVO){
              ganado = ganado + item.neto;
            }
            if(item.result==Config.RESULT_NEGATIVO){
              perdido = perdido + item.neto;
            }
          })
          this.perdido = perdido;
          this.ganado = ganado;
          if(perdido<=(-this._authS.user.max_loss_w)){
            this.alert = true;
          }else {
            this.alert = false;
          }
        },
        err => {
          console.error(err);
        },
        () => {
          console.log('Finished getAllByDates');

        }
      )
    }

  }*/

  onDeleteGame(game: Games) {
    this.isLoading = true;
    console.log(`Game a eliminar: ${game.ticker}`);
    this._gameService.onDelete(game).subscribe((data) => {
        this.getAllGames();
        // this.getProgress();
      },
      errorResponse => {
        const errorData = errorResponse.json();
        console.error(errorData.error);
      },
      () => {
        console.log('Finished onDeleteGame');
      })
      this.isLoading = false;
  }

  /*isRequired( fieldName: string ): boolean {
    return this.form.get( `find.${fieldName}` ).hasError( 'required' )
      && this.form.get( `find.${fieldName}` ).touched;
  }*/

  /*private gamesByDate() {
    this._gameService.getAllByDates(
      moment(this.form.value.find.date_in).format('L'),
      moment(this.form.value.find.date_out).format('L'),
      this._authS.user.username)
      .subscribe(
        (data: Games[]) => {
          this.games = data;
        },
        err => {
          console.error(err);
        },
        () => {
          console.log('Finished getAllGames');

        }
      )
  }*/
}
