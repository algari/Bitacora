import { Injectable } from '@angular/core';
import { HttpService } from '../../common/services/http.service';
import { SessionStorageService } from 'ngx-webstorage';
import { Config } from '../../common/config';
import { User } from '../../common/models/user.model';

@Injectable()
export class AuthenticationService {
  hasSession = false;
  user:User;
  apiBaseURL: string = Config.API_SERVER_URL;

  constructor(public _http: HttpService, public _locker: SessionStorageService) {
  }

  public isLoggedIn() {
    const user = this._locker.retrieve('user');
    if (!!user) {
      this.user = user;
      this.hasSession = true;
    }
    return this.hasSession;
  }

  public logIn(username: string, password: string) {
    const url = `${this.apiBaseURL}/users/login`;

    return this._http.post(url, {
      'username': username,
      'password': password
    });
  }

  public logout() {
    this.user = null;
    this.hasSession = false;
    this._locker.clear('user');
  }

}
