import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { AuthenticationService } from '../../public/services/authentication.service';

@Injectable()
export class PublicGuard implements CanActivate {
  constructor(public _authenticationService: AuthenticationService,
              public router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this._authenticationService.isLoggedIn()) {
      return true;
    }

    console.log('you are login!');
    this.router.navigate(['/private/home']);
    return false;
  }
}
