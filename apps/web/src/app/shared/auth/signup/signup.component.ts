import { Component, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Actions } from '@ngneat/effects-ng';
import { Observable } from 'rxjs';
import { AuthRepository, signup, signupClear } from '../state/auth.repository';

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
export class SignupComponent implements OnDestroy {
  public signupForm: FormGroup<SignupForm>;
  public signUp$: Observable<any>;

  constructor(
    private actions: Actions,
    private readonly authRepository: AuthRepository
  ) {
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

    this.signUp$ = this.authRepository.signUp$;
  }

  ngOnDestroy(): void {
    this.actions.dispatch(signupClear());
  }

  public signup() {
    const { username, password } = this.signupForm.value;
    if (username && password) {
      this.actions.dispatch(signup({ username, password }));
    }
  }

  public reload(): void {
    this.actions.dispatch(signupClear());
  }

  private confirmPasswordValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const mismatch =
        control.value !== this.signupForm?.controls?.password.value;
      return mismatch ? { confirmPassword: { value: true } } : null;
    };
  }
}
