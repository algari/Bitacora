import { Component, OnInit } from '@angular/core';
import {Sources} from "../../../common/models/sources.model";
import {AuthenticationService} from "../../../public/services/authentication.service";
import {SourcesService} from "../../services/sources.service";

@Component({
  selector: 'app-list-sources',
  templateUrl: './list-sources.component.html',
  styleUrls: ['./list-sources.component.css']
})
export class ListSourcesComponent implements OnInit {

  sources: Array<Sources>;
  isLoading = true;

  constructor(private _authS: AuthenticationService,
              private _sourceS:SourcesService) { }

  ngOnInit() {
    this.getAllSources();
  }

  private getAllSources() {
    this._sourceS.getAllByUsername(this._authS.user.username).subscribe(
      (data: Sources[]) => {
        //next
        this.sources = data
        this.isLoading = false;
      },
      err => {
        console.error(err);
      },
      () => {
        console.log('Finished getAllSources');

      }
    )
  }

  onDeleteSource(source: Sources) {
    this.isLoading = true;
    console.log(`Fuente a eliminar: ${source.source}`);
    this._sourceS.onDelete(source).subscribe((data) => {
        this.getAllSources();
      },
      errorResponse => {
        const errorData = errorResponse.json();
        console.error(errorData.error);
      },
      () => {
        console.log('Finished onDeleteSource');
      })
    this.isLoading = false;
  }

}
