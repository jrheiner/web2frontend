import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  loginChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  userChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  public clearSession(): void {
    sessionStorage.clear();
    this.loginChange.emit(false);

  }

  public isLoggedIn(): boolean {
    return !!this.getToken();
  }

  public getToken(): string {
    return sessionStorage.getItem('t');
  }

  public setToken(token: string): void {
    sessionStorage.setItem('t', token);
    this.loginChange.emit(true);
  }

  public getUsername(): string {
    return sessionStorage.getItem('user');
  }

  public setUsername(username: string): void {
    sessionStorage.setItem('user', username);
    this.userChange.emit(username);
  }
}
