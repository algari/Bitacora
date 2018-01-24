import { Injectable } from '@angular/core';
import {HttpService} from "../../common/services/http.service";
import {AuthenticationService} from "../../public/services/authentication.service";
import {User} from "../../common/models/user.model";
import {Config} from "../../common/config";

@Injectable()
export class UsersService {

  apiBaseURL: string = Config.API_SERVER_URL;

  constructor(public _http: HttpService, public _authService: AuthenticationService) {
  }

  update(user: User) {
    const url = `${this.apiBaseURL}/api/users/${user._id}`;
    return this._http.put(url,  user, this._authService.token);
  }

}
