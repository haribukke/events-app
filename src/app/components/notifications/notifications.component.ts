import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notifications: any;

  constructor(
    private notificationService: NotificationsService
  ) { }

  ngOnInit() {
    this.notificationService.notifications
      .subscribe((data: any) => {
        this.notifications = data && data.notification || [];
        console.log('data', data)
      }, err => {
        console.log('err', err)
      })
  }

  clearAll() {
    this.notificationService.clearNotifications()
      .subscribe((data: any = []) => {
        this.notificationService.updateNotifications([]);
        this.notifications = data && data.notification || [];
        console.log('data', data)
      }, err => {
        console.log('err', err)
      })
  }

}
