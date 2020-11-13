import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenService} from './services/token.service';
import {ApiService} from './services/api.service';

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
        // TODO easy to circumvent but does not matter since api will return 401
        if (res.author.username === this.session.getUsername()) {
          obs.next(true);
        } else {
          this.router.navigate(['/post/' + id]);
          obs.next(false);
        }
      }, err => {
        obs.next(false);
        console.log(err);
      });
    });
  }
}

