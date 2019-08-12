import { Injectable } from '@angular/core';

import { AppConstants } from 'src/app/constants/app.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(
    private http: HttpClient
  ) { }

  createEvent(eventObj): Observable<object> {
    let url = AppConstants.eventsUrl;
    return this.http.post(url, eventObj)
  }

  getEvents(): Observable<object> {
    let url = AppConstants.eventsUrl;
    return this.http.get(url);
  }

  getEventData(id): Observable<object> {
    let url = AppConstants.eventByIdUrl + `/${id}`;
    return this.http.get(url);
  }

  updateEvent(eventObj): Observable<object> {
    let url = AppConstants.eventsUrl;
    return this.http.patch(url, eventObj)
  }

  deleteEvent(id): Observable<object> {
    let url = AppConstants.eventsUrl + `/${id}`;
    return this.http.delete(url)
  }

  attendEvent(eventId, userId): Observable<object> {
    let url = AppConstants.eventsAttendUrl;
    let obj = { eventId, userId }
    return this.http.post(url, obj)
  }

  unAttendEvent(eventId, userId): Observable<object> {
    let url = AppConstants.eventsUnAttendUrl;
    let obj = { eventId, userId }
    return this.http.post(url, obj)
  }
}
