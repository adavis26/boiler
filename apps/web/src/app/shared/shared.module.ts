import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModule, AuthModule],
  exports: [MaterialModule],
})
export class SharedModule {}
