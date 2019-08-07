import { Injectable } from '@angular/core';

import { AppConstants } from 'src/app/constants/app.constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(
    private http: HttpClient
  ) { }

  createEvent(eventObj) {
    let url = AppConstants.eventsUrl;
    return this.http.post(url, eventObj)
  }

  getEvents() {
    let url = AppConstants.eventsUrl;
    return this.http.get(url);
  }

  attendEvent(eventId, userId) {
    let url = AppConstants.eventsAttendUrl;
    let obj = { eventId, userId }
    return this.http.post(url, obj)
  }

  unAttendEvent(eventId, userId) {
    let url = AppConstants.eventsUnAttendUrl;
    let obj = { eventId, userId }
    return this.http.post(url, obj)
  }
}
