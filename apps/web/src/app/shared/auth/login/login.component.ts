import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Actions } from '@ngneat/effects-ng';
import { Observable } from 'rxjs';
import { AuthRepository, login, loginClear } from '../state/auth.repository';

interface LoginForm {
  username: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'boiler-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../auth.styles.scss'],
})
export class LoginComponent implements OnDestroy {
  public loginForm: FormGroup<LoginForm>;
  public login$: Observable<{ loading: boolean; error?: boolean } | undefined>;

  constructor(
    private actions: Actions,
    private readonly authRepo: AuthRepository
  ) {
    this.loginForm = new FormGroup<LoginForm>({
      username: new FormControl('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: Validators.required,
      }),
    });

    this.login$ = this.authRepo.login$;
  }

  ngOnDestroy(): void {
      this.actions.dispatch(loginClear())
  }

  public login() {
    const { username, password } = this.loginForm.value;
    if (username && password) {
      this.actions.dispatch(login({ username, password }));
    }
  }
}
