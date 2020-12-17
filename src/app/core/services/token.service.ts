import {EventEmitter, Injectable} from '@angular/core';

/**
 * TokenService, handles sessionStorage to keep information about the current user and session state.
 * Also provides EventEmitter if anything changes.
 */
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  /**
   * Emits a new login state change
   */
  loginChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  /**
   * Emits a new username change
   */
  userChange: EventEmitter<string> = new EventEmitter<string>();
  /**
   * Emits if a new comment was posted
   */
  newComment: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Constructor
   */
  constructor() {
  }

  /**
   * Clear session storage, changes loggedIn state to false
   */
  public clearSession(): void {
    sessionStorage.clear();
    this.loginChange.emit(false);
  }

  /**
   * Returns Boolean whether the current user has a token.
   * @description Warning: Session storage can be manipulated,
   * therefore isLoggedIn() that does provide information if the stored token is valid.
   */
  public isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * Gets the session token from session storage
   */
  public getToken(): string {
    return sessionStorage.getItem('t');
  }

  /**
   * Sets a new session token
   * @param token - Session/Auth token
   */
  public setToken(token: string): void {
    sessionStorage.setItem('t', token);
    this.loginChange.emit(true);
  }

  /**
   * Gets the username of the current user
   * @description Warning: Session storage can be manipulated, therefore this value should be treated with caution
   */
  public getUsername(): string {
    return sessionStorage.getItem('user');
  }

  /**
   * Sets the username in session storage
   * @param username - Username
   */
  public setUsername(username: string): void {
    sessionStorage.setItem('user', username);
    this.userChange.emit(username);
  }
}
