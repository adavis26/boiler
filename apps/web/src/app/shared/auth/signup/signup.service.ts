import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUserDTO } from '@boiler/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private readonly http: HttpClient) {}

  public signup(payload: CreateUserDTO) {
    return this.http.post('/api/users', payload);
  }

}
