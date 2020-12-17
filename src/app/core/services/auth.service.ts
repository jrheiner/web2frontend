import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {TokenService} from './token.service';

/**
 * Authentication service
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Constructor
   * @param apiService - ApiService to make API calls
   * @param session - TokenService
   */
  constructor(private apiService: ApiService, private session: TokenService) {
  }

  /**
   * Stores the URL so we can redirect after logging in
   */
  redirectUrl: string;

  /**
   * Wrapper function to pass login request to ApiService
   * @param username - Username
   * @param password - Password
   */
  login(username: string, password: string): Observable<any> {
    return this.apiService.login(username, password);
  }

  /**
   * Logout the current user by clearing the session storage.
   * @description The session/auth token is stored in session store, hence clearing it log the user out.
   */
  logout(): void {
    this.session.clearSession();
  }

}
