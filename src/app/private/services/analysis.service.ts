import { Injectable } from '@angular/core';
import {Config} from "../../common/config";
import {HttpService} from "../../common/services/http.service";
import {AuthenticationService} from "../../public/services/authentication.service";
import {Observable} from "rxjs";
import {StrategiesAnalysis} from "../../common/models/strategiesAnalysis";

@Injectable()
export class AnalysisService {

  apiBaseURL: string = Config.API_SERVER_URL;

  constructor(public _http: HttpService, public _authService: AuthenticationService) {
  }

  strategiesAnalysis(date_in: string,date_out: string,username:string): Observable<StrategiesAnalysis> {
    const url = `${this.apiBaseURL}/api/analysis/strategies?date_in=${date_in}&date_out=${date_out}&username=${username}`;
    return this._http.get(url, this._authService.token);
  }

}
