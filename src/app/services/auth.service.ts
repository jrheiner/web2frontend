import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private apiService: ApiService, private session: TokenService) {
  }

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(username: string, password: string): Observable<any> {
    return this.apiService.login(username, password);
  }

  logout(): void {
    this.session.clearSession();
  }
}
