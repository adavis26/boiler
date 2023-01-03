import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { AuthModule } from './auth/auth.module';
import { NavComponent } from './components/nav/nav.component';

@NgModule({
  declarations: [NavComponent],
  imports: [CommonModule, MaterialModule, AuthModule],
  exports: [MaterialModule, NavComponent],
})
export class SharedModule {}
