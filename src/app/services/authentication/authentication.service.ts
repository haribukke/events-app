import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

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
}
