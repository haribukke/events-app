import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  count: number = 0;

  constructor(
    private notificationService: NotificationsService
  ) { }

  ngOnInit() {
    this.notificationService.init();
    this.notificationService.notifications
      .subscribe((data: any = []) => {
        console.log('data', data)
        this.count = (data.notification && data.notification.length) || 0;
      })
  }

}
