import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {
  }

  public clearSession(): void {
    sessionStorage.clear();
  }

  public isLoggedIn(): boolean {
    return !!this.getToken();
  }

  public getToken(): string {
    return sessionStorage.getItem('t');
  }

  public setToken(token: string): void {
    sessionStorage.setItem('t', token);
  }

  public getUsername(): string {
    return sessionStorage.getItem('user');
  }

  public setUsername(username: string): void {
    sessionStorage.setItem('user', username);
  }
}
