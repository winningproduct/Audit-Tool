import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { AuthService } from './services/auth/auth.service';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AvatarModule } from 'ngx-avatar';

@NgModule({
  declarations: [SharedComponent, NavBarComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    AvatarModule,
    BsDropdownModule.forRoot(),
  ],
  exports: [NavBarComponent],
  providers: [
    AuthService,
  ]
})
export class SharedModule { }
