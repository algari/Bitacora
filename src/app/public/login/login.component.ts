import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SessionStorageService} from 'ngx-webstorage';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../../common/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = <User>{};

  constructor(public _authService: AuthenticationService,
    public _router: Router,
    public _locker: SessionStorageService)
  {
  }

  ngOnInit() {
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this._authService.logIn(this.user.username, this.user.password).subscribe(
      (data) => {
          this._authService.user = data;
          this._authService.hasSession = true;
          this._locker.store('user', data);
          this._router.navigate(['/private/home']);
      },
      err => {
        console.error(err);
        this._authService.hasSession = false;
      }
    );
  }

}
