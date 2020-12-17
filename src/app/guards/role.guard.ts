import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenService} from '@core/services/token.service';
import {ApiService} from '@core/services/api.service';

/**
 * Route guard to check if the current user has privileges to edit or delete a post.
 */

// noinspection JSUnusedLocalSymbols
@Injectable({
  providedIn: 'root'
})


export class RoleGuard implements CanActivate {
  /**
   * Constructor
   * @param router - Router to navigate the user
   * @param session - TokenService to get session information
   * @param apiService - ApiService to make API calls
   */
  constructor(private router: Router, private session: TokenService, private apiService: ApiService) {
  }

  /**
   * Route guard function to determine if the route should be activated.
   * @param route - Route that called the guard
   * @param state - Current router state
   * @description Note: This function uses the username stored in session storage which can be easily manipulated.
   * There it should only be used to allow visual access to components.
   * The server side validates ownership and privileges based on the session token.
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const id: string = route.paramMap.get('id');
    return new Observable<any>(obs => {
      this.apiService.getPostById(id).subscribe(res => {
        if (res.author.username === this.session.getUsername()) {
          obs.next(true);
        } else {
          if (this.session.isLoggedIn()) {
            // noinspection JSIgnoredPromiseFromCall
            this.router.navigate(['/post/' + id]);
          }
          obs.next(false);
        }
      }, err => {
        obs.next(false);
        console.log(err);
      });
    });
  }
}

