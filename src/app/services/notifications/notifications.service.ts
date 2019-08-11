import { Injectable } from '@angular/core';

import { AppConstants } from 'src/app/constants/app.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  getNotifications(): Observable<object> {
    let url = AppConstants.notificationsUrl+ this.authService.getUserId();
    return this.http.get(url);
  }
}
