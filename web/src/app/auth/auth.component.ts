import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '@shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { Hub } from 'aws-amplify';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: [],
})
export class AuthComponent {
  logged: boolean;
  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone,
  ) {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          this.isUserLogged();
          break;
        case 'signOut':
          break;
      }
    });
    this.isUserLogged();
  }

  async isUserLogged() {
    this.logged = await this.authService.isAuthenticated();
    if (this.logged) {
      this.ngZone.run(() => this.router.navigate(['audit/products'])).then();
    }
  }
}
