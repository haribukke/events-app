import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../../constants/app.constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  token: string;
  id: number;

  constructor(
    private http: HttpClient
  ) { }

  registerUser(obj): Observable<Object> {
    let url = AppConstants.registerUrl;
    return this.http.post(url, obj)
  }

  login(obj): Observable<Object> {
    let url = AppConstants.loginUrl;
    return this.http.post(url, obj)
  }

  setUserId(id): void {
    this.id = id;
    localStorage.setItem('userId', id);
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('access-token', token);
  }

  getAuthorizationToken(): string {
    return this.token || localStorage.getItem('access-token');
  }

  getUserId(): string | number {
    return this.id || localStorage.getItem('userId')
  }
}
