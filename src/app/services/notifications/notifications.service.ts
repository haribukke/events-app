import { Injectable, OnInit } from '@angular/core';

import { AppConstants } from 'src/app/constants/app.constants';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private data: any
  notifObs = new BehaviorSubject<any>(this.data);

  public notifications = this.notifObs.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  init() {
    this.getNotifications()
      .subscribe(data => {
        this.updateNotifications(data);
      })
  }

  getNotifications(): Observable<object> {
    let url = AppConstants.notificationsUrl + this.authService.getUserId();
    return this.http.get(url);
  }

  updateNotifications(data) {
    console.log('update', data)
    this.notifObs.next(data)
  }

  clearNotifications(): Observable<object> {
    let url = AppConstants.notificationsUrl + this.authService.getUserId();
    return this.http.delete(url);
  }
}
