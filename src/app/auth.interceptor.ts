import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TokenService} from './services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private session: TokenService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.session.isLoggedIn()) {
      console.log('interceptor called');
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.session.getToken()}`
        }
      });
    }

    return next.handle(request);
  }
}

