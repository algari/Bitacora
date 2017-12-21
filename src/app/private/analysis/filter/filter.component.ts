import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import * as moment from 'moment';
import {GamesService} from "../../services/games.service";
import {AuthenticationService} from "../../../public/services/authentication.service";
import {Games} from "../../../common/models/games.model";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Output('listGames')
  listGames: EventEmitter<Array<any>> =  new EventEmitter();

  form = this._formBuilder.group( {
    find: this._formBuilder.group( {
      initial: [],
      last: [],
    } )
  } );

  constructor(public _gameService: GamesService,
              public _authS: AuthenticationService,
              private _formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.getAllGames();
  }

  getAllGames() {
    var date = new Date();
    var primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
    var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    this._gameService.getAllByUsername(this._authS.user.username,moment(primerDia).format('L'),moment(ultimoDia).format('L'))
      .subscribe(
        (data: Games[]) => {
          console.log(data);
          this.listGames.emit(data);
        },
        err => {
          console.error(err);
        },
        () => {
          console.log('Finished getAllGames');

        }
      )
  }

  onSubmit() {
    this._gameService.getAllByUsername(this._authS.user.username,this.form.value.find.initial,this.form.value.find.last)
      .subscribe(
        (data: Games[]) => {
          console.log(data);
          this.listGames.emit(data);
        },
        err => {
          console.error(err);
        },
        () => {
          console.log('Finished getAllGames');

        }
      )
  }

}
