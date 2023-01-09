import { Injectable } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import { actionsFactory, props } from '@ngneat/effects';
import { CreateUserDTO, LoginDTO, User } from '@boiler/api-interfaces';
import { Actions } from '@ngneat/effects-ng';

interface AuthProps {
  isAuthenticated: boolean;
  user?: User;
  login?: {
    loading: boolean;
    error?: boolean;
  };
  signUp?: {
    loading: boolean;
    loaded: boolean;
    created: boolean;
    error?: boolean;
  };
}

const initialStore: AuthProps = {
  isAuthenticated: false,
};

const store = createStore({ name: 'auth' }, withProps<AuthProps>(initialStore));

export const authActions = actionsFactory('auth');

export const login = authActions.create('login', props<LoginDTO>());
export const loginError = authActions.create('login error', props<any>());
export const loginSuccess = authActions.create(
  'login success',
  props<{ user: User }>()
);
export const loginClear = authActions.create('login clear');

export const logout = authActions.create('logout');
export const unathenticatedLogout = authActions.create('logout unathenticated');

export const signup = authActions.create('signup', props<CreateUserDTO>());
export const signupSuccess = authActions.create('signup success');
export const signupFailure = authActions.create('signup failure', props<any>());
export const signupClear = authActions.create('signup clear');

@Injectable({ providedIn: 'root' })
export class AuthRepository {
  public user$ = store.pipe(select((state) => state.user));
  public isAuthenticated$ = store.pipe(
    select((state) => state.isAuthenticated)
  );

  public signUp$ = store.pipe(select((state) => state.signUp));
  public login$ = store.pipe(select((state) => state.login));

  constructor(private readonly actions: Actions) {
    this.reducer();
  }

  public reducer() {
    this.actions.subscribe((action) => {
      switch (action.type) {
        case login.type:
          store.update((state) => ({
            ...state,
            login: {
              loading: true,
            },
          }));
          return;
        case loginError.type:
          store.update((state) => ({
            ...state,
            login: {
              loading: false,
              error: true,
            },
          }));
          return;
        case loginSuccess.type:
          this.setUser(action['user']);
          return;
        case loginClear.type:
          store.update((state) => {
            const next = Object.assign({}, state);
            delete next.login;
            return next;
          });
          return;
        case logout.type:
          this.logout();
          return;
        case signup.type:
          store.update((state) => ({
            ...state,
            signUp: {
              loaded: false,
              loading: true,
              created: false,
            },
          }));
          return;
        case signupSuccess.type:
          store.update((state) => ({
            ...state,
            signUp: {
              loaded: true,
              loading: false,
              created: true,
            },
          }));
          return;
        case signupFailure.type:
          store.update((state) => ({
            ...state,
            signUp: {
              loaded: true,
              loading: false,
              created: false,
              error: true,
            },
          }));
          return;
        case signupClear.type:
          store.update((state) => {
            const next = Object.assign({}, state);
            delete next.signUp;
            return next;
          });
          return;
        default:
          break;
      }
    });
  }

  public setUser(user: User): void {
    store.update((state) => ({
      ...state,
      user,
      isAuthenticated: true,
      login: {
        loading: false,
      },
    }));
  }

  public logout() {
    store.update(() => initialStore);
  }
}
