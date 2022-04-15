import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getLoginURI, getRegistrationURI } from '../../util/url-helper';
import { Router } from '@angular/router';
import { LoginModel } from '../models/LoginModel';
import { RegisterModel } from '../models/RegisterModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(login: LoginModel): Observable<any> {
    return this.httpClient.post<User>(getLoginURI(), {
       username: login.username,
       password: login.password
    }, this.httpOptions);
  }

  register(registration: RegisterModel): Observable<any> {
    return this.httpClient.post<User>(getRegistrationURI(), registration, this.httpOptions);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
