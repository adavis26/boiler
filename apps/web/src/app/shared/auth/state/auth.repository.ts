import { Injectable } from '@angular/core';
import { createStore, withProps } from '@ngneat/elf';
import { actionsFactory, props } from '@ngneat/effects';
import { CreateUserDTO, LoginDTO, User } from '@boiler/api-interfaces';

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
export const loginSuccess = authActions.create('login success');
export const logout = authActions.create('logout')
export const unathenticatedLogout = authActions.create('logout unathenticated')

export const signup = authActions.create('signup', props<CreateUserDTO>());
export const signupSuccess = authActions.create('signup success');
export const signupFailure = authActions.create('signup success', props<any>());

@Injectable({ providedIn: 'root' })
export class TodosRepository {}
