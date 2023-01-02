import { Route } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './shared/auth/login/login.component';
import { SignupComponent } from './shared/auth/signup/signup.component';

export const appRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
];
