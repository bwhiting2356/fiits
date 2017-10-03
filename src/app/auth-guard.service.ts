import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';
// import {ifTrue} from "codelyzer/util/function";
// import "rxjs/add/observable/of";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot) {

    return this.authService.isAuthenticated().map((authenticated: boolean) => {
      if (authenticated) {
        return true
      } else {
        this.router.navigate(['/']);
        return false;
      }
    });
  }
}
