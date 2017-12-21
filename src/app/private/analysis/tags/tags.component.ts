import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { AuthenticationService } from '../../../public/services/authentication.service';
import { Games } from '../../../common/models/games.model';
import { TagService } from '../../services/tag.service';
import { Tag } from '../../../common/models/tag';
import { Config } from '../../../common/config';
import * as moment from 'moment';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  isLoading = true;

  dataTags: any = {};

  constructor(public _gameService: GamesService,
    public _authS: AuthenticationService,
    public _tagS: TagService) { }

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


