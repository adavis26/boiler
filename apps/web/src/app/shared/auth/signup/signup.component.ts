import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Actions } from '@ngneat/effects-ng';
import { signup } from '../state/auth.repository';

interface SignupForm {
  username: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}

@Component({
  selector: 'boiler-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../auth.styles.scss'],
})
export class SignupComponent {
  public signupForm: FormGroup<SignupForm>;

  constructor(private actions: Actions) {
    this.signupForm = new FormGroup<SignupForm>({
      username: new FormControl('', { nonNullable: true }),
      password: new FormControl('', {
        nonNullable: true,
      }),
      confirmPassword: new FormControl('', {
        nonNullable: true,
        validators: [this.confirmPasswordValidation()],
        updateOn: 'blur',
      }),
    });
  }

  public signup() {
    const { username, password } = this.signupForm.value;
    if (username && password) {
      this.actions.dispatch(signup({ username, password }));
    }
  }

  private confirmPasswordValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const mismatch =
        control.value !== this.signupForm?.controls?.password.value;
      return mismatch ? { confirmPassword: { value: true } } : null;
    };
  }
}
