import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Actions } from '@ngneat/effects-ng';
import { login } from '../state/auth.repository';

interface LoginForm {
  username: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'boiler-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../auth.styles.scss'],
})
export class LoginComponent {
  public loginForm: FormGroup<LoginForm>;

  constructor(private actions: Actions) {
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
  }

  public login() {
    const { username, password } = this.loginForm.value;
    if (username && password) {
      this.actions.dispatch(login({ username, password }));
    }
  }
}
