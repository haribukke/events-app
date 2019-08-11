import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events/events.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  events: any = [];
  myEvents: any = [];
  userId: string | number;
  activeTab: string = 'allEvents';

  constructor(
    private eventsService: EventsService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.userId = this.authenticationService.getUserId()

    this.eventsService.getEvents()
      .subscribe((data: any) => {

        this.events = data.events;
        this.events.map(event => {
          event.attendedByUser = event.attendance.filter(x => x == this.userId).length > 0
        })
        this.myEvents = data.events.filter(x => x.createdBy == this.userId)
        console.log('data', this.events)
      })
  }

  attendEvent(id, userId) {
    this.eventsService.attendEvent(id, userId)
      .subscribe((data: any) => {

        this.events = data.events;
        this.events.map(event => {
          console.log('event aten', event.attendance.filter(x => x == this.userId))
          event.attendedByUser = event.attendance.filter(x => x == this.userId).length > 0
        })
        this.myEvents = data.events.filter(x => x.createdBy == this.userId)
        console.log('events', this.events)
      })
  }

  unAttendEvent(id, userId) {
    this.eventsService.unAttendEvent(id, userId)
      .subscribe((data: any) => {

        this.events = data.events;
        this.events.map(event => {
          console.log('event aten', event.attendance.filter(x => x == this.userId))
          event.attendedByUser = event.attendance.filter(x => x == this.userId).length > 0
        })
        this.myEvents = data.events.filter(x => x.createdBy == this.userId)
        console.log('events', this.events)
      })
  }

}
