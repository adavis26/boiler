import { Injectable } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import { actionsFactory, props } from '@ngneat/effects';
import { CreateUserDTO, LoginDTO, User } from '@boiler/api-interfaces';
import { Actions } from '@ngneat/effects-ng';

interface AuthProps {
  isAuthenticated: boolean;
  user?: User;
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

export const logout = authActions.create('logout');
export const unathenticatedLogout = authActions.create('logout unathenticated');

export const signup = authActions.create('signup', props<CreateUserDTO>());
export const signupSuccess = authActions.create('signup success');
export const signupFailure = authActions.create('signup success', props<any>());

@Injectable({ providedIn: 'root' })
export class AuthRepository {
  public user$ = store.pipe(select((state) => state.user));
  public isAuthenticated$ = store.pipe(
    select((state) => state.isAuthenticated)
  );

  constructor(private readonly actions: Actions) {
    this.reducer();
  }

  public reducer() {
    this.actions.subscribe((action) => {
      switch (action.type) {
        case loginSuccess.type:
          this.setUser(action['user']);
          return;
        case logout.type:
          this.logout();
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
    }));
  }

  public logout() {
    store.update(() => initialStore);
  }
}
