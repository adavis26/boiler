import { Component, OnInit } from '@angular/core';
import { User } from '@boiler/api-interfaces';
import { Actions } from '@ngneat/effects-ng';
import { Observable } from 'rxjs';
import { AuthRepository, logout } from '../../auth/state/auth.repository';

@Component({
  selector: 'boiler-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  public user$: Observable<User | undefined>;
  public isAuthenticated$: Observable<boolean>;

  constructor(
    private readonly authRepo: AuthRepository,
    private readonly actions: Actions
  ) {
    this.user$ = this.authRepo.user$;
    this.isAuthenticated$ = this.authRepo.isAuthenticated$;
  }

  public logout() {
    this.actions.dispatch(logout());
  }
}
