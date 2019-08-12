import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];
let events = JSON.parse(localStorage.getItem('events')) || [];
let attendance = JSON.parse(localStorage.getItem('attendance')) || {};


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;
        console.log('headers', headers)
        let currentUserId = localStorage.getItem('userId');
        let notifications = JSON.parse(localStorage.getItem('notifications')) || [];

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                case url.startsWith('/users/notifications/') && method === 'GET':
                    return getNotifications(url);
                case url.startsWith('/users/notifications/') && method === 'DELETE':
                    return deleteNotifications(url);
                case url.endsWith('events') && method === 'POST':
                    return createEvent();
                case url.endsWith('events') && method === 'GET':
                    return getEvents();
                case url.endsWith('events/attend') && method == 'POST':
                    return attend()
                case url.endsWith('events/unattend') && method == 'POST':
                    return unAttend()
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions

        function authenticate() {
            const { name, password } = body;
            const user = users.find(x => x.name === name && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.id,
                name: user.name,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-jwt-token'
            })
        }

        function register() {
            const user = body
            console.log('user', user)

            if (users.find(x => x.name === user.name)) {
                return error('Username "' + user.name + '" is already taken')
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));

            return ok();
        }

        function createEvent() {
            const event = body;
            event.id = events.length ? Math.max(...events.map(x => x.id)) + 1 : 1;
            event.createdBy = currentUserId;
            events.push(event);
            localStorage.setItem('events', JSON.stringify(events))
            attendance[event.id] = [];
            localStorage.setItem('attendance', JSON.stringify(attendance))
            return ok();
        }

        function getEvents() {
            events.map(event => {
                event.attendance = attendance[event.id];
            })

            return ok({
                events
            });
        }

        function attend() {
            let { eventId, userId } = body;
            attendance[eventId].push(userId);
            localStorage.setItem('attendance', JSON.stringify(attendance))
            createNotification('NEW_ATTENDEE', eventId);
            events.map(event => {
                event.attendance = attendance[event.id];
            })

            return ok({
                events
            });
        }

        function createNotification(type, eventId) {
            let notification = new Notification(type, eventId)
            notifications.push(notification);
            console.log('notifications', notifications)
            localStorage.setItem('notifications', JSON.stringify(notifications))
        }

        function Notification(type, eventId) {
            this.id = notifications.length ? Math.max(...notifications.map(x => x.id)) + 1 : 1;
            let event = events.filter(event => event.id == eventId)
            console.log('event', event)
            switch (type) {
                case 'NEW_ATTENDEE':
                    this.message = `New attendee for your event ${event[0].name}`;
                    this.to = event[0].createdBy;
                    break;
                case 'ATTENDEE_REMOVED':
                    this.message = 'A user has backed off from your event';
                    this.to = event[0].createdBy;
                    break;
                case 'EVENT_MODIFIED':
                    break;
                case 'EVENT_DELETED':
                    break;
            }


        }

        function unAttend() {
            let { eventId, userId } = body;
            let id = attendance[eventId].indexOf(userId);
            attendance[eventId].splice(id, 1);
            localStorage.setItem('attendance', JSON.stringify(attendance))
            createNotification('ATTENDEE_REMOVED', eventId)
            events.map(event => {
                event.attendance = attendance[event.id];
            })

            return ok({
                events
            });
        }

        function getNotifications(url) {
            let id = url.split('/notifications/')[1];
            let notification = notifications.filter(x => x.to == id)
            return ok({ notification })
        }

        function deleteNotifications(url) {
            let id = url.split('/notifications/')[1];
            let notification = notifications.filter(x => x.to == !id)
            localStorage.setItem('notifications', JSON.stringify(notification))
            return ok()
        }
        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};