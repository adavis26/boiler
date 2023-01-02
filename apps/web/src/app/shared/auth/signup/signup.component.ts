import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Actions } from '@ngneat/effects-ng';
import { signup } from '../state/auth.repository';

interface SignupForm {
  username: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'boiler-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  public signupForm: FormGroup<SignupForm>;

  constructor(private actions: Actions) {
    this.signupForm = new FormGroup<SignupForm>({
      username: new FormControl('', { nonNullable: true }),
      password: new FormControl('', { nonNullable: true }),
    });
  }

  public signup() {
    const { username, password } = this.signupForm.value;
    if (username && password) {
      this.actions.dispatch(signup({ username, password }));
    }
  }
}
