import { Component, OnInit } from '@angular/core';
import { Games } from '../../../common/models/games.model';
import * as moment from 'moment';
import { Config } from '../../../common/config';

@Component({
  selector: 'app-load-games',
  templateUrl: './load-games.component.html',
  styleUrls: ['./load-games.component.css']
})
export class LoadGamesComponent implements OnInit {

  operations:string = '';

  game:Games;
  
  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
    let listGames:Array<any> = this.getListGames(this.operations);
    console.log(listGames);
    let tickers:Set<String> = this.getTickers(listGames);
    console.log(tickers);
    
    tickers.forEach(ticker => {
      let loadGame = listGames.filter(g=>g.ticker==ticker).sort();
      if (loadGame) {
        let game:Games = new Games();
        game.ticker = loadGame[0].ticker;
        if (loadGame[0].type == 'SLD') {
          game.type = Config.TYPE_SHORT;
        } else if (loadGame[0].type == 'BOT') {
          game.type = Config.TYPE_LONG;
        }
        loadGame.forEach(load => {
            game.ticker = load.ticker;        
        });
      }
    });
  }

  getListGames(operations:string):Array<any>{
    let listGames:Array<any> = new Array<any>();
    let listOperations = this.operations.split('\n');
    listOperations.forEach(operation => {
      //Elimina los espacios
      operation = operation.replace('	',',').replace('	',',').replace('	',',').replace('	',',').replace('	',',');
      let objetGame = operation.split(',');
      if (objetGame && objetGame.length==6) {
        let game:any = {};
        game.ticker = objetGame[1];
        game.date = moment().format('YYYY-MM-DD');
        game.time =  moment(game.date + ' '+objetGame[0], moment.ISO_8601).format('YYYY-MM-DD hh:mm:ss');
        game.type = objetGame[2];
        game.quantity = objetGame[3];
        game.price = objetGame[4];
        game.commission = objetGame[5];
        listGames.push(game);  
      }
      
    });
    return listGames;
  }

  getTickers(listGames:Array<any>):Set<String>{
    let tickers:Set<String> = new Set<String>();
    listGames.forEach(game => {
      tickers.add(game.ticker);
    });
    return tickers;

  }

}
