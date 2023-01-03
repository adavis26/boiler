import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { LoginService } from './login/login.service';
import { SignupService } from './signup/signup.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Actions } from '@ngneat/effects';
import { AuthGuard } from './auth.guard';
import { UserResolver } from './user.resolver';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [LoginService, SignupService, Actions, AuthGuard, UserResolver],
  exports: [],
})
export class AuthModule {}
