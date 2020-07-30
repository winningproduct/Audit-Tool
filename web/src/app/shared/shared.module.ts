import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { AuthService } from './services/auth/auth.service';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AvatarModule } from 'ngx-avatar';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [SharedComponent, NavBarComponent, AlertComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    AvatarModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000
    }), // ToastrModule added
  ],
  exports: [NavBarComponent, AlertComponent],
  providers: [AuthService],
})
export class SharedModule {}
