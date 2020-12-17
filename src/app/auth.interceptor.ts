import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TokenService} from '@core/services/token.service';

/**
 * HTTP Interceptor to set authorization header
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   * AuthInterceptor Constructor
   * @param session - TokenService
   */
  constructor(private session: TokenService) {
  }

  /**
   * Intercept function to add Bearer token for every request if user is logged in
   * @param request - Incoming http request
   * @param next - HttpHandler to pass the request on
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.session.isLoggedIn()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.session.getToken()}`
        }
      });
    }
    return next.handle(request);
  }
}

