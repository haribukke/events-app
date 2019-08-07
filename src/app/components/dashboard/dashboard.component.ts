import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events/events.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  events: any;
  myEvents: any;

  constructor(
    private eventsService: EventsService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {

    this.eventsService.getEvents()
      .subscribe((data: any) => {
        console.log('data', data)
        this.events = data.events;
        this.myEvents = data.events.filter(x => x.createdBy == this.authenticationService.getUserId())
      })
  }

}
