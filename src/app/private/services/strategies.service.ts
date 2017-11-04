import { Injectable } from '@angular/core';
import {Config} from "../../common/config";
import {HttpService} from "../../common/services/http.service";
import {AuthenticationService} from "../../public/services/authentication.service";
import {Observable} from "rxjs";
import {Strategies} from "../../common/models/strategies.model";

@Injectable()
export class StrategiesService {

  apiBaseURL: string = Config.API_SERVER_URL;

  constructor(public _http: HttpService, private _authService: AuthenticationService) {
  }

  strategies:Strategies[];

  getAll(): Observable<Array<Strategies>> {
    const url = `${this.apiBaseURL}/api/strategies`;
    return this._http.get(url, this._authService.token);
  }

  getSingle(id: number): Observable<Strategies> {
    const url = `${this.apiBaseURL}/api/strategy/${id}`;
    return this._http.get(url, this._authService.token);
  }

  onDelete(strategy: Strategies) {
    const url = `${this.apiBaseURL}/api/strategy/${strategy._id}`;
    return this._http.delete(url, this._authService.token);
  }

  create(strategy: Strategies) {
    const url = `${this.apiBaseURL}/api/strategy`;
    return this._http.post(url,  strategy, this._authService.token);
  }

  update(strategy: Strategies) {
    const url = `${this.apiBaseURL}/api/strategy/${strategy._id}`;
    return this._http.put(url,  strategy, this._authService.token);
  }

}
