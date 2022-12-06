import {Injectable} from "@angular/core";

const TOKEN_KEY = 'auth-token';
const ROLE = 'auth-role';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService{
  constructor() {}

  kijelentkezes(): void {
    window.sessionStorage.clear();
  }

  public tokenMentes(token: string, role: string): void{
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(ROLE);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    window.sessionStorage.setItem(ROLE, role);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public getRole(): string | null {
    return window.sessionStorage.getItem(ROLE);
  }
}
