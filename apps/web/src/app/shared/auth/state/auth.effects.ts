import { Injectable } from '@angular/core';
import { createEffect, ofType } from '@ngneat/effects';
import { Actions } from '@ngneat/effects-ng';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { LoginService } from '../login/login.service';
import { SignupService } from '../signup/signup.service';
import {
  login,
  loginError,
  loginSuccess,
  logout,
  signup,
  signupFailure,
  signupSuccess,
  unathenticatedLogout,
} from './auth.repository';

@Injectable({ providedIn: 'root' })
export class AuthEffects {
  constructor(
    private signupService: SignupService,
    private loginService: LoginService,
    private actions: Actions,
  ) {}

  signup$ = createEffect((actions) =>
    actions.pipe(
      ofType(signup),
      switchMap((payload) =>
        this.signupService
          .signup({
            username: payload.username,
            password: payload.password,
          })
          .pipe(
            map(() => of(this.actions.dispatch(signupSuccess()))),
            catchError((e) => of(this.actions.dispatch(signupFailure(e))))
          )
      ),
      catchError((e) => of(this.actions.dispatch(signupFailure(e))))
    )
  );

  login$ = createEffect((actions) =>
    actions.pipe(
      ofType(login),
      switchMap((payload) =>
        this.loginService
          .login({
            username: payload.username,
            password: payload.password,
          })
          .pipe(
            map((payload) => of(this.actions.dispatch(loginSuccess(payload)))),
            catchError((e) => of(this.actions.dispatch(loginError(e))))
          )
      ),
      catchError((e) => of(this.actions.dispatch(loginError(e))))
    )
  );

  logout$ = createEffect((actions) =>
    actions.pipe(
      ofType(logout, unathenticatedLogout),
      switchMap(() => of(this.loginService.logout()))
    )
  );
}
