import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { AuthenticationService } from '../../../public/services/authentication.service';
import { Games } from '../../../common/models/games.model';
import { TagService } from '../../services/tag.service';
import { Sources } from '../../../common/models/sources.model';
import { Tag } from '../../../common/models/tag';
import { Config } from '../../../common/config';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  isLoading = true;

  dataTags: any = {};

  constructor(private _gameService: GamesService,
    private _authS: AuthenticationService,
    private _tagS: TagService) { }

  ngOnInit() {
    this.getAllGames();
  }

  getAllGames() {
    this._gameService.getAllByUsername(this._authS.user.username)
      .subscribe(
      (data: Games[]) => {

        // this.overviewValues(data);
        this.chartTags(data);
        this.isLoading = false;

      },
      err => {
        console.error(err);
      },
      () => {
        console.log('Finished getAllGames');

      })
  }

  encontrarTags(gametag:Tag) { 
    return gametag.tag === 'Mucho spread'
  }

  chartTags(games: Array<Games>) {

    let label = [];
    let dataP = [];
    let dataN = [];

   
    this._tagS.getAllByUsername(this._authS.user.username).subscribe(
      (data: Tag[]) => {
        
        data.forEach(tag => {
          let contP = 0;
          let contN = 0;
          for (var index = 0; index < games.length; index++) {
            var game = games[index];
            // debugger
            if (game.status == Config.STATUS_CLOSED && game.result == Config.RESULT_POSITIVO) {
              contP += game.tags.filter(gametag=>gametag==tag.tag).length;
                           
            }
            else if (game.status == Config.STATUS_CLOSED && game.result == Config.RESULT_NEGATIVO) {
              contN += game.tags.filter(gametag=>gametag==tag.tag).length;
            }
          }
          label.push(tag.tag);
          dataP.push(contP);
          dataN.push(contN); 
        });
        
        console.log(dataP);
        console.log(dataN);
        
        this.dataTags = {
          labels: label,
          datasets: [
            {
              label: 'Ganadoras',
              backgroundColor: 'rgba(179,181,198,0.2)',
              borderColor: 'rgba(179,181,198,1)',
              pointBackgroundColor: 'rgba(179,181,198,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(179,181,198,1)',
              data: dataP
            },
            {
              label: 'Perdedoras',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              pointBackgroundColor: 'rgba(255,99,132,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(255,99,132,1)',
              data: dataN
            }
          ]
        };
      },
      err => {
        console.error(err);
      },
      () => {
        console.log('Finished getAllTags');

      }
   )
  }
  
}


