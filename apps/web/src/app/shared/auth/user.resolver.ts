import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '@boiler/api-interfaces';
import { map, Observable } from 'rxjs';
import { AuthRepository } from './state/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<boolean> {
  constructor(
    private readonly authRepo: AuthRepository,
    private readonly jwtHelperService: JwtHelperService
  ) {}

  resolve(): Observable<boolean> {
    return this.authRepo.user$.pipe(
      map((user) => {
        if (!user) {
          const access_token = window.localStorage.getItem(
            'access_token'
          ) as string;
          const user = this.jwtHelperService.decodeToken(access_token) as User;
          this.authRepo.setUser(user);
        }

        return true;
      })
    );
  }
}
