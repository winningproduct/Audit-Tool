import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';
import { get } from 'lodash';
import { Observable } from 'rxjs';
import { AuthService } from '@shared/services/auth/auth.service';
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  sessionToken: string;
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      withCredentials : false,
      headers:  new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization:  `Bearer ${this.authService.getToken()}`
      })
  });
    return next.handle(request);
  }
}

