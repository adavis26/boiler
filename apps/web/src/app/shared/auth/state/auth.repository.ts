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
export const signup = authActions.create('signup', props<CreateUserDTO>());

@Injectable({ providedIn: 'root' })
export class TodosRepository {}
