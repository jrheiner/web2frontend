import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenService} from '@core/services/token.service';
import {ApiService} from '@core/services/api.service';


@Injectable({
  providedIn: 'root'
})


export class RoleGuard implements CanActivate {
  constructor(private router: Router, private session: TokenService, private apiService: ApiService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const id: string = route.paramMap.get('id');
    console.log('RoleGuard called');
    return new Observable<any>(obs => {
      this.apiService.getPostById(id).subscribe(res => {
        if (res.author.username === this.session.getUsername()) {
          obs.next(true);
        } else {
          if (this.session.isLoggedIn()) {
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

