import { Route } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { LoginComponent } from './shared/auth/login/login.component';
import { SignupComponent } from './shared/auth/signup/signup.component';
import { UserResolver } from './shared/auth/user.resolver';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    resolve: [UserResolver],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    resolve: [UserResolver],
    component: NotFoundComponent,
  },
];
