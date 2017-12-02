  import { Component, OnInit } from '@angular/core';
  import { Games } from '../../../common/models/games.model';
  import * as moment from 'moment';
  import { Config } from '../../../common/config';
  import {Entry} from "../../../common/models/entry.model";
  import {Exit} from "../../../common/models/exit.model";
  import {GamesService} from "../../services/games.service";
  import {Router} from "@angular/router";
  import {AuthenticationService} from "../../../public/services/authentication.service";
  import {MessageService} from "primeng/components/common/messageservice";

  @Component({
  selector: 'app-load-games',
  templateUrl: './load-games.component.html',
  styleUrls: ['./load-games.component.css']
  })
  export class LoadGamesComponent implements OnInit {

  operations:string = '';

  game:Games;

  constructor(
    public _gameService: GamesService,
    public _router: Router,
    public _authS: AuthenticationService,
    public messageService: MessageService
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    let listGames:Array<any> = this.getListGamesObject(this.operations);

    let games:Array<Games> =this.buildGames(listGames);

    let cont = 0, contError = 0;

    //Insert Games
    games.forEach(game=>{
      this._gameService.create(game).subscribe(
        (game: Games) => {
          cont += 1;
        },
        errorResponse => {
          const errorData = errorResponse.json();
          console.error(errorData.error);
          contError += 1;
        },
        () => {
          console.log('Finished creation game');
        });
    });

    this.operations = '';
    this.messageService.add({severity:'success', summary:'Cargue', detail:'Exitoso'});
  }

  buildGames(listGames:Array<any>):Array<Games>{
    let games:Array<Games> = new Array<Games>();

    let game:Games = new Games();
    let commissions = 0;

    listGames.forEach(load => {
      game.ticker = load.ticker;
      if(load.entry==Config.YES && load.type == Config.SLD_SHORT){
        game.type = Config.TYPE_SHORT;

        commissions += load.commission;
        game.commission = commissions;
        game.username = this._authS.user.username;
        game.status = Config.STATUS_IMPORTED;
        game.maxMove = null;

        let entry:Entry = new Entry();
        entry.date = load.date;
        entry.time = load.time;
        entry.quantity = load.quantity;
        entry.price = load.price;

        game.entries.push(entry);
        games.push(game);

        game = new Games();
        commissions = 0;
      }  else if(load.entry== Config.YES && load.type == Config.BOT_LONG){
        game.type = Config.TYPE_LONG;

        commissions += load.commission;
        game.commission = commissions;
        game.username = this._authS.user.username;
        game.status = Config.STATUS_IMPORTED;
        game.maxMove = null;

        let entry:Entry = new Entry();
        entry.date = load.date;
        entry.time = load.time;
        entry.quantity = load.quantity;
        entry.price = load.price;

        game.entries.push(entry);
        games.push(game);

        game = new Games();
        commissions = 0;
      } else {
        let exit:Exit = new Exit();
        exit.date = load.date;
        exit.time = load.time;
        exit.quantity = load.quantity;
        exit.price = load.price;

        game.exits.push(exit);

        commissions += load.commission ;
      }

    });
    return games;
  }


  getListGamesObject(operations:string):Array<any>{
    let listGames:Array<any> = new Array<any>();
    let listOperations = this.operations.split('\n');
    listOperations.forEach(operation => {
      //Elimina los espacios
      operation = operation.replace('	',',')
        .replace('	',',')
        .replace('	',',')
        .replace('	',',')
        .replace('	',',')
        .replace('	',',');
      let objetGame = operation.split(',');
      if (objetGame && objetGame.length==7) {
        let game:any = {};
        game.ticker = objetGame[1];
        game.date = moment().format('YYYY-MM-DD');
        game.time =  moment(game.date + ' '+objetGame[0], moment.ISO_8601).format('YYYY-MM-DD hh:mm:ss');
        game.type = objetGame[2];
        game.quantity = parseInt(objetGame[3]);
        game.price = parseFloat(objetGame[4]);
        game.commission = parseFloat(objetGame[5]);
        if ((objetGame[6].toString().trim()=='')){
          game.entry = 'YES'
        }else{
          game.entry = 'NO'
        }
        listGames.push(game);
      }

    });
    return listGames.sort();
  }
  }