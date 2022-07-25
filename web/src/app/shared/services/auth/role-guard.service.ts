import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate
} from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from '@environments/environment';

@Injectable()
export class RoleGuardService implements CanActivate {
isAuth: boolean;
  constructor(public auth: AuthService, public router: Router) {
  }

  async canActivate(): Promise<boolean> {
    const isAdmin = await this.auth.isAdmin();
    if (
    isAdmin == 1
  ) {
    return true;
  } else {  window.location.href = environment.loginUrl; }

}

  async logIn() {
    window.location.href = environment.loginUrl;
  }
}
