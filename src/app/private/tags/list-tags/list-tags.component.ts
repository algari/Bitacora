import { Component, OnInit } from '@angular/core';
import {Tag} from "../../../common/models/tag";
import {AuthenticationService} from "../../../public/services/authentication.service";
import {TagService} from "../../services/tag.service";

@Component({
  selector: 'app-list-tags',
  templateUrl: './list-tags.component.html',
  styleUrls: ['./list-tags.component.css']
})
export class ListTagsComponent implements OnInit {

  tags: Array<Tag>;
  isLoading = true;

  constructor(private _authS: AuthenticationService,
              private _tagS:TagService) { }

  ngOnInit() {
    this.getAllTag();
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
    this.isLoading = false;
  }

}
