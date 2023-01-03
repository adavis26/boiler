import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Actions } from '@ngneat/effects-ng';
import { Observable } from 'rxjs';
import { unathenticatedLogout } from './state/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtHelperService: JwtHelperService,
    private readonly router: Router,
    private readonly actions: Actions
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const key = window.localStorage.getItem('access_token');

    if (!key || this.jwtHelperService.isTokenExpired(key)) {
      this.actions.dispatch(unathenticatedLogout());
      return false;
    }

    return true;
  }
}
