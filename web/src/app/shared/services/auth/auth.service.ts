import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserApiService } from '../api/user.api.service';
import { AmplifyService } from 'aws-amplify-angular';
import { get } from 'lodash';
import { log } from 'util';
import { environment } from '@environments/environment';

@Injectable()
export class AuthService {
  idToken: string;
  constructor(
    public jwtHelper: JwtHelperService,
    public userApiService: UserApiService,
    private auth: AmplifyService,
  ) {}
  public async isAuthenticated() {
    try {
      const session = await Auth.currentSession();
      const accessToken = session.getIdToken().getJwtToken();
      this.idToken = session.getIdToken().getJwtToken();
      if (!this.jwtHelper.isTokenExpired(accessToken)) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  public async getCurrentUser() {
    try {
      const session = await Auth.currentSession();
      const idToken = session.getIdToken().decodePayload();
      return idToken;
    } catch (err) {}
  }

  public async getCurrentUserId() {
    try {
      const user = await this.getCurrentUser();
      return user['userId'];
    } catch (err) {}
  }

  public async getCurrentUserEmail() {
    try {
      const user = await this.getCurrentUser();
      return user['email'];
    } catch (err) {}
  }

  public async isAdmin() {
    try {
      const user = await this.getCurrentUser();
      return user['admin'];
    } catch (err) {}
  }

  getToken() {
    const session = this.auth.auth();
    const token = get(session, 'user.signInUserSession.idToken.jwtToken');
    if (!token) {
      return this.idToken;
    }
    this.idToken = token;
    return this.idToken;
  }

  public async logOut() {
    await Auth.signOut();
    window.location.href = environment.loginUrl;
  }
}
