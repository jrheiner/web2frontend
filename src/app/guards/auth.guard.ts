import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenService} from '../core/services/token.service';

import {AuthService} from '../core/services/auth.service';

/**
 * Route guard to check if a user is logged in. Redirects them to the login page if they are not logged in.
 * Stores the original url the user was trying to visit to redirect them there after login.
 */
@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  /**
   * AuthGuard constructor
   * @param authService - To pass the redirect url to the login service
   * @param router - Router to redirect the user
   * @param session - To determine whether the user is already logged in
   */
  constructor(private authService: AuthService, private router: Router, private session: TokenService) {
  }

  /**
   * Decides if current route should be activated or based on the login status of the user
   * @param route - Information about the route that called the guard
   * @param state - Original url
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  /**
   * Checks the SessionStorage if the user is logged in.
   *  - If the user is logged in return `true`
   *  - If the user is not logged in redirect them to the login page
   *
   * @param url - Redirect URL, User will be redirected here after logging in
   */
  checkLogin(url: string): boolean | UrlTree {
    if (this.session.isLoggedIn()) {
      return true;
    }
    this.authService.redirectUrl = url;
    return this.router.parseUrl('/login');
  }

}
