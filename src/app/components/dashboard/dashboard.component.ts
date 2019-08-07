import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events/events.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  events: any;

  constructor(
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    this.eventsService.getEvents()
      .subscribe((data: any) => {
        console.log('data', data)
        this.events = data.events;
      })
  }

}
