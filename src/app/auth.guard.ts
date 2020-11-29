import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenService} from './services/token.service';

import {AuthService} from './services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private session: TokenService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('AuthGuard called');
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
    console.log('checkLogin: ' + this.session.isLoggedIn());
    if (this.session.isLoggedIn()) {
      return true;
    }


    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Redirect to the login page
    return this.router.parseUrl('/login');
  }

}
