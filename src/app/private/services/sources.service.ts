import { Injectable } from '@angular/core';
import {Config} from "../../common/config";
import {HttpService} from "../../common/services/http.service";
import {AuthenticationService} from "../../public/services/authentication.service";
import {Sources} from "../../common/models/sources.model";
import {Observable} from "rxjs";

@Injectable()
export class SourcesService {

  apiBaseURL: string = Config.API_SERVER_URL;

  constructor(public _http: HttpService, public _authService: AuthenticationService) {
  }

  Sources:Sources[];

  getAll(): Observable<Array<Sources>> {
    const url = `${this.apiBaseURL}/api/Sources`;
    return this._http.get(url, this._authService.token);
  }

  getAllByUsername(username:string): Observable<Array<Sources>> {
    const url = `${this.apiBaseURL}/api/sourcebyusername/${username}`;
    return this._http.get(url, this._authService.token);
  }

  getSingle(id: number): Observable<Sources> {
    const url = `${this.apiBaseURL}/api/source/${id}`;
    return this._http.get(url, this._authService.token);
  }

  onDelete(source: Sources) {
    const url = `${this.apiBaseURL}/api/source/${source._id}`;
    return this._http.delete(url, this._authService.token);
  }

  create(source: Sources) {
    const url = `${this.apiBaseURL}/api/source`;
    return this._http.post(url,  source, this._authService.token);
  }

  update(source: Sources) {
    const url = `${this.apiBaseURL}/api/source/${source._id}`;
    return this._http.put(url,  source, this._authService.token);
  }

}
