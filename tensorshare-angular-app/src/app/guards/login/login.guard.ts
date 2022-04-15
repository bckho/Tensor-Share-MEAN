import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authtoken = localStorage.getItem("authtoken");

    const isUnauthenticated = authtoken == null || authtoken == undefined;

    if (!isUnauthenticated) {
      this.router.navigate(['Explore']);
    }

    return isUnauthenticated;
  }
}
