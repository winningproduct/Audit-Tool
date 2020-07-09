import { Component } from '@angular/core';
import { AuthService } from '@shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'auditTool';

  constructor() {
  // Subscribe to IsSignIn and then update the user in NgRxStore
  // Also update the interceptor
  }

  OnInit() {
  }
}

