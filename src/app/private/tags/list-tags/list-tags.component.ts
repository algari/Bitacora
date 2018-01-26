import { Component, OnInit } from '@angular/core';
import {Tag} from "../../../common/models/tag";
import {AuthenticationService} from "../../../public/services/authentication.service";
import {TagService} from "../../services/tag.service";
import {MessageService} from "primeng/components/common/messageservice";
import {GamesService} from "../../services/games.service";
import {Games} from "../../../common/models/games.model";

@Component({
  selector: 'app-list-tags',
  templateUrl: './list-tags.component.html',
  styleUrls: ['./list-tags.component.css']
})
export class ListTagsComponent implements OnInit {

  tags: Array<Tag>;
  isLoading = true;
  private games: Games[];

  constructor(public _authS: AuthenticationService,
    public _tagS:TagService,
              public _gameService: GamesService,
              public messageService: MessageService) { }

  ngOnInit() {
    this.getAllTag();
    this.getAllGames();
  }

  private getAllTag() {
    this._tagS.getAllByUsername(this._authS.user.username).subscribe(
      (data: Tag[]) => {
        //next
        this.tags = data
        this.isLoading = false;
      },
      err => {
        console.error(err);
      },
      () => {
        console.log('Finished getAllTags');

      }
    )
  }

  onDeleteTag(tag: Tag) {
    this.isLoading = true;
    console.log(`Tag a eliminar: ${tag.tag}`);
    let eliminar = true;
    if (this.games){
      this.games.forEach(game => {
        if(game.tags.indexOf(tag.tag)!= -1){
          eliminar = false;
        }
      })
      if(eliminar){
        this._tagS.onDelete(tag).subscribe((data) => {
            this.getAllTag();
          },
          errorResponse => {
            const errorData = errorResponse.json();
            console.error(errorData.error);
          },
          () => {
            console.log('Finished onDeleteTag');
          })
      }else {
        this.messageService.add({severity:'warn', summary:'Etiqueta', detail:'No se puede eliminar una etiqueta asosiada a un juego!'});
      }

    }else{
      this.messageService.add({severity:'error', summary:'Etiqueta', detail:'No se puede eliminar la etiqueta!'});
    }
    this.isLoading = false;
  }

  getAllGames() {
    this._gameService.getAllByUsername(this._authS.user.username,
      // moment('10/01/2017').format('L'),
      // moment('11/22/2017').format('L')
    )
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
      );
  }

}
