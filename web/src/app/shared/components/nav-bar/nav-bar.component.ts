import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shared/services/auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: []
})
export class NavBarComponent implements OnInit {
  currentUser: any;
  isAdmin: any;
  userName: string;

  constructor(public authService: AuthService) {
    setTimeout(() => {this.getUser(); }, 3000);
  }

  ngOnInit() {
  }

  async getUser() {
    this.currentUser = await this.authService.getCurrentUserDetails();

    if ( this.currentUser ) {
      this.userName = this.currentUser[0].firstName + ' ' + this.currentUser[0].lastName;
      this.isAdmin = this.currentUser[0].isAdmin;
      this.isAdmin = this.isAdmin === 1;


    } else {
      this.userName = 'User';
      this.isAdmin = false;
    }
  }

  async logOut() {
    this.authService.logOut();
  }

}
