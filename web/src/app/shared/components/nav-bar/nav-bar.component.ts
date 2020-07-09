import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shared/services/auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: []
})
export class NavBarComponent implements OnInit {
  currentUser: any;
  userName: string;
  constructor(public authService: AuthService) {
    this.getUser();
   }

  ngOnInit() {
  }
  async getUser() {
    this.currentUser = await this.authService.getCurrentUser();
    if ( this.currentUser ) {
      this.userName = this.currentUser.given_name + ' ' + this.currentUser.family_name;
    } else {
      this.userName = 'User';
    }
  }

  async logOut() {
    this.authService.logOut();
  }

}
