import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  token: string;
  id: number;

  constructor(
    private http: HttpClient
  ) { }

  registerUser(obj) {
    let url = AppConstants.registerUrl;
    return this.http.post(url, obj)
  }

  login(obj) {
    let url = AppConstants.loginUrl;
    return this.http.post(url, obj)
  }

  setUserId(id) {
    this.id = id;
    localStorage.setItem('userId', id);
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('access-token', token);
  }

  getAuthorizationToken() {
    return this.token || localStorage.getItem('access-token');
  }

  getUserId() {
    return this.id || localStorage.getItem('userId')
  }
}
