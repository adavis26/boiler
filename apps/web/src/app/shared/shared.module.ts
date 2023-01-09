import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { AuthModule } from './auth/auth.module';
import { NavComponent } from './components/nav/nav.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavComponent, NotFoundComponent],
  imports: [CommonModule, MaterialModule, AuthModule, RouterModule],
  exports: [MaterialModule, NavComponent],
})
export class SharedModule {}
