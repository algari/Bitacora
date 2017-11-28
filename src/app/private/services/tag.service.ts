import { Injectable } from '@angular/core';
import {Config} from "../../common/config";
import {AuthenticationService} from "../../public/services/authentication.service";
import {HttpService} from "../../common/services/http.service";
import {Tag} from "../../common/models/tag";
import {Observable} from "rxjs";

@Injectable()
export class TagService {

  apiBaseURL: string = Config.API_SERVER_URL;

  constructor(public _http: HttpService, public _authService: AuthenticationService) {
  }

  tag:Tag[];

  getAll(): Observable<Array<Tag>> {
    const url = `${this.apiBaseURL}/api/tags`;
    return this._http.get(url, this._authService.token);
  }

  getAllByUsername(username:string): Observable<Array<Tag>> {
    const url = `${this.apiBaseURL}/api/tagbyusername/${username}`;
    return this._http.get(url, this._authService.token);
  }

  getSingle(id: number): Observable<Tag> {
    const url = `${this.apiBaseURL}/api/tag/${id}`;
    return this._http.get(url, this._authService.token);
  }

  onDelete(tag: Tag) {
    const url = `${this.apiBaseURL}/api/tag/${tag._id}`;
    return this._http.delete(url, this._authService.token);
  }

  create(tag: Tag) {
    const url = `${this.apiBaseURL}/api/tag`;
    return this._http.post(url,  tag, this._authService.token);
  }

  update(tag: Tag) {
    const url = `${this.apiBaseURL}/api/tag/${tag._id}`;
    return this._http.put(url,  tag, this._authService.token);
  }

}
