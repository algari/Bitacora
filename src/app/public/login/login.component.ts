import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SessionStorageService} from 'ngx-webstorage';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../../common/models/user.model';
import {MessageService} from "primeng/components/common/messageservice";
import * as moment from 'moment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = <User>{};

  constructor(public _authService: AuthenticationService,
    public _router: Router,
    public _locker: SessionStorageService,
    public messageService: MessageService)
  {
  }

  ngOnInit() {
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this._authService.logIn(this.user.username, this.user.password).subscribe(
      (data) => {
        if(moment(data.user[0].expires_at).format() <= moment().format()){
          this.messageService.add({severity:'warn', summary:'Login', detail:'Cuenta expirada :('});
        }else{
          this._authService.user = data.user[0];
          this._authService.token = data.token;
          this._authService.hasSession = true;
          this._locker.store('storage', data);
          this._router.navigate(['/private/home']);
        }
      },
      err => {
        console.error(err);
        this._authService.hasSession = false;
        this.messageService.add({severity:'warn', summary:'Login', detail:'Credenciales incorrectas'});
      }
    );
  }

}
