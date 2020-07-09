import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { AmplifyService, AmplifyAngularModule } from 'aws-amplify-angular';
import { AuthService } from '@shared/services/auth/auth.service';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, AuthRoutingModule, AmplifyAngularModule],
  providers: [AmplifyService, AuthService],
})
export class AuthModule {}
