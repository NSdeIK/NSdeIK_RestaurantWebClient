import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //Ha van TOKEN, akkor bejelentkezve van
    if (localStorage.getItem('TOKEN_KEY')) {
      return true;
    }
    //Különben, ha nincs tokenje, akkor bejelentkezés lapra fog irányítani
    this.router.navigate(['/bejelentkezes']);
    return false;
  }
}
