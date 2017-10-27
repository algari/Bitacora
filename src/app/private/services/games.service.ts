import { Injectable } from '@angular/core';
import {HttpService} from "../../common/services/http.service";
import {Config} from "../../common/config";
import {Observable} from "rxjs";
import {Games} from "../../common/models/games.model";
import {AuthenticationService} from "../../public/services/authentication.service";

@Injectable()
export class GamesService {

  apiBaseURL: string = Config.API_SERVER_URL;

  constructor(public _http: HttpService, private _authService: AuthenticationService) {
  }

  getAll(): Observable<Array<Games>> {
    const url = `${this.apiBaseURL}/api/game`;
    return this._http.get(url, this._authService.user.token);
  }

  getSingle(id: number): Observable<Games> {
    const url = `${this.apiBaseURL}/api/game/${id}`;
    return this._http.get(url, this._authService.user.token);
  }

  onDelete(game: Games) {
    const url = `${this.apiBaseURL}/api/game/${game._id}`;
    return this._http.delete(url, this._authService.user.token);
  }

  create(game: Games) {
    const url = `${this.apiBaseURL}/api/game`;
    return this._http.post(url,  game, this._authService.user.token);
  }

  update(game: Games) {
    const url = `${this.apiBaseURL}/api/game/${game._id}`;
    return this._http.put(url,  game, this._authService.user.token);
  }
}
