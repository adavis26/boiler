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

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    // EffectsNgModule.forFeature([AuthEffects]),
  ],
  providers: [LoginService, SignupService, Actions],
  exports: []
})
export class AuthModule {}
