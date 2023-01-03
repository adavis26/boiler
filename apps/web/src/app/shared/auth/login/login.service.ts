import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDTO } from '@boiler/api-interfaces';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  public login(payload: LoginDTO) {
    return this.http
      .post<{ access_token: string }>('api/auth/login', payload)
      .pipe(
        tap((res) =>
          window.localStorage.setItem('access_token', res.access_token)
        ),
        tap(() => this.router.navigate(['/']))
      );
  }

  public logout() {
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }
}
